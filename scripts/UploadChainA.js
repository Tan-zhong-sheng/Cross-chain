const { ethers } = require("hardhat");
const hre = require("hardhat");
async function main() {
    const [initiator] = await ethers.getSigners()
    const contractAddress="0x17a04300e9a8571cb07705ad623f9c3e3dc88766";
    const ChainA = await hre.ethers.getContractAt("ChainA", contractAddress);
    const IPFS = "ipfs://bafkreidcrwlnd45ekr4pydfcvrcdxv6b7nxnoinxadn735a4x3xzl5xm5q"
    const name =String.raw `b'\x98\x86o"Q\x04\x01I@\xe5\xdcx\xd8:\x81v' `
    const phone = String.raw `b'\xee\xdb\x95s\xe3\x08\xbd\x02:\x9b\x04{\xa6\xd0\x16\x85'`
    const id = String.raw`b'\x84\xbbS\xdci\xe7\xc79o\xfb\n=\xe2\x08\xbb.\xb2&\xd4~\xebrt\x9f\xaaj\xea\xc1\x00\x8d\x98\xc3'`
    const location = String.raw`b'\x1f\xee\xd4\x93I\x8a\x9c\x96\xce\x99"~\x11\x96\xc2\xb6q$E\xa7J5Q\n\xb9|\xb8D\xe3or0'`

    // await ChainA.connect(initiator).setEncIpfs(IPFS)
    await ChainA.connect(initiator).directStorage(name,phone,id,location)
    
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });