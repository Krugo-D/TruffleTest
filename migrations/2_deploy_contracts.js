var MyToken = artifacts.require("MyToken");
var MyGovernor = artifacts.require("MyGovernor");

module.exports = async function(deployer) {
    //deploy ERC20 test token
    await deployer.deploy(MyToken);
    const token = await MyToken.deployed();

    //define test token contract address and timelock contract address 
    const tokenAddress = token.address;
    const zeroAddress = "0x0000000000000000000000000000000000000000";

    //deploy governor contract
    await deployer.deploy(MyGovernor, tokenAddress, zeroAddress);
};