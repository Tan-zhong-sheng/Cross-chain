pragma solidity ^0.8.17;
//SPDX-License-Identifier:SimPL-2.0
contract ChainC {
    struct Proxy{
        address corssManage;
        //质押金
        uint256 deposit;

        //代理节点的余额
        mapping(address=>uint256) surbalance;

        //当前代理节点有几个了
        uint256 proxyNum;

        //跨链支付者支付的钱
        uint256 consurbalance;

        // rekey有几个，代理节点名额有几个
        string[] reKeys;

        //具体代理节点对应的重加密密钥
        mapping(address => string) reKey;

        mapping(address=>string) cfrags;
        
        // 解密者
        address decryptor;
        // 代理转换开始时间，超过1周截至
        uint256 startTime;
        //哈希锁
        bytes32 hashLock;
        //hash明文
        string plaintext;
        // 诚实节点
        address[] honestNode;
    }

    //当前proxy的长度
    uint256 proxyLength;
    mapping(uint256 => Proxy) public proxy;
    
    //构造函数
    constructor(){
        proxyLength = 0;
    }

    //设置订单合约
    function setOrderContract(uint256 _deposit,string memory _hashLock,
    uint256 _consurbalance,address _decryptor,string[] memory _reKeys) external payable{
        require(msg.value == _consurbalance);
        Proxy storage _proxy =  proxy[proxyLength++];
        _proxy.corssManage = msg.sender;
        _proxy.deposit = _deposit;
        _proxy.consurbalance = _consurbalance;
        _proxy.decryptor = _decryptor;
        _proxy.reKeys = _reKeys;
        _proxy.proxyNum = 0; 
        _proxy.hashLock = keccak256(abi.encode(_hashLock));
        _proxy.surbalance[msg.sender]=_consurbalance;
        _proxy.plaintext = _hashLock;
        _proxy.startTime = block.timestamp+4 weeks;
    }

    //加入代理节点
    function joinProxy(uint256 _index) external payable{
        //要求代理节点的数量要小于重加密密钥的数量
        Proxy storage _proxy = proxy[_index];
        require(_proxy.proxyNum < _proxy.reKeys.length);
        require(msg.value == _proxy.deposit);
        _proxy.surbalance[msg.sender] = _proxy.deposit;
        _proxy.reKey[msg.sender] = _proxy.reKeys[_proxy.proxyNum++];
    }

    //判断两个字符串的hash值是否一样
    function hashCompareInternal(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encode(a)) == keccak256(abi.encode(b));
    }

    //领钱
    function withdraw(uint256 _index,string memory _hashIndex) external{
        Proxy storage _proxy = proxy[_index]; 
        //哈希相同
        require(_proxy.hashLock==keccak256(abi.encode(_hashIndex)));
        //时间小于t1
        require(block.timestamp<_proxy.startTime);
        //是诚实节点
        require(_proxy.surbalance[msg.sender]>0);
        //领取金额
        payable(msg.sender).transfer(_proxy.surbalance[msg.sender]+(_proxy.consurbalance/_proxy.reKeys.length));
        _proxy.surbalance[msg.sender] = 0;
    }


    //若代理节点为恶意节点则扣除质押金
    function chargeback(address badNode,uint256 _index) external{
        Proxy storage _proxy = proxy[_index]; 
        require(_proxy.decryptor == msg.sender);
        _proxy.surbalance[_proxy.corssManage]+=_proxy.surbalance[badNode];
        _proxy.surbalance[badNode] = 0;
    }

    //获取重加密密钥
    function getReKey(uint256 _index) public view returns(string memory){
        Proxy storage _proxy = proxy[_index];
        require(_proxy.surbalance[msg.sender]>0);
        return proxy[_index].reKey[msg.sender];
    }
    //修改记得要限制必须是PN
    function setCfrag(string memory _cfrag,uint256 _index)external{
        Proxy storage _proxy = proxy[_index]; 
        require(_proxy.surbalance[msg.sender]>0);
        _proxy.cfrags[msg.sender] = _cfrag;
    }
    //设置诚实节点
    function setHonest(address honest,uint256 _index) external{
        Proxy storage _proxy = proxy[_index];
        require(_proxy.decryptor == msg.sender);
        _proxy.honestNode.push(honest);
    }
    function getPlainText(uint256 _index) external view returns(string memory){
        Proxy storage _proxy = proxy[_index];
        for(uint256 i=0; i<_proxy.honestNode.length; i++){
            if(_proxy.honestNode[i]==msg.sender){
                return _proxy.plaintext;
            } 
        }
        return "";
    }
    receive() external payable{
        
    }
    fallback() external payable{
        
    }
}