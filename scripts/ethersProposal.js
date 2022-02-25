const { ethers } = require("ethers");
const Web3 = require("web3");

module.exports = async function(callback) {

    // Accounts
    const accounts = await web3.eth.getAccounts();

    // Mint amount
    const amount = 2000

    // Contracts
    const MyToken = artifacts.require("MyToken");
    const MyGovernor = artifacts.require("MyGovernor");

    const tokenAddress = MyToken.address

    // Encode Calldata
    let ABI = [
        "function _mint(address to, uint256 amount)"
    ];
    
    let iface = new ethers.utils.Interface(ABI);
    const callData = iface.encodeFunctionData("_mint", [ accounts[1], amount ])
    
    // Create instances
    const governorInstance = await MyGovernor.deployed();
    const tokenInstance = await MyToken.deployed();

    // Propose
    const result = await governorInstance.propose(
        [tokenAddress],
        [0],
        [callData],
        "Proposal #1: mint 2000",
    );

    const balance0 = await tokenInstance.balanceOf(accounts[0]);
    const balance1 = await tokenInstance.balanceOf(accounts[1]);

    // Log tx result
    console.log(`
        ${result.tx}\n\n
        ${result.logs[0]}
    `);

    callback();
};