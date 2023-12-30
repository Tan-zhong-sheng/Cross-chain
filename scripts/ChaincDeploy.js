const { ethers } = require("hardhat");
const hre = require("hardhat");
require("dotenv").config();
async function main() {
  const [initiator] = await ethers.getSigners()
  const ChainC = await ethers.getContractFactory("ChainC")
  const chainC = await ChainC.connect(initiator).deploy()
  console.log(chainC.address)
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
