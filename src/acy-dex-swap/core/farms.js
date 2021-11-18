/* eslint-disable no-loop-func */
import { formatUnits, parseUnits } from '@ethersproject/units';
import {
  getFarmsContract,
  getTokenContract,
  getPairContract,
  getContract,
  checkUserHasSufficientLPBalance,
  checkTokenIsApprovedWithSpender,
  calculateGasMargin,
  approveTokenWithSpender,
  FARMS_ADDRESS,
  CustomError,
} from '@/acy-dex-swap/utils';
import { Fetcher} from '@acyswap/sdk';
import { abi as FarmsABI } from '../abis/ACYMultiFarm.json';
import Eth from "web3-eth";
import Utils from "web3-utils";


const ACY_TOKEN  = "0x1000000000000000000000000000000000000000000000000000000000000000";
const USDC_TOKEN = "0x0100000000000000000000000000000000000000000000000000000000000000";
const USDT_TOKEN = "0x1100000000000000000000000000000000000000000000000000000000000000";

// method to retrieve token symbol based on the given token address.
const getTokenSymbol = async (address, library, account) => {
  const tokenContract = getTokenContract(address, library, account);
  return tokenContract.symbol();
};
 
const getTokenDecimal = async (address, library, account) => {
  const tokenContract = getTokenContract(address, library, account);
  return tokenContract.decimals();
};

const getPoolTotalReward = async (
  rewardTokens,
  rewardTokensAddresses,
  userPositions,
  farmContract,
  poolIndex,
  library,
  account
) => {

}

const getPoolTotalPendingReward = async (
  rewardTokens,
  rewardTokensAddresses,
  userPositions,
  farmContract,
  poolIndex,
  library,
  account
) => {
  // if user does not have any positions (does not deposit any lp tokens into this pool),
  // returns 0 to all pending reward tokens.
  if (userPositions.length === 0) {
    const totalPendingRewards = [];
    for (let tX = 0; tX < rewardTokens.length; tX++) {
      totalPendingRewards.push(0);
    }
    return totalPendingRewards;
  }

  // collect and gather user pending reward of the tokens in the pool of this iteration.
  // gather the returned promises after invoking the pending method into a multi-array.
  // first level of array includes an array of pending promises of the reward tokens.
  // second level of array includes the individual pending promises of the reward token.
  const allTokenRewardPromises = [];
  for (let rewardIndex = 0; rewardIndex < rewardTokens.length; rewardIndex++) {
    const tokenRewardPromise = [];
    for (let positionIndex = 0; positionIndex < userPositions.length; positionIndex++) {
      tokenRewardPromise.push(
        farmContract.pending(poolIndex, userPositions[positionIndex], rewardTokens[rewardIndex])
      );
    }
    allTokenRewardPromises.push(tokenRewardPromise);
  }

  const allTokenRewardList = [];
  for (let promiseIndex = 0; promiseIndex < allTokenRewardPromises.length; promiseIndex++) {
    allTokenRewardList.push(Promise.all(allTokenRewardPromises[promiseIndex]));
  }

  const allTokenRewardAmountHex = await Promise.all(allTokenRewardList);
  let allTokenTotalRewardAmount = [];

  // retrieve decimals of all of the reward tokens in the same order.
  const rewardTokenDecimalPromises = rewardTokensAddresses.map(token =>
    getTokenDecimal(token, library, account)
  );
  const rewardTokenDecimals = await Promise.all(rewardTokenDecimalPromises);

  allTokenRewardAmountHex.forEach(rewardList => {
    allTokenTotalRewardAmount.push(
      rewardList.reduce((total, currentAmount) => total.add(currentAmount))
    );
  });

  // Tan
  const rewards = [];
  allTokenRewardAmountHex.forEach((rewardList,index) => {
    rewardList.forEach((reward,id)=> {
      if(index == 0) {
        rewards.push([formatUnits(reward, rewardTokenDecimals[index])]);
      } else {
        rewards[id].push(formatUnits(reward, rewardTokenDecimals[index]));
      }
    });
  });


  // add decimals points to the pending rewards,
  // according to each token decimals points.
  allTokenTotalRewardAmount = allTokenTotalRewardAmount.map((reward, index) =>
    formatUnits(reward, rewardTokenDecimals[index])
  );

  return [allTokenTotalRewardAmount, rewards];
};

const getAllPools = async (library, account) => {
  const contract = getFarmsContract(library, account);
  const numPoolHex = await contract.numPools();
  const numPool = numPoolHex.toNumber();
  const poolInfoRequests = [];

  for (let i = 0; i < numPool; i++) {
    poolInfoRequests.push(
      (async () => {
        const poolInfo = await contract.poolInfo(i);
        const rewardTokens = await contract.getPoolRewardTokens(i);
        const rewardTokensAddresses = await contract.getPoolRewardTokenAddresses(i);

        // retrieve reward tokens symbol.
        const rewardTokensSymbolsRequests = [];
        rewardTokensAddresses.forEach(address => {
          rewardTokensSymbolsRequests.push(getTokenSymbol(address, library, account));
        });
        const rewardTokensSymbols = await Promise.all(rewardTokensSymbolsRequests).then(
          symbols => symbols
        );

        // retrieve lp tokens symbol.
        let token0;
        let token1;
        try {
          const lpTokenContract = await getPairContract(poolInfo[0], library, account);
          token0 = await lpTokenContract.token0();
          token1 = await lpTokenContract.token1();
        } catch (e) {
          // not a lp token, maybe a single token?
          token0 = poolInfo[0];
          token1 = null;
        }

        const token0Symbol = await getTokenSymbol(token0, library, account);
        const token1Symbol = token1 === null ? '' : await getTokenSymbol(token1, library, account);

        // account data
        var allTokenTotalRewardAmount = null;
        var userPositions= null;
        var rewards = null;
        var stakeData = null;
        // first store all the positions that the user staked in the pool in this iteration.
        // positions returned from getUserPositions are in the base of hex,
        // hence it has to be converted to decimals for use.
        if(account) {
          userPositions = (await contract.getUserPositions(account, i)).map(positionHex =>
            positionHex.toNumber()
          );
          
          const PendingReward = await getPoolTotalPendingReward(
            rewardTokens,
            rewardTokensAddresses,
            userPositions,
            contract,
            i,
            library,
            account
          );
          allTokenTotalRewardAmount = PendingReward[0];
          rewards = PendingReward[1];
          stakeData = [];
  
          if(userPositions.length > 0)
          {
            for(var j=0; j != userPositions.length; j++)
            {
              const result = await contract.stakingPosition(i,userPositions[j])
                .then(x => {
                  // [ parseInt(x.stakeTimestamp), parseInt(x.lockDuration)]
                  const expiredTime = parseInt(x.stakeTimestamp)+parseInt(x.lockDuration);
                  const dueDate = new Date(expiredTime * 1000).toLocaleDateString("en-US")
                  const nowDate = Date.now()/1000;
                  var diff = expiredTime - nowDate;
                  var days = 0, hrs = 0, min = 0, leftSec = 0;
  
                  if(diff>0) {
                    diff = Math.floor(diff);
                    days = Math.floor(diff/(24*60*60));
                    leftSec = diff - days * 24*60*60;
                    hrs = Math.floor(leftSec/(60*60));
                    leftSec = leftSec - hrs * 60*60;
                    min = Math.floor(leftSec/(60));
                  }
                  return {
                    lpAmount: formatUnits(x.lpAmount,18),
                    dueDate: dueDate,
                    positionId: userPositions[j],
                    reward: rewards[j],
                    remaining: days.toString() + 'd:' + hrs.toString() + 'h:' + min.toString() +'m',
                    locked: diff>0
                  }
                }
              );
              if(result.reward !=0 || result.lpAmount != 0 ){
                stakeData.push(result);
              }
                
            } 
          }
        }
        return {
          poolId: i,
          lpTokenAddress: poolInfo[0],
          token0Symbol,
          token1Symbol,
          lpBalance: poolInfo[1],
          lastUpdateBlock: poolInfo[3].toNumber(),
          rewardTokens,
          rewardTokensAddresses,
          rewardTokensSymbols,
          rewardTokensAmount: allTokenTotalRewardAmount,
          hasUserPosition: userPositions.length !== 0,
          rewards: rewards,
          stakeData: stakeData
        };
      })()
    );
  }

  return Promise.all(poolInfoRequests).then(res => {
    return res;
  });
};

const deposit = async (lpTokenAddr, amount, poolId, lockDuration, library, account, setButtonText) => {
  console.log('--------- deposit arguments -------------');
  console.log(lpTokenAddr, amount, poolId);
  let status = await (async () => {
    const contract = getFarmsContract(library, account);
    const depositTokenContract = getTokenContract(lpTokenAddr, library, account);
    // const hasBalance = checkUserHasSufficientLPBalance(lpTokenAddr, amount, library, account);

    // if (!hasBalance) return new CustomError(`Insufficient balance`);

    const tokenDecimals = await depositTokenContract.decimals();
    const depositAmount = parseUnits(amount.toString(), tokenDecimals).toString();
    const approved = await checkTokenIsApprovedWithSpender(
      lpTokenAddr,
      FARMS_ADDRESS,
      depositAmount,
      library,
      account
    );

    console.log(`Approval: ${approved}`);

    if (!approved) {
      setButtonText('Approval required');
      approveTokenWithSpender(lpTokenAddr, FARMS_ADDRESS, library, account);
      return new CustomError(`Approval required`);
    }

    let args = [poolId, depositAmount, lockDuration];

    console.log(args);
    const options = {};
    let result = await contract.estimateGas['deposit'](...args, options)
      .then(gasEstimate => {
        console.log('gasEstimate:',gasEstimate);
        return contract['deposit'](...args, {
          gasLimit: calculateGasMargin(gasEstimate),
          ...options,
        });
      })
      .catch(e => {
        return new CustomError(`Farms deposit failed with error ${e}`);
      });
    return result;
  })();

  if (status instanceof CustomError) {
    console.log(status.getErrorText());
    setButtonText(status.getErrorText());
  } else {
    console.log(status);
  }
};

const harvestAll = async (poolId, library, account) => {
  const farmContract = getFarmsContract(library, account);
  const response = await farmContract.harvestAll(poolId, false, false);
};

const harvest = async (poolId, positionId, setButtonText, library, account) => {
  let status = await (async () => {
    const farmContract = getFarmsContract(library, account);
    let args = [poolId, positionId, false, false];
    console.log(args);
    const options = {};

    let result = await farmContract.estimateGas['harvest'](...args, options)
      .then(gasEstimate => {
        console.log('gasEstimate:',gasEstimate);
        return farmContract['harvest'](...args, {
          gasLimit: calculateGasMargin(gasEstimate),
          ...options,
        });
      })
      .catch(e => {
        return new CustomError(`Farms deposit failed with error ${e}`);
      });
    return result;
  })();
  // console.log('withdraw at:',poolId,positionId,amount);
  
  // const response = await farmContract.withdraw(poolId, positionId, parseUnits(amount,18));
  if (status instanceof CustomError) {
    console.log(status.getErrorText());
    setButtonText(status.getErrorText());
  } else {
    setButtonText('Done');
    // setButtonStatus(false);
    // withdrawCallback(status);
  }
  const farmContract = getFarmsContract(library, account);
  const response = await farmContract.harvest(poolId, positionId, false, false);
};

const withdraw = async (poolId, positionId, amount, setButtonText, setButtonStatus, withdrawCallback, library, account) => {
  let status = await (async () => {
    const farmContract = getFarmsContract(library, account);
    let args = [poolId, positionId, parseUnits(amount,18)];
    console.log(args);
    const options = {};

    let result = await farmContract.estimateGas['withdraw'](...args, options)
      .then(gasEstimate => {
        console.log('gasEstimate:',gasEstimate);
        return farmContract['withdraw'](...args, {
          gasLimit: calculateGasMargin(gasEstimate),
          ...options,
        });
      })
      .catch(e => {
        return new CustomError(`Farms deposit failed with error ${e}`);
      });
    return result;
  })();
  // console.log('withdraw at:',poolId,positionId,amount);
  
  // const response = await farmContract.withdraw(poolId, positionId, parseUnits(amount,18));
  if (status instanceof CustomError) {
    console.log(status.getErrorText());
    setButtonText(status.getErrorText());
  } else {
    setButtonText('Done');
    // withdrawCallback(status);
  }
};

const getDateYDM = (date) => {
  return date.getFullYear(date)  + "-" + ("0"+(date.getMonth(date)+1)).slice(-2) + "-" + ("0" + date.getDate(date)).slice(-2)
}

const getHarvestHistory = async (account = null) => {
  
  //init date
  var Contract = require('web3-eth-contract');
  Contract.setProvider('https://rinkeby.infura.io/v3/1e70bbd1ae254ca4a7d583bc92a067a2');
  var eth = new Eth('https://rinkeby.infura.io/v3/1e70bbd1ae254ca4a7d583bc92a067a2');
  const farmContract = new Contract(FarmsABI,FARMS_ADDRESS);
  console.log('getFarmsContract',farmContract);

  const result = await farmContract.getPastEvents("Harvest", {
    fromBlock: 0 ,
    toBlock: 'latest'
  }, function(error, events){ console.log(events); })
  .then(async function(events){

    var date = new Date();
    var today = new Date(date);
    console.log(date==today);
    const date_array = {};
    date.setMonth(date.getMonth() - 1);
    
    date_array[getDateYDM(date)] = 0;
    date.setDate(date.getDate() + 1);
    for(var i=0; i<40 ; i++){
      date_array[getDateYDM(date)] = 0;
      if(date.getDate() === today.getDate()) break;
      date.setDate(date.getDate() + 1);
    }
    console.log(date_array);

    const my_acy = {...date_array};
    const my_all = {...date_array};
    const total_acy = {...date_array};
    const total_all = {...date_array};
    console.log('account:',account);
    for(var i=events.length-1; i >=0 ; i--) {
      const timeStamp = await eth.getBlock(events[i]['blockNumber']).then(function(e){
        const timeStamp = e['timestamp'];
        return e['timestamp'] * 1000;
      });
      const date = new Date(timeStamp);
      const str_date = getDateYDM(date);
      console.log(str_date);
      if(date_array.hasOwnProperty(str_date)){
        var value = 0;
        if(events[i]['returnValues']['token'] == USDC_TOKEN || events[i]['returnValues']['token'] == USDT_TOKEN) {
          value =  events[i]['returnValues']['amount']/1e6;
        } else if(events[i]['returnValues']['token'] == ACY_TOKEN) {
          value =  events[i]['returnValues']['amount']/1e18;
          total_acy[str_date] += value;
        }
        total_all[str_date] += value;
        if(events[i]['returnValues']['user'] == account){
          my_all[str_date] += value;
          if(events[i]['returnValues']['token'] == ACY_TOKEN) {
            my_acy[str_date] += value;
          }
        }
        date_array[str_date] += events[i]['returnValues']['amount']/1e18;
      } else {
        break;
      }
      // console.log('timeStamp date:',getDateYDM(date));//['returnValues']['value']/1e18
    }
    // console.log('date_array:',Object.entries(date_array));
    return {
      myAcy: Object.entries(my_acy),
      myAll: Object.entries(my_all),
      totalAcy: Object.entries(total_acy),
      totalAll: Object.entries(total_all)
    };
    // console.log('events',events) // same results as the optional callback above
  });
  console.log('result:',result)
  return result;
}

export { getAllPools, deposit, harvestAll, harvest, withdraw, getHarvestHistory };
