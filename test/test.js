const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat")

     //查看合约余额
    //  let balance = await ethers.provider.getBalance(logistics.address)
    //  console.log(balance.toNumber())
describe("Test Contract", function () {
  async function deployTokenFixture() { 
    //获取用户地址
    const [initiator,receive,worker1,worker2,worker3] = await ethers.getSigners()
    console.log(initiator.address)
    
    const ChainA = await ethers.getContractFactory("ChainA")
    const chainA = await ChainA.deploy()
    
    
    //代理转换合约
    const ChainB = await ethers.getContractFactory("ChainB")
    const chainB = await ChainB.deploy()
    

    const ChainC = await ethers.getContractFactory("ChainC")
    const chainC = await ChainC.deploy()
    
    return {chainA,chainB,chainC,initiator,receive,worker1,worker2,worker3 }
  }


  //链A上数据
  async function setChinA() {
    const enc = "ipfs://bafkreig7wxnbzen6ka3ogu74wqjusyh3lf7mqoggv4tawu7ajtdrmb3gne"
    const {chainA,initiator} = await loadFixture(deployTokenFixture)

    let receipt = await chainA.connect(initiator).setEncIpfs(enc)
    receipt = await receipt.wait()
    console.log("部署结构体：", receipt)

    // const name =String.raw `b'\x98\x86o"Q\x04\x01I@\xe5\xdcx\xd8:\x81v' `
    // const phone = String.raw `b'\xee\xdb\x95s\xe3\x08\xbd\x02:\x9b\x04{\xa6\xd0\x16\x85'`
    // const id = String.raw`b'\x84\xbbS\xdci\xe7\xc79o\xfb\n=\xe2\x08\xbb.\xb2&\xd4~\xebrt\x9f\xaaj\xea\xc1\x00\x8d\x98\xc3'`
    // const location = String.raw`b'\x1f\xee\xd4\x93I\x8a\x9c\x96\xce\x99"~\x11\x96\xc2\xb6q$E\xa7J5Q\n\xb9|\xb8D\xe3or0'`
    return {}
  }


  async function payReEncryptContract() {
     const {initiator,receive,chainC,worker1,worker2} = await loadFixture(deployTokenFixture)
     const index = 0
     const rekey = [String.raw`b'\x0e&r\xfe~\x92&F\x7f_\x1b\xebZ\t\x01\xd1\x02\xee\x0e}Z\xab\xabO7w\xf1\xaf\xc7m\xbc\x916%\x0cy\x92\xf1\xa1i\xf0\x1b;\xdcJu\xf4\x13\x93\x9b\xc9\xe2FJ\xe1U\x94\xd2^\x89\x96mv\x94\x02z\x08\x0e\xde\xc5\xa3\xf1\xde\xd9\xe0"k\xb4\xa3i\x17\xfe\xd0@\xce7R\xb9d;6\x08\xcf\xfb\rw` + String.raw`\x03$\t\xe3\xd8\x84\xdd\x83o\x12e\x8c*o\xe9"\x1eW(\'D\xb9\xbf\xfd\xa6I\xf3\x9d\x95\xf9\xfb\xbb\xe7\xcd$U\x1aC\x96\x02\xea\xa5i\xbes<\xe3th\xfcht` + String.raw`\xbfn\x9eIs\x969\xe4;\x86\xb2\x15\x19K\xc8a\xf4\x0bs\rx9\x81\xaa0?\xde\xf9),\xfdR\x965\xc3\xce\xb0N\xf29\xfdO\xf6u4\xfd\x0c\xda\x02\xf3\xf35\x9bCj\t\x94\x07\x11\xf9_I\x8e\xd2\xbcl%7\xea\x0b\xcb"\x88 \xe7\xc3;\xcd\xe2\x87\xc2\xf7\xff\xf7P\x0ey\x8bf\xac\xc4\xe6\xe6\xfaj\x15\xf1\xef\xa5MX\xf0(\x1f...\x08\x01\x01'`,String.raw`b'\x03\xb2\xda\xbeN\xa02G \x19"\x10\xc5\x8f\xd8\x99p\xa7\xfc\xfd\xbf\x84O\xd3\xce\xb3\xa3\xf9\x8d\x9d\xadL\xe3\x02\xcc\xeb\x07a\xcb,0n\xff\xc3\xe5\x81\x97\xe3I\xea5Y\xce\x1dw^\xc8\x98A\xc2\x01U\x94\xa0+\xdfm\x7f\x19\xa4i@\x16\xe7\xe0\x90\xd4\xb5>\x18d\x80A\xdd\xa3\xd7\xfd` + String.raw`\r\xbd,\x95Z\x90\xbd\\\x05j'`]
     //const capsule = String.raw`b'\x03\xb2\xda\xbeN\xa02G \x19"\x10\xc5\x8f\xd8\x99p\xa7\xfc\xfd\xbf\x84O\xd3\xce\xb3\xa3\xf9\x8d\x9d\xadL\xe3\x02\xcc\xeb\x07a\xcb,0n\xff\xc3\xe5\x81\x97\xe3I\xea5Y\xce\x1dw^\xc8\x98A\xc2\x01U\x94\xa0+\xdfm\x7f\x19\xa4i@\x16\xe7\xe0\x90\xd4\xb5>\x18d\x80A\xdd\xa3\xd7\xfd` + String.raw`\r\xbd,\x95Z\x90\xbd\\\x05j'`
     const reenc = "ipfs://bafkreig7wxnbzen6ka3ogu74wqjusyh3lf7mqoggv4tawu7ajtdrmb3gne"
     /**
      * uint256 _deposit,string _hashLock,
    uint256 _consurbalance,address _decryptor,string memory _reEncIPFS
      * 
      */
     const hashLock = "李四15394403037福建省福州市鼓楼区城守前3号141030198111181023"
     let balance = ethers.parseEther("1.0")
    
     const pay = await chainC.connect(initiator).setOrderContract(10000000,hashLock,balance,receive.address,rekey,reenc,{
      value:balance
     }) 
    receipt = await pay.wait()
    console.log("订单合约往代理合约打钱需要：", receipt)
    
  
    receipt = await chainC.connect(worker1).joinProxy(0,{
      value: 10000000
    })
    console.log(1111111111)
   
    await chainC.connect(worker2).joinProxy(0,{
      value: 10000000
    })
    //PN获取重加密密钥
    console.log(await chainC.connect(worker1).getReKey(index))
    //设置胶囊碎片
    const cfarg = "ipfs://bafkreig7wxnbzen6ka3ogu74wqjusyh3lf7mqoggv4tawu7ajtdrmb3gne"
    receipt = await chainC.connect(worker1).setCfrag(cfarg,index)
    receipt = await receipt.wait()


    receipt = await chainC.connect(receive).setHonest(worker1.address,index)
    receipt = await receipt.wait()


    receipt = await chainC.connect(receive).chargeback(worker2.address,index)
    receipt = await receipt.wait()


    balance = await ethers.provider.getBalance(worker1.address)
    const balanceInEth = ethers.formatEther(balance.toString())
    console.log("领取前公证人节点余额:",balanceInEth)

    receipt = await chainC.connect(worker1).withdraw(index,hashLock)
    receipt = await receipt.wait()
    console.log("公证人节点领取代币交易回执",receipt)

    balance = await ethers.provider.getBalance(worker1.address)
    

    return {}
  }


  describe("function", function () {
    it("test", async () => {
      await loadFixture(deployTokenFixture)
      await loadFixture(setChinA)
      await loadFixture(payReEncryptContract) 
    })


  });
});