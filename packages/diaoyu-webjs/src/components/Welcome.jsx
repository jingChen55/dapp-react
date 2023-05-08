import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const btbClass =
  "flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]";
const Welcome = () => {
  const { currentAccount, connectWallet, sendTransaction, } = useContext( TransactionContext );
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row  flex-1 flex-col justify-between ">
        <div className="flex flex-col flex-2 justify-start items-start ml-10">
          {!currentAccount && (
            <button type="button" onClick={connectWallet} className={btbClass}>
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          {
            currentAccount && (
              <button type="button" onClick={sendTransaction} className={btbClass}>
                <AiFillPlayCircle className="text-white mr-2" />
                <p className="text-white text-base font-semibold">Claim</p>
              </button>
            )
          }
        </div>
        <div className="flex flex-col flex-2 lg:justify-end items-end mr-10  ">
          <div className="p-3 flex justify-content items-start flex-col rounded-xl sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress( currentAccount )}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
