const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    const [initiator,receive] = await ethers.getSigners()
    const contractAddress="0x6e1a46de1ba54bc153af27c97861e9bbd44e2ae0";
    const ChainB = await hre.ethers.getContractAt("ChainB", contractAddress);
    const IPFS = "ipfs://bafkreiasu23oecls5r2ipzg3ihmsfoorbwbs5i2rrharzi4qqncwqti63a"
    await ChainB.connect(receive).setEncIpfs(IPFS)
   
    
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });