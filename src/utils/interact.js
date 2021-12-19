import Web3 from "web3";
import {appStore} from "../store";
import {toJS} from "mobx";
import axios from "axios";

let web3, nftContract, isInitialized;
const contract = require("./../../artifacts/contracts/RandomFans.sol/RandomFans.json");
const contractAddress = "0x4d174A59a07d00d8ccCbD79a4702929773DAE50E";

export const init = () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    nftContract = new web3.eth.Contract(contract.abi, contractAddress);

    appStore.contractAddress = contractAddress;
    appStore.web3Instance = web3;
    appStore.contractInstance = nftContract;
    isInitialized = true;

    nftContract.events.FansMinted({}, async (error, data) => {
      if (error) console.log("Error: " + error);
      else {
        await getTotalSupply();
      }
    });
  }
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!isInitialized) init();

      return {
        status: "",
        address: addressArray[0],
      };
    } catch (err) {
      return {
        address: "",
        status: "😞" + err.message,
      };
    }
  } else {
    appStore.status = (
      <span>
        <p>
          {" "}
          🦊{" "}
          <a
            target="_blank"
            href="https://metamask.io/download.html"
            rel="noreferrer"
          >
            You must install MetaMask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      </span>
    );
    appStore.statusSuccess = false;
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "",
        };
      } else {
        appStore.status = "😞";
        appStore.statusSuccess = false;
      }
    } catch (err) {
      appStore.status = err.message;
      appStore.statusSuccess = false;
    }
  } else {
    appStore.status = (
      <span>
        <p>
          {" "}
          🦊{" "}
          <a
            target="_blank"
            href="https://metamask.io/download.html"
            rel="noreferrer"
          >
            You must install MetaMask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      </span>
    );
    appStore.statusSuccess = false;
  }
};

// Contract Methods

export const getMaxMintAmount = async () => {
  if (!isInitialized) init();
  const result = await nftContract.methods.maxTokenPurchase().call();
  appStore.maxTokenPurchase = result;
  return result;
};

export const getTotalSupply = async () => {
  if (!isInitialized) init();
  const result = await nftContract.methods.totalSupply().call();
  appStore.totalSupply = result;
  return result;
};

export const getNftPrice = async () => {
  if (!isInitialized) init();
  const result = await nftContract.methods.tokenPrice().call();
  const resultEther = web3.utils.fromWei(result, "ether");
  appStore.unitNtfPrice = resultEther;
  return resultEther;
};

export const getSaleState = async () => {
  if (!isInitialized) init();
  const result = await nftContract.methods.saleIsActive().call();
  appStore.isSaleStateActive = result;
  return result;
};

export const toggleSaleState = async () => {
  if (!isInitialized) init();
  try {
    await nftContract?.methods
      ?.toggleSaleState()
      .call({from: appStore.account, to: contractAddress, gas: 600000});
  } catch (e) {
    console.log(e.message);
  }
};

export const getMaxTokens = async () => {
  try {
    if (!isInitialized) init();
    appStore.maxTokens = await nftContract.methods.MAX_TOKENS().call();
  } catch (e) {
    console.log("getMaxTokens", e);
  }
};

export const getBaseUri = async () => {
  if (!isInitialized) init();
  try {
    appStore.tokenBaseUri = await nftContract.methods.baseURI().call();
  } catch (e) {
    console.log("getBaseUri", e);
  }
}

export const getTokenUri = async (tokenId) => {
  try {
    return await nftContract.methods.tokenURI(tokenId).call();
  } catch (e) {
    console.log("getTokenUri", e);
  }
}

export const getTokensOfOwner = async () => {
  if (window?.ethereum?.selectedAddress) {
    if (!isInitialized) init();
    const address = window.ethereum.selectedAddress;
    if (!appStore.tokenBaseUri) await getBaseUri();
    let tokens = await nftContract.methods.tokensOfOwner(address).call();
    appStore.tokenList = [];
    tokens?.map(async (tokenId) => {
      const metaDataUri = await getTokenUri(tokenId);
      const response = await axios.get(metaDataUri, {method: 'get'})
      appStore.tokenList.push(response?.data)
    });
  }
};

export const mintNFT = async (mintAmount) => {
  if (!isInitialized) init();
  if (!window.ethereum.selectedAddress) {
    appStore.statusSuccess = false;
    appStore.status = (
      <p>
        🦊 Connect to Metamask using{" "}
        <span className="px-2 text-purple-600">Connect Wallet</span> button.
      </p>
    );
  }

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    value: parseInt(
      web3.utils.toWei(appStore?.unitNtfPrice?.toString(), "ether") * mintAmount
    ).toString(16), // hex
    gasLimit: "0",
    data: nftContract.methods.mintFans(mintAmount).encodeABI(), //make call to NFT smart contract
  };
  //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    await getTotalSupply();
    const scanUrl = `https://exptest.blntbyzt.com/tx/${txHash}`;
    appStore.status = (
      <div>
        ✅ Check out your transaction on BitciScan: <hr/>
        <a target="_blank" href={scanUrl} rel="noreferrer">
          {scanUrl}
        </a>
      </div>
    );
    appStore.statusSuccess = true;
  } catch (error) {
    appStore.status = "😥 Something went wrong: " + error.message;
    appStore.statusSuccess = false;
  }
};
