import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  getMaxMintAmount,
  getTotalSupply,
  getNftPrice,
  mintNFT,
  getSaleState,
  getMaxTokens, getBaseUri,
} from "../utils/interact";
import { appStore } from "../store";
import { observer } from "mobx-react";

const Hero = observer(() => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    (async () => {
      await getMaxMintAmount();
      await getMaxTokens();
      await getNftPrice();
      await getTotalSupply();
      await getSaleState();
    })();
  }, []);

  const incrementCount = () => {
    if (count < appStore.maxTokenPurchase) {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const minRandomNft = async () => {
    await mintNFT(count);
  };

  return (
    <main id="main" className="h-screen py-16 bg-pattern">
      <div className="container max-w-6xl mx-auto flex flex-col items-center pt-4">
        <div className="flex flex-col items-center">
          <Image
            src="/images/preview.gif"
            width="300"
            height="300"
            alt="random fans gif"
            className="rounded-md"
          />
          {appStore?.isSaleStateActive ? (
            <>
              {/* Minted NFT Ratio */}
              <p className="bg-gray-100 rounded-md text-gray-800 font-extrabold text-lg my-4 py-1 px-3">
                <span className="text-purple-600">{`${appStore?.totalSupply}`}</span>
                {" / "}
                <span>{appStore?.maxTokens || 0}</span>
              </p>

              <div className="flex items-center mt-6 text-3xl font-bold text-gray-200">
                <button
                  className="flex items-center justify-center w-12 h-12 bg-white rounded-md hover:bg-pink-200 text-center"
                  onClick={decrementCount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-pink-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <h2 className="mx-8">{count}</h2>
                <button
                  className="flex items-center justify-center w-12 h-12 bg-white rounded-md text-black hover:bg-pink-200 text-center"
                  onClick={incrementCount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-pink-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>

              <h4 className="mt-2 font-semibold text-center text-white">
                {appStore?.unitNtfPrice} TBITCI{" "}
                <span className="text-sm text-gray-300"> + GAS</span>
              </h4>

              <h4 className="mt-2 font-semibold text-center text-white">
                <span>Toplam: </span>
                {parseFloat(appStore?.unitNtfPrice * count).toFixed(
                  1
                )} TBITCI <span className="text-sm text-gray-300"> + GAS</span>
              </h4>

              {/* Mint Button */}
              <button
                className="mt-6 py-2 px-4 text-center text-white uppercase bg-pink-500 border-b-4 border-pink-700 rounded hover:bg-pink-400 hover:border-pink-500"
                onClick={minRandomNft}
              >
                Hemen Mintle!
              </button>
            </>
          ) : (
            <p className="text-white text-2xl mt-8">
              {" "}
              😥 Satış henüz aktif değil!
            </p>
          )}

          {/* Status */}
          {appStore?.status && (
            <div
              style={{
                lineBreak: "anywhere",
              }}
              className={`flex items-center justify-center px-4 py-4 mt-8 font-semibold text-white bg-red-400 rounded-md w-1/2`}
            >
              {appStore?.status}
            </div>
          )}
        </div>
      </div>
    </main>
  );
});

export default Hero;
