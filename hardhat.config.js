require("@nomicfoundation/hardhat-toolbox");
// require('@nomiclabs/hardhat-ethers');
require("dotenv").config();
module.exports = {

  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        runs: 200,
        enabled: true
      }
    }
  },
  networks: {
    Sepolia: {
      //去infura申请一个网址
      url:`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
    
      //放如prikey
      accounts: [process.env.PRIVATE_KEY,process.env.RECEIVE_PRI,process.env.WORKER1_PRI,process.env.WORKER2_PRI]
    },
    Goerli: {
      //去infura申请一个网址
      url: `https://goerli.infura.io/v3/${process.env.GOERLI_APT_KEY}`,
      //放如prikey
      accounts: [process.env.PRIVATE_KEY,process.env.RECEIVE_PRI,process.env.WORKER1_PRI,process.env.WORKER2_PRI]
    },
    PloygonMumbai:{
      url:`https://polygon-mumbai.infura.io/v3/${process.env.PloygonMubai_APT_KEY}`,
      accounts: [ process.env.PRIVATE_KEY,process.env.RECEIVE_PRI,process.env.WORKER1_PRI,process.env.WORKER2_PRI]
    }
  },
  etherscan: {
    apiKey: "7MPNXRTPSJR1VMEN26ZDRU68C78B66DFB4", // Your Etherscan API key
  },
};
