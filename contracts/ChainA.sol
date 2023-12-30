pragma solidity ^0.8.17;
//SPDX-License-Identifier:SimPL-2.0
contract ChainA {
    string public EncIPFS;
    string public username;
    string public userphone;
    string public userId;
    string public location;
    constructor(){

    }
    function directStorage(string memory _username,string memory _userphone
    ,string memory _userId,string memory _location)external{
        username = _username;
        userphone = _userphone;
        userId = _userId;
        location = _location;
    }
    function setEncIpfs(string memory _EncIPFS) external{
        EncIPFS = _EncIPFS;
    }
}