import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

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
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <p className="text-center text-lg mt-0 mb-2 text-white font-bold">
                Iterate That Counter
                <Link href="/debug" passHref className="link">
                  Debug Contract
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <p className="text-center text-lg mt-0 mb-2 text-white font-bold">
                Current Count
                <Link href="/debug" passHref className="link">
                  Debug Contract
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
