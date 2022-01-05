/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Progress, Button, Table, Input, Tooltip, Icon, Alert } from 'antd';
import { history } from 'umi';
import styles from "./styles.less"
import LaunchChart from './launchChart';
import { getTransferData } from '@/acy-dex-swap/core/launchPad';
import { requireAllocation, getAllocationInfo, getProjectInfo } from '@/services/api';
import { BigNumber } from '@ethersproject/bignumber';
import ERC20ABI from '@/abis/ERC20.json';
import { binance, injected } from '@/connectors';
import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";
import './css/LaunchpadProject.css';
import project from '@/models/project';
import AllocationIcon from './components/AllocationIcon';
import * as moment from 'moment';
import context from 'react-bootstrap/esm/AccordionContext';
import { CaretDownOutlined } from '@ant-design/icons';
import VestingSchedule from './VestingSchedule';
import SocialMedia from './SocialMedia'
import telegramWIcon from '@/assets/icon_telegram_white.svg';
import etherIcon from '@/assets/icon_etherscan.svg';
import polyIcon from '@/assets/icon_polyscan.svg';
import linkedinIcon from '@/assets/icon_linkedin.svg';
import mediumIcon from '@/assets/icon_medium.svg';
import youtubeIcon from '@/assets/icon_youtube.svg';
import githubIcon from '@/assets/icon_github.svg';
import twitterWIcon from '@/assets/icon_twitter_white.svg';
import linkWIcon from '@/assets/icon_link_white.svg';
import fileWIcon from '@/assets/icon_file_white.svg';
import paycerBanner from '@/assets/paycer_banner.svg';
import PaycerIcon from '@/assets/icon_paycer_logo.svg';
import announcementFIcon from '@/assets/icon_announcement_fill.svg';
import $ from 'jquery';
import { getContract } from "../../acy-dex-swap/utils/index.js"
import { useWeb3React } from '@web3-react/core';
import POOLABI from "@/acy-dex-swap/abis/AcyV1Poolz.json";
import { useConstantLoader, LAUNCHPAD_ADDRESS, LAUNCH_RPC_URL, CHAINID, API_URL } from "@/constants";
import { CustomError } from "@/acy-dex-swap/utils"
import { approveNew, getAllowance } from "@/acy-dex-swap/utils"

const LaunchpadProject = () => {  
  // STATES
  const { account, chainId, library, activate, active } = useWeb3React();
  const { projectId } = useParams();
  const [receivedData, setReceivedData] = useState({});
  const [poolBaseData, setPoolBaseData] = useState(null);
  const [poolDistributionDate, setDistributionDate] = useState([]);
  const [poolDistributionStage, setpoolDistributionStage] = useState([]);
  const [poolStageCount, setpoolStageCount] = useState(0);
  const [poolInvestorData, setPoolInvestorData] = useState(null);
  const [poolStatus, setPoolStatus] = useState(0);
  const [poolDecimals, setPoolDecimals] = useState(0); // Gary: decimal initialize to 0
  const [poolMainCoinAddress, setPoolMainCoinAddress] = useState(0); // e.g., USDT
  const [isError, setIsError] = useState(false);
  const [hasCollected, setHasCollected] = useState(false);
  const [successCollect, setSuccessCollect] = useState(false);
  const [notVesting, setNotVesting] = useState(false);
  const [vestingStage, setVestingStage] = useState(0);
  const [isVesting, setIsVesting] = useState(false);
  const [comparesaleDate, setComparesaleDate] = useState(false);
  const [comparevestDate, setComparevestDate] = useState(false);
  // const [investorNum,setinvestorNum] = useState(0);
  const [allocationAmount, setAllocationAmount] = useState(0);
  const [isInvesting, setIsInvesting] = useState(false);
  const [isAllocated, setIsAllocated] = useState(false);

  // NOTE (Gary 2022.1.4): change poolId
  const PoolId = 11

  // CONSTANTS
  const InputGroup = Input.Group;
  const logoObj = {
    "telegram": telegramWIcon,
    "twitter": twitterWIcon,
    "website": linkWIcon,
    "whitepaper": fileWIcon,
    "linkedin": linkedinIcon,
    "medium": mediumIcon,
    "youtube": youtubeIcon,
    "github": githubIcon,
    "etheraddress": etherIcon,
    "polyaddress": polyIcon,
  }
  const PoolContract = getContract(LAUNCHPAD_ADDRESS(), POOLABI, library, account);

  // HOOKS
  useEffect(() => {
    getProjectInfo(API_URL(), projectId)
      .then(res => {
        if (res) {
          // extract data from string
          const contextData = JSON.parse(res.contextData);

          res['tokenLabels'] = contextData['tokenLabels'];
          res['projectDescription'] = contextData['projectDescription'];
          res['alreadySale'] = contextData['alreadySale'];
          res['salePercentage'] = contextData['salePercentage'];
          res['posterUrl'] = contextData['posterUrl']
          res['tokenLogoUrl'] = contextData['tokenLogoUrl']

          res['regStart'] = format_time(res.regStart);
          res['regEnd'] = format_time(res.regEnd);
          res['saleStart'] = format_time(res.saleStart);
          res['saleEnd'] = format_time(res.saleEnd);

          res['totalSale'] = res.totalSale;
          res['totalRaise'] = res.totalRaise;
          res['projectUrl'] = res.projectUrl;
          res['projectName'] = res.projectName;

          setReceivedData(res);
        } else {
          console.log('redirect to list page');
          history.push('/launchpad');
        }
      })
      .catch(e => {
        console.error(e);
        history.push('/launchpad');
      });
  }, []);

  // fetching data from Smart Contract
  useEffect(async () => {
    if(!account){
      connectWallet();
    }
    else if (account || library){
      console.log("start getPoolBaseData")
      getPoolData(library, account)
      console.log("poolDistributionDate", poolDistributionDate, poolDistributionStage)
    } else {
      const provider = new JsonRpcProvider(LAUNCH_RPC_URL(), CHAINID());  // different RPC for mainnet
      const accnt = "0x0000000000000000000000000000000000000000";
      getPoolData(provider, accnt)
      console.log("poolDistributionDate", poolDistributionDate, poolDistributionStage)
    }
  }, [library, account])

  useEffect(async () => {
    if(!account){
      connectWallet();
    }
    else if (account || library){
      console.log("start getPoolBaseData")
      getPoolData(library, account)
    } else {
      const provider = new JsonRpcProvider(LAUNCH_RPC_URL(), CHAINID());  // different RPC for mainnet
      const accnt = "0x0000000000000000000000000000000000000000";
      getPoolData(provider, accnt)
    }
  }, [])

  useEffect(() => {
    if (!account || !receivedData.projectToken) {
      return
    }
    // get allocation status from backend at begining
    console.log("line 145", account, receivedData.projectToken);
    getAllocationInfo(API_URL(), account, receivedData.projectToken)
      .then(res => {
        console.log("res, res.allocationAmount", res, res.allocationAmount)
        if (res && res.allocationAmount) {
          // setAllocationAmount(res.allocationAmount);
          console.log('allocation amount', res.allocationAmount);
        }
      })
      .catch(e => {
        console.error(e);
      });
    
    const oldAllocationAmount = allocationAmount;
    if (oldAllocationAmount === 0) {
        requireAllocation(API_URL(), account, receivedData.projectToken).then(res => {
          console.log("api url", API_URL())
          if(res && res.allocationAmount) {
            setAllocationAmount(res.allocationAmount);
            setIsAllocated(true);
            // setCoverOpenState(true);
          }
          console.log('allocation get', res.allocationAmount);
        }).catch(e => {
          console.error(e);
        })
    }
  }, []);

  // FUNCTIONS
  const connectWallet = async () =>  {
    activate(binance);
    activate(injected);
  };

  const clickToWebsite = () => {
    const newWindow = window.open(receivedData.website, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }

  const format_time = timeZone => {
    return moment(timeZone)
      .local()
      .format('MM/DD/YYYY HH:mm:ss');
  };

  const convertUnixTime = unixTime => {
    const data = new Date((Number(unixTime)) * 1000)
    const res = data.toLocaleString()
    return res
  }

  // COMPONENTS
  // change to URL
  const TokenBanner = ({ posterUrl }) => {
    return (
      <img
        className="tokenBanner"
        src={posterUrl}
        alt=""
      />
    );
  };

  const TokenLogoLabel = ({ projectName, tokenLogo}) => {
    return (
      <div className="flexContainer">
        <img
          className="tokenLogo"
          alt=""
          src={tokenLogo}
          loading="eager"
          onClick={() => clickToWebsite()}
        />
        <div className="tokenInfo">
          <span className="tokenTitle" onClick={() => clickToWebsite()}>{projectName}</span>
          <div className="tokenLabelBar">
            {receivedData.tokenLabels &&
              receivedData.tokenLabels.map(label => <span className="tokenLabel">{label}</span>)}
          </div>
        </div>
      </div>
    );
  };

  const TokenProcedure = () => {
    const Procedure = () => {
      return (
        <div className="cardContent">
          <div className="procedure">
            <hr aria-orientation="vertical" className="verticalDivideLine" />
            <div className="procedureNumber">1</div>
            <div>
              <p>Allocation</p>
              {/* <p className="shortText">Start : {receivedData.regStart}</p>
              <p className="shortText">End : {receivedData.regEnd}</p> */}
            </div>
          </div>

          <div className="procedure" style={{ marginTop: '24px' }}>
            <hr
              aria-orientation="vertical"
              className={comparesaleDate ? 'verticalDivideLine' : 'verticalDivideLine_NotActive'}
            />
            <div className={comparesaleDate ? 'procedureNumber' : 'procedureNumber_NotActive'}>
              2
            </div>
            {poolBaseData &&
              <div>
                <p>Sale</p>
                <p className="shortText">From : {poolBaseData[2]}</p>
                <p className="shortText">To : {poolBaseData[3]}</p>
              </div>
            }
          </div>

          <div className="procedure" style={{ marginTop: '24px' }}>
            <div className={comparevestDate ? 'procedureNumber' : 'procedureNumber_NotActive'}>
              3
            </div>
            <div>
              <p>Vesting</p>
            </div>
          </div>
        </div>
      );
    };

    const ProgressBar = ({ alreadySale, totalSale, projectToken }) => {
      const salePercentage = Number(alreadySale) / Number(totalSale)
      let tokenNum
      console.log("--------ALREADY SALE----------")
      console.log(alreadySale)
      if(!alreadySale){
        tokenNum = 0
      } else {
        tokenNum = alreadySale
      }
      const progressStyle = {
        width: { salePercentage } + '%',
      };

      return (
        <>
          <div
            className="cardContent"
            style={{ background: '#1a1d1c', borderRadius: '0rem 0rem 1rem 1rem' }}
          >
            <div className="progressHeader">
              <p>Sale Progress</p>
              <p style={{ color: '#eb5c1f' }}>{salePercentage}%</p>
            </div>
            <div className={styles.tokenProgress}>
              <Progress
                strokeColor={{
                  from: '#c6224e',
                  to: '#eb6c20',
                }}
                percent={salePercentage}
                status={salePercentage === 0 ? "normal" : salePercentage !== 100 ? "active" : "success"}
              />
            </div>
            <div className="progressAmount">
              <div>{`${ tokenNum} / ${totalSale} ${projectToken}`}</div>
            </div>
          </div>
        </>
      );
    };

    return (
      <div
        className="circleBorderCard"
        style={{
          padding: 0,
        }}
      >
        <Procedure />
        {poolBaseData &&
          <ProgressBar
            alreadySale={poolBaseData[1]}
            totalSale={poolBaseData[0]}
            projectToken={receivedData.projectToken}
          />
        }
      </div>
    );
  };

  const KeyInformation = ({ projectToken, totalSale, tokenPrice }) => {
    return (
      <div className="circleBorderCard cardContent">
        <div className="keyinfoRow">
          <div className="keyinfoName">Total Sales</div>
          <div>
            {totalSale} {projectToken}
          </div>
        </div>

        <div className="keyinfoRow" style={{ marginTop: '1rem' }}>
          <div className="keyinfoName">Total Raise</div>
          <div>
            {receivedData.totalRaise} USDT
          </div>
        </div>

        <div className="keyinfoRow" style={{ marginTop: '1rem' }}>
          <div className="keyinfoName">Rate</div>
          <div>
            1 {projectToken} = {tokenPrice} USDT
          </div>
        </div>
      </div>
    );
  };

  const ProjectDescription = () => {
    return (
      <div className="circleBorderCard cardContent">
        <div style={{ display: 'block' }}>
          <div className='projecttitle-socials-container'>
            <h3 className='projecttitle'>Project Description</h3>
            <div className=''>
              {receivedData.social && receivedData.social[0] &&
                <div id='social container' className='social-container'>
                  { Object.entries(receivedData.social[0]).map((item)=>{
                    if(item[1] !== null ){
                      console.log(item)
                      return (
                      <SocialMedia url={logoObj[item[0]]} link={item[1]} />)
                    }
                  })}
                </div>}
              
            </div>
          </div>
          
          <span className="lineSeperator" />
          <div className="projectDescription">
            {receivedData.projectDescription && <p>{receivedData.projectDescription[0]}</p>}
            {receivedData.projectDescription &&
              receivedData.projectDescription
                .slice(1)
                .map(desc => <p style={{ paddingTop: '2rem' }}>{desc}</p>)}
          </div>
        </div>
      </div>
    );
  };
  
  const ChartCard = () => {
    const [chartData, setChartData] = useState([]);
    const [transferData, setTransferData] = useState([]);

    const recordNum = 100;
    const transferTableHeader = [
      {
        title: 'Date Time(UTC)',
        dataIndex: 'dateTime',
        className: 'column-date',
        width: 80,
        align: 'left',
      },
      {
        title: 'Participants',
        dataIndex: 'participant',
        width: 60,
        align: 'left',
        ellipsis: true,
      },
      {
        title: 'USDT',
        dataIndex: 'quantity',
        width: 60,
        align: 'left',
        ellipsis: true,
      },
      {
        title: 'Token',
        dataIndex: 'Amount',
        width: 60,
        align: 'left',
        ellipsis: true,
      },
    ];

    const ellipsisCenter = (str, preLength = 6, endLength = 4, skipStr = '...') => {
      const totalLength = preLength + skipStr.length + endLength;
      if (str.length > totalLength) {
        return str.substr(0, preLength) + skipStr + str.substr(str.length - endLength, str.length);
      }
      return str;
    };

    useEffect(async () => {
      const [newTransferData, newChartData] = await getTransferData();

      // ellipsis center address
      newTransferData.forEach(data => {
        data['participant'] = ellipsisCenter(data['participant']);
      });

      newChartData.splice(0, newChartData.length - recordNum);
      setTransferData(newTransferData);
      setChartData(newChartData);
    }, []);

    return (
      <div className="circleBorderCard cardContent">
        <LaunchChart
          data={chartData}
          showXAxis
          showYAxis
          showGradient
          lineColor="#e29227"
          bgColor="#2f313500"
        />
        <Table
          id="transferTable"
          columns={transferTableHeader}
          dataSource={transferData}
          pagination={false}
          scroll={{ y: 400 }}
        />
      </div>
    );
  };

  const AllocationCard = ({
    id,
    index,
    Component,
    allocationAmount,
    setAllocationAmount,
    walletId,
    projectToken,
    isClickedAllocation,
    setIsClickedAllocation,
    isAllocated,
    colorCode,
    baseColorCode,
  }) => {
    const [coverOpenState, setCoverOpenState] = useState(false);
    const [coverRevealState, setCoverRevealState] = useState(false);
    const computeCoverClass = () => {
      let classString = 'cover';
      if (coverOpenState) {
        classString += ' openCover';
      }
      return classString;
    };

    // if allocation is done, cover cannot be opened
    // otherwise, require an allocation from server
    const clickCover = async e => {
      console.log(`click allocation card cover`, allocationAmount);
      console.log(isClickedAllocation);
      // requireAllocation(API_URL(), account, projectToken)
      if (!walletId || !receivedData.projectToken) {
        return;
      }
      if (!isAllocated) {
        console.log("Allocation amount is not ready!");
        requireAllocation(API_URL(), account, receivedData.projectToken).then(res => {
          if(res && res.allocationAmount) {
            setAllocationAmount(res.allocationAmount);
            setIsAllocated(true);
          }
          console.log('allocation get', res.allocationAmount);
        }).catch(e => {
          console.error(e);
        })
        return;
      }
      if (isClickedAllocation) {
        return;
      }
      setCoverOpenState(true);
      setIsClickedAllocation(true);
      let cards = document.querySelectorAll(".cover");
      cards.forEach(node => {
        node.classList.remove("inner-text")
        node.classList.remove("cover");
        let innerText = node.parentElement.querySelector(".inner-text-amount");
        const offsets = [0.1, 0.5, 0.75, 1, 1.5, 2, 3, 5];
        const offsetPercentage = offsets[Math.floor((Math.random() * offsets.length))]

        // get 4 random values for other allocation values
        innerText.textContent = `$${Math.floor(allocationAmount * offsetPercentage)}`;
        innerText.style.color = "#757579";
      })
      try {
        let originalElementParent = e.target.parentElement.querySelector(".inner-text-amount");
        originalElementParent.textContent = `$${allocationAmount}`;
        originalElementParent.style.color = "#ffffff"
      } catch (err) {
        // set all values to $0 due to error
        // innerText.textContent = "$0";
        console.log(err);
      }
      // originalElementParent.textContent = allocationAmount;

      
      setCoverOpenState(true);
      e.preventDefault();
    };

    return (
      <div className='allocationCard-container'>
        <div className="allocationCard" onClick={clickCover} style={{backgroundColor: baseColorCode}}>
          <div className={computeCoverClass()} style={{backgroundColor: colorCode}}>
            {/* <div className="allocationCard-inner">
              <p className="inner-text">{index + 1}</p>
            </div> */}
          </div>
          <p className="inner-text-amount"></p> 
        </div>
      </div>
    );
  };

  const Allocation = ({ walletId, projectToken, allocationAmount, setAllocationAmount, isAllocated, setIsAllocated}) => {
    const [isClickedAllocation, setIsClickedAllocation] = useState(false);

    // TODO: replace with 24 icon
    const BaseCard = ({ url }) => {
      return (
        <div style={{ background: 'white', height: '80px', width: '80px', borderRadius: '4px' }}>
          {/* <AllocationIcon play={true} url={url} id="apple"/> */}
        </div>
      );
    };

    const allocationCards = () => {
      const cards = [];
      const colorCodes = ["#C6224E", "#E29227", "#1E5D91", "#1C9965", "#70BA33"];
      const baseColorCodes = ["#631027", "#74490f", "#0f2e48", "#0e4c32", "#375d19"]
      for (let i = 0; i < 5; i++) {
        cards.push(
          <AllocationCard
            id={i}
            index={i}
            Component={BaseCard}
            allocationAmount={allocationAmount}
            setAllocationAmount={setAllocationAmount}
            walletId={walletId}
            projectToken={project}
            isClickedAllocation={isClickedAllocation}
            setIsClickedAllocation={setIsClickedAllocation}
            isAllocated={isAllocated}
            colorCode={colorCodes[i]}
            baseColorCode={baseColorCodes[i]}
          />
        );
      }
      return cards;
    };

    const [isClickedVesting, setIsClickedVesting] = useState(false);
    const [isClickedMax, setIsClickedMax] = useState(false);
    const [salesValue, setSalesValue] = useState(0);
    const [isValidSalesPrice, setIsValidSalesPrice] = useState(true);

    useEffect(() => {
      if (salesValue > allocationAmount) {
        setIsValidSalesPrice(false);
      } else {
        setIsValidSalesPrice(true);
      }
    }, [salesValue])

    const maxClick = () => {
      setSalesValue(allocationAmount)
      setIsClickedMax(true)
    }

    const tooltipTitle = () => {
      return(
        <div>
          <span>Increase Your Allocation Amount:</span>
          <br />
          <span className='tool-tip-content'>
            1.Increase your trading volume @ <a href="/#/exchange" target="_blank">Exchange</a>
          </span>
          <br />
          <span className='tool-tip-content'>
            2.Increase your liquidity @ <a href="/#/liquidity" target="_blank">Liquidity</a>
          </span>
        </div>
    )}

    useEffect(() => {
      let timeout
      if (isError) {
        timeout = setTimeout(() => setIsError(false), 1000);
      }
      if (hasCollected){
        timeout = setTimeout(() => setHasCollected(false), 1000);
      }
      if (notVesting){
        timeout = setTimeout(() => setNotVesting(false), 1000);
      }
      if (successCollect){
        timeout = setTimeout(() => setSuccessCollect(false), 1000);
      }
      return () => clearTimeout(timeout);
    }, [isError, hasCollected]);


    const vestCallback = async (status) => {
      const sti = async (hash) => {
        library.getTransactionReceipt(hash).then(async receipt => {
          console.log(`receiptreceipt for ${hash}: `, receipt);
          // receipt is not null when transaction is done
          if (!receipt) 
            setTimeout(sti(hash), 500);
          else {
            setSuccessCollect(true);
          }
        });
      }
      sti(status.hash);
    };

    const vestingClaimClicked = async () => {
      if(!isVesting){
        setNotVesting(true)
      } else {
        if (!account) {
          setIsError(true)
          connectWallet()
        }
        const tokenAllocated = poolInvestorData[2]
        const tokenClaimed = poolInvestorData[3].toFixed(2)
        const curDate = new Date()
        const stageOne = (tokenAllocated / 100 * poolDistributionStage[0]).toFixed(2)
        const stageTwo = (tokenAllocated / 100 * poolDistributionStage[1]).toFixed(2)
        const stageThree = (tokenAllocated / 100 * poolDistributionStage[2]).toFixed(2)

        if(curDate > poolDistributionDate[0] && curDate < poolDistributionDate[1]){
          setVestingStage(1)
          if(tokenClaimed === stageOne){
            setHasCollected(true)
          } else {
            const status = await (async () => {
              const result = await PoolContract.WithdrawERC20ToCreator(account, 3)
                .catch(e => {
                  return new CustomError('CustomError while withdrawing token');
                });
              return result;
            })();
            console.log("Vesting claimed: ", status)
          }
        }
        if(curDate > poolDistributionDate[1] && curDate < poolDistributionDate[2]){
          setVestingStage(2)
          if(tokenClaimed === stageTwo) {
            setHasCollected(true)
          } else {
            const status = await (async () => {
              const result = await PoolContract.WithdrawERC20ToCreator(account, 3)
                .catch(e => {
                  return new CustomError('CustomError while withdrawing token');
                });
              return result;
            })();
            console.log("Vesting claimed: ", status)
          }
        }
        if(curDate > poolDistributionDate[2]){
          setVestingStage(3)
          if(tokenClaimed === stageThree){
            setHasCollected(true)
          } else {
            const status = await (async () => {
              const result = await PoolContract.WithdrawERC20ToCreator(account, 3)
                .catch(e => {
                  return new CustomError('CustomError while withdrawing token');
                });
              return result;
            })();
            console.log("Vesting claimed: ", status)
          }
        }
      }
      
    }

    const investClicked = async(poolAddress, poolId, amount) => {
      // TODO: test if amount is valid!
      console.log("test math", Math.round(0.000001 * Math.pow(10, 18)))
      if (poolStatus !== 2) {// cannot buy
        setIsVesting(false);
      } else {
        setIsVesting(true);
        if (!account) {
          setIsError(true)
          connectWallet()
        }
        const status = await (async () => {
          // const approveAmount = amount * Math.pow(10, poolDecimals)
          const approveAmount = amount * Number(10n ** 18n) // NOTE (Gary): change the decimals HERE!
          // const approveAmount = 100000
          console.log("test math", approveAmount)
          // const state = await getAllowance("0xF82eEeC2C58199cb409788E5D5806727cf549F9f", account, poolAddress, library, account)
          // console.log(state)
          const state = await approveNew(poolMainCoinAddress, approveAmount, poolAddress, library, account);
          const result = await PoolContract.InvestERC20(poolId , approveAmount)
            .catch(e => {
              console.log(e)
              return new CustomError('CustomError while buying token');
            });
          return result;
        })();
        console.log("buy contract", status)
      }
    }

    return (
      <div>
      { !isVesting ? 
        <div
          className={
            isClickedVesting
              ? 'cardContent allocation-content allocation-content-active'
              : 'cardContent allocation-content allocation-content-inactive'
          }
        >
          <div className="allocation-title-container">
            <div className='title-tooltip-container'>
                <p className="allocation-title">Allocation</p>
                <Tooltip title={tooltipTitle} mouseEnterDelay={0} mouseLeaveDelay={0.25}>
                  <Icon type="info-circle" className='tool-tip-icon' />
                </Tooltip>
            </div>
            
            <div className='allocation-cards'>
              <div className="allocationContainer">{allocationCards()}</div>
            </div>
            <div className="allocation-container-dummy"></div>
          </div>

          <form className="sales-container">
            <label for="sale-number" className="sale-vesting-title">
              Sale
            </label>
            <div className="sales-input-container">
              <InputGroup>
                  <Input className="sales-input" defaultValue="0" value={salesValue} onChange={e => setSalesValue(e.target.value)} />
                {isClickedMax ? <div className='sales-input-max'> <span className='sales-input-max-text'>USDT</span> </div> : <Button className="max-btn" onClick={maxClick}>MAX</Button>}
              </InputGroup>
            </div>
            <Button className={isValidSalesPrice ? "sales-submit" : "sales-submit invalid"} onClick={() => {console.log("buy"); console.log("sales value", salesValue); investClicked(LAUNCHPAD_ADDRESS(), PoolId, salesValue); }} disabled={!comparesaleDate || !isValidSalesPrice}> Buy </Button>
          </form>

          
          { !poolDistributionStage ? (<h2 style={{ textAlign: "center", color: "white" }}>Loading <Icon type="loading" /></h2>):
            <div className="vesting-container">
              <p className="sale-vesting-title vesting">Vesting</p>
              <div className="text-line-container">
                <p>{poolStageCount} stages of vesting : Unlock {poolDistributionStage[0]}% TGE</p>
                <span className="vesting-line" />
                <div
                  className={
                    isClickedVesting ? 'vesting-schedule vesting-schedule-active' : 'vesting-schedule'
                  }
                >
                    <VestingSchedule vestingDate={poolDistributionDate} stageData={poolDistributionStage} walletId={walletId} vestingClick={vestingClaimClicked} />
                </div>
              </div>
              <div className="arrow-down-container">
                <CaretDownOutlined
                  className={
                    isClickedVesting ? 'arrow-down-active arrow-down' : 'arrow-down-inactive arrow-down'
                  }
                />  
              </div>
              <div className='vesting-trigger-container' onClick={() => setIsClickedVesting(!isClickedVesting)}>
              </div>
            </div>
          }
        </div>
      :
        <div className="vesting-container">
          <p className="sale-vesting-title vesting">Vesting</p>
          <div className="text-line-container-open">
            <p>Vesting is divided into {poolStageCount} stages, unlock {poolDistributionStage ? poolDistributionStage[0] : "x"}% TGE</p>
            <span className="vesting-line" />
            <div className='vesting-schedule'>
                <VestingSchedule vestingDate={poolDistributionDate} stageData={poolDistributionStage} walletId={walletId}/>
            </div>
          </div>
        </div>
      }
      </div>
    );
  };

  const CardArea = ({ walletId,  allocationAmount, setAllocationAmount, isAllocated, setIsAllocated }) => {
    // const { account: walletId } = useWeb3React();
    return (
      <div className="gridContainer">
        <div className="leftGrid">
          <TokenProcedure />
          {poolBaseData &&
            <KeyInformation
              projectToken={receivedData.projectToken}
              totalSale={poolBaseData[0]}
              tokenPrice={receivedData.tokenPrice}
            />
          }
          
        </div>
        <div className="rightGrid">
          <div className="circleBorderCard">
            <Allocation 
              walletId={walletId}
              projectToken={receivedData.projectToken}
              allocationAmount={allocationAmount}
              setAllocationAmount={setAllocationAmount}
              isAllocated={isAllocated}
              setIsAllocated = {setIsAllocated}
            />
          </div>
          <ProjectDescription />
          <ChartCard className="launchpad-chart" /> 
        </div>
      </div>
    );
  };

  const getPoolData = async (lib, acc) => {
    console.log("start get pool data", LAUNCHPAD_ADDRESS(), lib);
    const poolContract = getContract(LAUNCHPAD_ADDRESS(), POOLABI, lib, acc);
    const pool = []
    const distributionRes = []
    const distributionStage = []
    const investorRes = []

    // 合约函数调用
    const baseData = await poolContract.GetPoolBaseData(PoolId)
    const distributionData = await poolContract.GetPoolDistributionData(PoolId)
    const status = await poolContract.GetPoolStatus(PoolId)
    const investorData = poolContract.GetInvestmentData(PoolId, account)

    console.log("tx data: ", baseData, distributionData, status, investorData)


    // getpoolbasedata 数据解析
    const token1contract = getContract(baseData[0], ERC20ABI, lib, acc)
    const token2Address = baseData[1]
    const token2contract = getContract(token2Address, ERC20ABI, lib, acc)


    console.log("token1contract", token1contract)

    const token1decimal = await token1contract.decimals()
    const token2decimal = await token2contract.decimals()
    // 不解析时间戳
    const res1 = BigNumber.from(baseData[2]).toBigInt().toString().slice(0,-(token1decimal)) // 获取销售的token的总数
    const res2 = BigNumber.from(baseData[3]).toBigInt().toString().slice(0,-(token1decimal)) // 已销售的token的数量
    const res3 = BigNumber.from(baseData[4]).toBigInt()
    const res4 = BigNumber.from(baseData[5]).toBigInt()

    console.log("res: ", res1, res2, res3, res4)

    // 获取当前阶段
    const d = Math.round(new Date().getTime()/1000)
    if(d > res3) setComparesaleDate(true)
    if(d > res4) setComparevestDate(true)
    const saleStartDate = convertUnixTime(res3)
    const saleEndDate = convertUnixTime(res4)
    // 存放数据
    pool.push(res1, res2, saleStartDate, saleEndDate)
    // getpooldistributiondata 数据解析以及存放
    distributionData[1].map(uTime => distributionRes.push(convertUnixTime(uTime)))
    distributionData[2].map(vestingRate => distributionStage.push(BigNumber.from(vestingRate).toBigInt().toString()))

    // getinvestmentdata 数据解析以及存放
    /* if(investorData){
      investorData.map(data => investorRes.push(Number(BigNumber.from(data).toBigInt())))
    } */

    // 判断当前是否是vesting阶段
    const curPoolStatus = Number(BigNumber.from(status).toBigInt())
    if(curPoolStatus === 4) setIsVesting(true)
    console.log("getpooldata distributionstage", distributionStage, distributionData)
    // set数据
    setPoolBaseData(pool)
    setDistributionDate(distributionRes)
    setpoolStageCount(Number(BigNumber.from(distributionData[0]).toBigInt())) // vesting阶段的次数
    setpoolDistributionStage(distributionStage)
    setPoolStatus(curPoolStatus)
    setPoolInvestorData(investorRes)
    setPoolStatus(Number(BigNumber.from(status).toBigInt()))
    setPoolMainCoinAddress(token2Address)
    setPoolDecimals(token2decimal)
  }

  return (
    <div>
      <div className="mainContainer">
        {isError ? <Alert message="Wallet is not connected." type="error" showIcon /> : ""}
        {hasCollected ? <Alert message="You have collected token for current vesting stage." type="info" showIcon /> : ""}
        <TokenBanner posterUrl={receivedData.projectToken === "PCR" ? paycerBanner : receivedData.posterUrl} />
        <TokenLogoLabel projectName={receivedData.projectName} tokenLogo={receivedData.projectToken === "PCR" ? PaycerIcon : receivedData.tokenLogoUrl} />
        <CardArea walletId={account} allocationAmount={allocationAmount} setAllocationAmount={setAllocationAmount} isAllocated={isAllocated} setIsAllocated={setIsAllocated}/>
      </div>
    </div>
  );
};

export default LaunchpadProject;
