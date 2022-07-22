import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://polygon-mainnet.g.alchemy.com/v2/9wQlC99xFdlsIWieXSj05LWryz35jlRX",
        blockNumber: 30980252
      }
    }, 
    polygon: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/9wQlC99xFdlsIWieXSj05LWryz35jlRX",
      accounts: {
        mnemonic: "",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: ""
      },
    },
  }
};

export default config;
