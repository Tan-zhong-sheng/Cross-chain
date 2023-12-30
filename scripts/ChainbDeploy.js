const { ethers } = require("hardhat");
const hre = require("hardhat");
require("dotenv").config();
async function main() {
  const [initiator] = await ethers.getSigners()
  const receive = new ethers.Wallet(process.env.RECEIVE_PRI)
  //链B合约
  const ChainB = await ethers.getContractFactory("ChainB")
  const chainB = await ChainB.connect(initiator).deploy()
  console.log(chainB.address)
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
