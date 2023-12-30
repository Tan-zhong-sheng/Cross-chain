const { ethers } = require("hardhat");
const hre = require("hardhat");
const contractAddress="0xb2c7830b830e41eb2a46543511ab60f33c64e5fc";
const index = 0
async function crosschain() {
    const [initiator,receive,worker1,worker2] = await ethers.getSigners()
    const ChainC = await hre.ethers.getContractAt("ChainC", contractAddress);
    const rekey1 = String.raw `b'-\\.\x97\xf7+#(\xb3gU\r\xd3\x93\xb6\x06\xf2\xd5x\xc0o<\xe2\xd4-5\xad\xbc,\xec`+String.raw`\xe8\xbb\xa5\xe6\x90^e\xb6A\xc5\xdf\x97\xeev\xad\xcd,\xb8\x96;e\xd7\x1c\xcd\x8f\x82ARp\xc28\x83\x9b\x03\x8a\x89\xef\xaf\xe4\xd3]\xe2!\xe6\x8e\x83\xde\xcaH\x83\xfc\x88\xb8(I)~\xd0\xae\xd4pB9=\x96g\x03|\x0b\xb7f\x10Y\xaf\xe5\xca\xf0]|\xf7m\xed \x82\xfa\xaet\x8b\xc7\xc3(\xdf7\x133f\xcc\xda\xa4\x07\xd6\xc4\x86\x8d\x8a\xb7\xd7f,\xab\xa8\xf0\x80"\xf9_\x9b\x82\xac\x9apI\xf5g\xc4\xaf\xd0\xaf\xb9"$\x08\xc40\xb6\xbc4\xf1B\xf8T\x82A\x84\xa4Jj\xf7\xacG$\x02\x7fa\xe6\xc2\xa9b\x9e\xe0]\x9b\xd3\x9a\x81\x8e\xaf\x02)\xe4v\x84\x99\xdbd\x96\x0b\xd0\xf8i\x80\xac\xe3\xc9\xec\xfen\x14i\xae&\xcdN:\xca\x1d\xde\xa4\xb8fM>\xb0\x03A\xaaQ\x04P\xbe\x08\x1c\x8d/\xaf\x8a\xae\xbf\x84-\xff\xe5\xbc\xdb|\x95\xe7\x01\x01'`
    const rekey2 = String.raw`'\x87Jj|\xbc\xeb\x0c\x93l\x94^\x84\x1e^\x8aNc0\xb4\xe0\xcc\x9c\xab\x1d\x98\xc8\xa9\xe1\xba\x87\xa3\x14\xbb\xa5\xe6\x90^e\xb6A\xc5\xdf\x97\xeev\xad\xcd,\xb8\x96;e\xd7\x1c\xcd\x8f\x82ARp\xc28\x83\x9b\x03\x8a\x89\xef\xaf\xe4\xd3]\xe2!\xe6\x8e\x83\xde\xcaH\x83\xfc\x88\xb8(I)~\xd0\xae\xd4pB9=\x96g\x03|\x0b\xb7f\x10Y\xaf\xe5\xca\xf0]|\xf7m\xed \x82\xfa\xaet\x8b\xc7\xc3(\xdf7\x133f\xcc\xda\xa451\xb1\xd5?\x0bBBiS{\x03 \xd1\xb1\x94\xc0\xd0\x9b\x82s";K\xbb\x98\xf1p\xb8\xd0\xbf%kV\xc5}\xf3w\xfb\xff\xdd\xfc\x02c\x90\x16,X\xd1\xd1G\x10s\xd4/^\xd5[Y\x98\xbb\\Bk\x02b9\xc4\xd1\x07Z\xbe\xaa\xe5\x83\xbc\xfek&\r\x190\x0b5\xfb3\xb9l\xef\x85\x8a\x94,\x00\x00\xcbY7\xe3~Rb.\\G\xefq\x1a\xbe\xf5\xf8\xd0\t\x8a\xb7H8\xbax \xddH;uVoa\xd0\x01\x01'`
    const rekeys = [rekey1,rekey2]
    const hashLock = "李四15394403037福建省福州市鼓楼区城守前3号141030198111181023"
    let balance = ethers.parseEther("0.1")
    await ChainC.connect(initiator).setOrderContract(10000000,hashLock,balance,receive.address,rekeys,{
      value:balance
     }) 
}
async function join(){
    const [initiator,receive,worker1,worker2] = await ethers.getSigners()
    const ChainC = await hre.ethers.getContractAt("ChainC", contractAddress);
    await ChainC.connect(worker1).joinProxy(0,{
        value: 10000000
      })
     
    await ChainC.connect(worker2).joinProxy(0,{
        value: 10000000
    }) 
}
async function setCfrag(){
    const [initiator,receive,worker1,worker2] = await ethers.getSigners()
    const ChainC = await hre.ethers.getContractAt("ChainC", contractAddress);
    const cfarg1 = "ipfs://bafkreiepln52vs524xc7w5e5ptoisfstksgkr4gdv6t7fuopjsm7mrsd4i"
    const cfarg2 = "ipfs://bafkreicl4ghuhkmnqh6ennvc26h24n6ndgirqgusnprttbu3zfb4uumruy"
    await ChainC.connect(worker1).setCfrag(cfarg1,index)
    await ChainC.connect(worker2).setCfrag(cfarg2,index)
}
async function setNode(){
    const [initiator,receive,worker1,worker2] = await ethers.getSigners()
    const ChainC = await hre.ethers.getContractAt("ChainC", contractAddress);
    await ChainC.connect(receive).setHonest(worker1.address,index)
    await ChainC.connect(receive).chargeback(worker2.address,index)
}
async function withdraw(){
    const [initiator,receive,worker1,worker2] = await ethers.getSigners()
    const hashLock = "李四15394403037福建省福州市鼓楼区城守前3号141030198111181023"
    const ChainC = await hre.ethers.getContractAt("ChainC", contractAddress);
    // receipt = await ChainC.connect(worker2).withdraw(index,hashLock)
    // console.log(receive)
    balance = await ethers.provider.getBalance(worker1.address)
    receipt = await ChainC.connect(initiator).withdraw(index,hashLock)
    receipt = await receipt.wait()
    console.log("Notary node receives token transaction receipt",receipt)
}
// crosschain().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });
// join().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });
// setCfrag().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });
// setNode().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });
withdraw().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});