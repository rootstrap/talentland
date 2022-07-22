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
        mnemonic: "trash marble include fashion discover leg health chicken scorpion giggle return march",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: ""
      },
    },
    /*etherscan: {
      apiKey: "662S742JBC4ICWB37I8TQ8UWTTV15PRIAV"
    }*/
  }
};

export default config;
