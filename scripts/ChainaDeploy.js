const { ethers } = require("hardhat");
const hre = require("hardhat");
require("dotenv").config();
async function main() {
  const [initiator] = await ethers.getSigners()
  const ChainA = await ethers.getContractFactory("ChainA")
  const chainA = await ChainA.connect(initiator).deploy()
  console.log(chainA.address)
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
