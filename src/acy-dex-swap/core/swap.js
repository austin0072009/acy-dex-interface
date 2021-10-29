import {
  CurrencyAmount,
  ETHER,
  FACTORY_ADDRESS,
  Fetcher,
  InsufficientReservesError,
  Pair,
  Percent,
  Route,
  Router,
  Token,
  TokenAmount,
  Trade,
  TradeType,
  WETH,
} from '@acyswap/sdk';

import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';
import WETHABI from '../abis/WETH.json';
import {
  CustomError,
  calculateGasMargin,
  checkTokenIsApproved,
  computeTradePriceBreakdown,
  getAllowance,
  getContract,
  getRouterContract,
  getUserTokenBalanceRaw,
  INITIAL_ALLOWED_SLIPPAGE,
  isZero,
  ROUTER_ADDRESS,
} from '../utils';

// get the estimated amount  of the other token required when swapping, in readable string.
export async function swapGetEstimated(
  inputToken0,
  inputToken1,
  allowedSlippage = INITIAL_ALLOWED_SLIPPAGE,
  exactIn = true,
  chainId,
  library,
  account,
  setToken0Amount,
  setToken1Amount,
  setNeedApprove,
  setApproveAmount,
  setApproveButtonStatus,
  setSwapBreakdown,
  setSwapButtonState,
  setSwapButtonContent,
  setSwapStatus,
  setPair,
  setRoute,
  setTrade,
  setSlippageAdjustedAmount,
  setMinAmountOut,
  setMaxAmountIn,
  setWethContract,
  setWrappedAmount
) {
  const status = await (async () => {
    // check uniswap
    console.log('SWAP GET ESTIMATED');
    // change slippage from bips (0.01%) into percentage
    let slippage = allowedSlippage * 0.01;
    allowedSlippage = new Percent(allowedSlippage, 10000);
    setSwapBreakdown('');
    setSwapButtonState(false);
    setSwapButtonContent('Loading...');
    setSwapStatus('');

    let contract = getRouterContract(library, account);
    let {
      address: inToken0Address,
      symbol: inToken0Symbol,
      decimals: inToken0Decimal,
      amount: inToken0Amount,
    } = inputToken0;
    let {
      address: inToken1Address,
      symbol: inToken1Symbol,
      decimals: inToken1Decimal,
      amount: inToken1Amount,
    } = inputToken1;

    if (!account) return new CustomError('Connect to wallet');
    if (!inputToken0.symbol || !inputToken1.symbol) return new CustomError('please choose tokens');
    if (exactIn && inToken0Amount == '0') return new CustomError('Enter an amount');
    if (!exactIn && inToken1Amount == '0') return new CustomError('Enter an amount');
    if (exactIn && inToken0Amount == '') return new CustomError('Enter an amount');
    if (!exactIn && inToken1Amount == '') return new CustomError('Enter an amount');
    if (exactIn && isNaN(parseFloat(inToken0Amount))) return new CustomError('Enter an amount');
    if (!exactIn && isNaN(parseFloat(inToken1Amount))) return new CustomError('Enter an amount');

    console.log(`token0Amount: ${inToken0Amount}`);
    console.log(`token1Amount: ${inToken1Amount}`);

    let token0IsETH = inToken0Symbol === 'ETH';
    let token1IsETH = inToken1Symbol === 'ETH';

    console.log(inputToken0);
    console.log(inputToken1);

    if (token0IsETH && token1IsETH) {
      setSwapButtonState(false);
      setSwapButtonContent("don't support ETH to ETH");
      return new CustomError("don't support ETH to ETH");
    }
    // if one is ETH and other WETH, use WETH contract's deposit and withdraw
    // wrap ETH into WETH
    if (token0IsETH && inToken1Symbol === 'WETH') {
      // UI should sync value of ETH and WETH
      if (exactIn) {
        setToken1Amount(inToken0Amount);
        inToken1Amount = inToken0Amount;
      } else {
        setToken0Amount(inToken1Amount);
        inToken0Amount = inToken1Amount;
      }
      console.log('------------------ CHECK BALANCE ------------------');
      // Big Number comparison

      let userToken0Balance = await getUserTokenBalanceRaw(
        token0IsETH ? ETHER : new Token(chainId, inToken0Address, inToken0Decimal, inToken0Symbol),
        account,
        library
      );

      let userHasSufficientBalance;
      try {
        userHasSufficientBalance = userToken0Balance.gte(
          parseUnits(inToken0Amount, inToken0Decimal)
        );
      } catch (e) {
        setSwapButtonState(false);
        if (e.fault === 'underflow') setSwapButtonContent(e.fault);
        else setSwapButtonContent('Failed to get balance');
        return new CustomError(e.fault);
      }

      console.log(userToken0Balance);
      console.log('token0Amount');
      console.log(inToken0Amount);

      // quit if user doesn't have enough balance, otherwise this will cause error
      if (!userHasSufficientBalance) {
        setSwapButtonState(false);
        setSwapButtonContent('Not enough balance');
        return new CustomError('Not enough balance');
      }
      // setEstimatedStatus("change ETH to WETH");
      setSwapButtonState(true);
      setSwapButtonContent('Wrap');

      const wethContract = getContract(inToken1Address, WETHABI, library, account);
      let wrappedAmount;

      try {
        wrappedAmount = BigNumber.from(parseUnits(inToken0Amount, inToken0Decimal)).toHexString();
      } catch (e) {
        console.log('wrappedAmount!!');
        console.log(e);
        setSwapButtonState(false);
        if (e.fault === 'underflow') {
          setSwapButtonContent(e.fault);
          return new CustomError(e.fault);
        }
        setSwapButtonContent('Failed to parse amounts');
        return new CustomError('Failed to parse amounts');
      }

      setWethContract(wethContract);
      setWrappedAmount(wrappedAmount);

      // let result = await wethContract
      //     .deposit({
      //         value: wrappedAmount,
      //     })
      //     .catch((e) => {
      //         console.log(e);
      //         return new CustomError("WETH Deposit failed");
      //     });
      // return result;
      return 'Wrap is ok';
    }
    if (inToken0Symbol === 'WETH' && token1IsETH) {
      console.log('UNWRAP');
      if (exactIn) {
        setToken1Amount(inToken0Amount);
        inToken1Amount = inToken0Amount;
      } else {
        setToken0Amount(inToken1Amount);
        inToken0Amount = inToken1Amount;
      }

      let userToken0Balance = await getUserTokenBalanceRaw(
        token0IsETH ? ETHER : new Token(chainId, inToken0Address, inToken0Decimal, inToken0Symbol),
        account,
        library
      );

      let userHasSufficientBalance;
      try {
        userHasSufficientBalance = userToken0Balance.gte(
          parseUnits(inToken0Amount, inToken0Decimal)
        );
      } catch (e) {
        console.log('userHasSufficientBalance!!!');
        console.log(e);
        setSwapButtonState(false);
        if (e.fault === 'underflow') {
          setSwapButtonContent(e.fault);
          return new CustomError(e.fault);
        }
        setSwapButtonContent('Failed to parse balance');
        return new CustomError('Failed to parse balance');
      }

      // quit if user doesn't have enough balance, otherwise this will cause error
      if (!userHasSufficientBalance) {
        setSwapButtonState(false);
        setSwapButtonContent('Not enough balance');
        return new CustomError('Not enough balance');
      }

      setSwapButtonState(true);
      setSwapButtonContent('Unwrap');

      const wethContract = getContract(inToken0Address, WETHABI, library, account);

      let wrappedAmount;
      try {
        wrappedAmount = BigNumber.from(parseUnits(inToken0Amount, inToken0Decimal)).toHexString();
      } catch (e) {
        console.log('wrappedAmount!!!');
        console.log(e);
        setSwapButtonState(false);
        if (e.fault === 'underflow') {
          setSwapButtonContent(e.fault);
          return new CustomError(e.fault);
        }
        setSwapButtonContent('Failed to parse wrap amount');
        return new CustomError('Failed to parse wrap amount');
      }
      setWethContract(wethContract);
      setWrappedAmount(wrappedAmount);

      // let result = await wethContract.withdraw(wrappedAmount).catch((e) => {
      //     console.log(e);
      //     return new CustomError("WETH Withdrawal failed");
      // });
      // return result;

      return 'Unwrap is ok';
    }
    // ETH <-> Non-WETH ERC20     OR     Non-WETH ERC20 <-> Non-WETH ERC20

    console.log('SWAP');
    console.log('------------------ CONSTRUCT TOKEN ------------------');
    // use WETH for ETHER to work with Uniswap V2 SDK
    const token0 = token0IsETH
      ? WETH[chainId]
      : new Token(chainId, inToken0Address, inToken0Decimal, inToken0Symbol);
    const token1 = token1IsETH
      ? WETH[chainId]
      : new Token(chainId, inToken1Address, inToken1Decimal, inToken1Symbol);

    if (token0.equals(token1)) {
      setSwapButtonState(false);
      setSwapButtonContent('tokens are same');
      return new CustomError('tokens are same');
    }
    // get pair using our own provider
    const pair = await Fetcher.fetchPairData(token0, token1, library).catch(e => {
      return new CustomError(
        `${token0.symbol} - ${token1.symbol} pool does not exist. Create one?`
      );
    });
    if (pair instanceof CustomError) {
      setSwapButtonState(false);
      setSwapButtonContent("pool doesn't exist");
      return pair;
    }

    console.log(pair);
    setPair(pair);
    console.log('------------------ CONSTRUCT ROUTE ------------------');
    // This is where we let Uniswap SDK know we are not using WETH but ETHER

    const route = new Route([pair], token0IsETH ? ETHER : token0, token1IsETH ? ETHER : token1);

    console.log(route);

    setRoute(route);
    console.log('------------------ PARSE AMOUNT ------------------');

    // convert typed in amount to BigNumbe rusing ethers.js's parseUnits then to string,
    console.log(inToken0Amount);
    console.log(inToken0Decimal);

    let parsedAmount;

    try {
      parsedAmount = exactIn
        ? new TokenAmount(token0, parseUnits(inToken0Amount, inToken0Decimal)).raw.toString(16)
        : new TokenAmount(token1, parseUnits(inToken1Amount, inToken1Decimal)).raw.toString(16);
    } catch (e) {
      console.log('parsedAmount!!!');
      console.log(e);
      setSwapButtonState(false);
      if (e.fault === 'underflow') {
        setSwapButtonContent(e.fault);
        return new CustomError(e.fault);
      }
      setSwapButtonContent('unknow error');
      return new CustomError('unknow error');
    }

    let inputAmount;
    // CurrencyAmount instance is required for Trade contructor if input is ETHER
    if ((token0IsETH && exactIn) || (token1IsETH && !exactIn)) {
      inputAmount = new CurrencyAmount(ETHER, `0x${parsedAmount}`);
    } else {
      inputAmount = new TokenAmount(exactIn ? token0 : token1, `0x${parsedAmount}`);
    }
    console.log('estimated dependent amount');
    // console.log(pair.priceOf(token0).quote(inputAmount).raw.toString());
    let dependentTokenAmount = pair.priceOf(token0).quote(new TokenAmount(token0, inputAmount.raw));

    let parsed =
      token1 === ETHER ? CurrencyAmount.ether(dependentTokenAmount.raw) : dependentTokenAmount;
    console.log(parsed.toExact());

    //===================================================================================

    console.log('------------------ CONSTRUCT TRADE ------------------');
    let trade;
    try {
      trade = new Trade(
        route,
        inputAmount,
        exactIn ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT
      );
    } catch (e) {
      if (e instanceof InsufficientReservesError) {
        setSwapButtonState(false);
        setSwapButtonContent('Insufficient liquidity for this trade');
        console.log('Insufficient reserve!');
        return new CustomError('Insufficient reserve!');
      }
      setSwapButtonState(false);
      setSwapButtonContent('Unhandled exception!');
      console.log('Unhandled exception!');
      console.log(e);
      return new CustomError('Unhandled exception!');
    }

    console.log(trade);
    setTrade(trade);
    console.log('------------------ SLIPPAGE CALCULATE ------------------');

    let slippageAdjustedAmount;
    let minAmountOut;
    let maxAmountIn;

    // calculate slippage adjusted amount
    if (exactIn) {
      // console.log(trade.outputAmount.toExact());
      // setToken1Amount(trade.outputAmount.toExact());
      console.log(`By algorithm, expected to get: ${trade.outputAmount.toExact()}`);
      // if provided exact token in, we want to know min out token amount
      minAmountOut = trade.minimumAmountOut(allowedSlippage);
      slippageAdjustedAmount = minAmountOut.raw.toString();

      // update UI with estimated output token amount
      setToken1Amount(trade.outputAmount.toFixed(6));
      console.log(`Minimum received: ${slippageAdjustedAmount}`);
    } else {
      console.log(`By algorithm, expected to get: ${trade.inputAmount.toExact()}`);
      maxAmountIn = trade.maximumAmountIn(allowedSlippage);
      slippageAdjustedAmount = maxAmountIn.raw.toString();
      setToken0Amount(trade.inputAmount.toFixed(6));
      console.log(`Maximum pay: ${slippageAdjustedAmount}`);
    }

    setSlippageAdjustedAmount(slippageAdjustedAmount);
    setMinAmountOut(minAmountOut);
    setMaxAmountIn(maxAmountIn);

    let userToken0Balance = await getUserTokenBalanceRaw(
      token0IsETH ? ETHER : new Token(chainId, inToken0Address, inToken0Decimal, inToken0Symbol),
      account,
      library
    );

    let userHasSufficientBalance;
    try {
      userHasSufficientBalance = userToken0Balance.gte(parseUnits(inToken0Amount, inToken0Decimal));
    } catch (e) {
      console.log('wrappedAmount!!!');
      console.log(e);
      setSwapButtonState(false);
      setSwapButtonContent(e.fault);
      return new CustomError(e.fault);
    }

    // quit if user doesn't have enough balance, otherwise this will cause error
    if (!userHasSufficientBalance) {
      setSwapButtonState(false);
      setSwapButtonContent('Not Enough balance');
      return;
    }

    console.log('------------------ BREAKDOWN ------------------');
    let { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade);
    let breakdownInfo = [
      // `Slice Slippage tolerance:` ${allowedSlippage} %`
      // `Slippage tolerance : ${slippage}%`,
      `Price impact : ${priceImpactWithoutFee.toFixed(2)}%`,
      // `LP FEE : ${realizedLPFee?.toSignificant(6)} ${trade.inputAmount.currency.symbol}`,
      `${exactIn ? 'Min received:' : 'Max sold'} : ${
        exactIn ? minAmountOut.toSignificant(4) : maxAmountIn.toSignificant(4)
      } ${exactIn ? trade.outputAmount.currency.symbol : trade.inputAmount.currency.symbol}`,
    ];

    // setEstimatedStatus("you can click the swap button");
    setSwapBreakdown(breakdownInfo);

    console.log('------------------ ALLOWANCE ------------------');
    if (!token0IsETH) {
      let allowance = await getAllowance(
        inToken0Address,
        account,
        ROUTER_ADDRESS,
        library,
        account
      );

      console.log(`Current allowance for ${trade.inputAmount.currency.symbol}:`);
      console.log(allowance);
      let token0AmountToApprove = exactIn ? inputAmount.raw.toString() : slippageAdjustedAmount;
      let token0approval = await checkTokenIsApproved(
        inToken0Address,
        token0AmountToApprove,
        library,
        account
      );
      console.log(token0approval);
      if (!token0approval) {
        console.log('Not enough allowance');
        setApproveAmount(token0AmountToApprove);
        // when needApprove = true, please show the button of [Approve]
        setNeedApprove(true);
        setApproveButtonStatus(true);
        setSwapButtonState(false);
        setSwapButtonContent('Need approval');
        return 'approve is ok';
      }
      setSwapButtonContent('Swap');
      setSwapButtonState(true);
      return 'swap is ok';
    }
    setSwapButtonContent('Swap');
    setSwapButtonState(true);

    return 'swap is ok';
  })();
  if (status instanceof CustomError) {
    setSwapButtonContent(status.getErrorText());
  } else {
    console.log(status);
  }
}

// FIXME: slippageAdjustedAmount, minAmountOut, maxAmountIn are only used for logging to console. Calculation is done once more by Router.swapCallParameters()
export async function swap(
  inputToken0,
  inputToken1,
  allowedSlippage = INITIAL_ALLOWED_SLIPPAGE,
  exactIn = true,
  chainId,
  library,
  account,
  pair,
  route,
  trade,
  slippageAdjustedAmount,
  minAmountOut,
  maxAmountIn,
  wethContract,
  wrappedAmount,
  deadline,
  setSwapStatus,
  setSwapButtonContent,
  swapCallback
) {
  const status = await (async () => {
    // check uniswap
    console.log(FACTORY_ADDRESS);
    // change slippage from bips (0.01%) into percentage
    allowedSlippage = new Percent(allowedSlippage, 10000);

    const contract = getRouterContract(library, account);
    const {
      address: inToken0Address,
      symbol: inToken0Symbol,
      decimals: inToken0Decimal,
      amount: inToken0Amount,
    } = inputToken0;
    const {
      address: inToken1Address,
      symbol: inToken1Symbol,
      decimals: inToken1Decimal,
      amount: inToken1Amount,
    } = inputToken1;

    console.log(`token0Amount: ${inToken0Amount}`);
    console.log(`token1Amount: ${inToken1Amount}`);

    const token0IsETH = inToken0Symbol === 'ETH';
    const token1IsETH = inToken1Symbol === 'ETH';

    console.log(inputToken0);
    console.log(inputToken1);

    if (token0IsETH && token1IsETH) return new CustomError("Doesn't support ETH to ETH");
    console.log('------------------ WRAP OR SWAP  ------------------');
    // if one is ETH and other WETH, use WETH contract's deposit and withdraw
    // wrap ETH into WETH
    if (token0IsETH && inToken1Symbol === 'WETH') {
      console.log('WRAP');
      // UI should sync value of ETH and WETH
      // if (exactIn) setToken1Amount(token0Amount);
      // else setToken0Amount(token1Amount);
      const result = await wethContract
        .deposit({
          value: wrappedAmount,
        })
        .catch(e => {
          console.log(e);
          return new CustomError('WETH Deposit failed');
        });

      return result;
    }
    // unwrap WETH into ETH
    if (inToken0Symbol === 'WETH' && token1IsETH) {
      console.log('UNWRAP');

      // UI should sync value of ETH and WETH
      // if (exactIn) setToken1Amount(token0Amount);
      // else setToken0Amount(token1Amount);

      const result = await wethContract.withdraw(wrappedAmount).catch(e => {
        console.log(e);
        return new CustomError('WETH Withdrawal failed');
      });
      return result;
    }
    // ETH <-> Non-WETH ERC20     OR     Non-WETH ERC20 <-> Non-WETH ERC20

    console.log('SWAP');

    console.log('------------------ CONSTRUCT TOKEN ------------------');
    // use WETH for ETHER to work with Uniswap V2 SDK
    const token0 = token0IsETH
      ? WETH[chainId]
      : new Token(chainId, inToken0Address, inToken0Decimal, inToken0Symbol);
    const token1 = token1IsETH
      ? WETH[chainId]
      : new Token(chainId, inToken1Address, inToken1Decimal, inToken1Symbol);
    console.log(token0);
    console.log(token1);
    // quit if the two tokens are equivalent, i.e. have the same chainId and address
    if (token0.equals(token1)) return new CustomError('Equal tokens!');
    // helper function from uniswap sdk to get pair address, probably needed if want to replace fetchPairData
    // get pair using our own provider
    console.log('------------------ CONSTRUCT PAIR ------------------');
    console.log('FETCH');
    console.log(pair);
    console.log('------------------ CONSTRUCT ROUTE ------------------');
    // This is where we let Uniswap SDK know we are not using WETH but ETHER
    console.log(route);
    console.log('------------------ PARSE AMOUNT ------------------');

    console.log('------------------ CONSTRUCT TRADE ------------------');
    console.log(trade);
    console.log('------------------ SLIPPAGE CALCULATE ------------------');
    console.log(slippageAdjustedAmount);
    console.log(minAmountOut);
    console.log(maxAmountIn);
    console.log('------------------ ALLOWANCE ------------------');
    console.log('say something about allowance');
    console.log('------------------ PREPARE SWAP ------------------');

    deadline = deadline || 30;
    console.log("deadline", deadline);
    const { methodName, args, value } = Router.swapCallParameters(trade, {
      feeOnTransfer: false,
      allowedSlippage,
      recipient: account,
      ttl: deadline * 60,
    });
    const options = !value || isZero(value) ? {} : { value };

    console.log('------------------ ARGUMENTS ------------------');
    console.log(options);
    console.log(args);

    console.log(contract);
    const result = await contract.estimateGas[methodName](...args, options)
      .then(gasEstimate =>
        contract[methodName](...args, {
          gasLimit: calculateGasMargin(gasEstimate),
          ...options,
        })
      )
      .catch(e => new CustomError(`${methodName} failed with error ${e}`));
    return result;
  })();

  if (status instanceof CustomError) {
    setSwapStatus(status.getErrorText());
    setSwapButtonContent("Please try again");
  } else {
    console.log(status);

    const url = `https://rinkeby.etherscan.io/tx/${status.hash}`;
    swapCallback(status, inputToken0, inputToken1);
    setSwapStatus(
      <div>
        <a href={url} target="_blank" rel="noreferrer">
          View it on etherscan
        </a>
      </div>
    );
  }
}
