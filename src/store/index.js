import {configure, makeAutoObservable, observable} from "mobx";

configure({
  enforceActions: "never",
});

class AppStore {
  constructor() {
    makeAutoObservable(
      this,
      {
        account: observable,
      },
      {autoBind: true}
    );
  }

  web3Instance;
  contractAddress;
  contractInstance;
  account;
  statusSuccess;
  status = "";
  isSaleStateActive;
  maxTokens;
  unitNtfPrice;
  totalSupply;
  maxTokenPurchase;
  tokenBaseUri;
  tokenList = [];
}

export const appStore = new AppStore();
