pragma solidity ^0.8.17;
//SPDX-License-Identifier:SimPL-2.0
contract ChainB {
    
    string public EncIPFS;
    constructor(){

    }
    function setEncIpfs(string memory _EncIPFS) external{
        EncIPFS = _EncIPFS;
    }
}