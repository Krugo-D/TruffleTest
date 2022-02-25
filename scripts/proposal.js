const Web3 = require("web3");

// Contracts
const MyToken = artifacts.require("MyToken");
const MyGovernor = artifacts.require("MyGovernor");

module.exports = async function(callback) {
	
    const tokenAddress = MyToken.address;
    

    const callData = web3.eth.abi.encodeFunctionCall({
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }, []
    );

    const instance = await MyGovernor.deployed()
    
    

    returnValue = await instance.propose(
        [tokenAddress],
        [0],
        [callData],
        "Proposal #1: check totalSupply of MyToken",
    );

    


    console.log(
        `
        token address is: ${tokenAddress}\n
        is governor deployed? ${await MyGovernor.isDeployed()}\n
        the returned value is: ${JSON.stringify(returnValue)}
        `
        );
    
        
	callback();
}