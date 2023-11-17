//import Link from "next/link";
//import { useScaffoldContractRead, useScaffoldContractWrite } from "../hooks/scaffold-eth";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

// const { data: counter } = useScaffoldContractRead({ contractName: "Counter", functionName: "counter" });
// const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
//   contractName: "Counter",
//   functionName: "inc",
//   args: [],
//   // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
//   blockConfirmations: 1,
//   // The callback function to execute when the transaction is confirmed.
//   onBlockConfirmation: txnReceipt => {
//     console.log("Transaction blockHash", txnReceipt.blockHash);
//   },
// });

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-12">
        <div className="px-4 py-6 max-w-[720px]">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold text-white">OSED</span>
          </h1>
          <p className="text-center text-lg">
            OSED is an extension to Solidity that allows you to effortlessly write dApps such that logic is split
            between different blockchains. You don&apos;t need to think about cross-chain message passing, you just
            write the logic as if it were happening on one chain and annotate the functions.
          </p>
          <p className="text-center text-lg mb-0">
            The web app is a demo of a simple cross-chain counter written in the OSED language. It offloads the (not
            very expensive) computation of incrementing or decrementing the counter to Polygon&apos;s Mumbai testnet
            from the Ethereum Sepolia testnet, storing the result on the Ethereum Sepolia testnet.
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-6 px-8 py-12">
          <div className="flex justify-center items-center gap-8 flex-col">
            <div className="w-full flex flex-col bg-base-100 px-10 py-5 text-center items-center max-w-xs rounded-3xl">
              <p className="text-center text-lg mt-0 mb-1">Current Counter</p>
              <p className="text-center text-2xl mt-0 mb-0 text-white font-bold">0{/* counter */}</p>
            </div>
            <button
              /* onClick={() => writeAsync()} */
              className="w-full flex flex-col bg-secondary px-6 py-3 text-center items-center max-w-xs rounded-3xl"
            >
              <p className="text-center text-lg mt-0 mb-0 text-white font-bold leading-tight">Iterate</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
