// migrations/2_deploy_contracts.js
const CriminalRecord = artifacts.require("CriminalRecord");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(CriminalRecord).then(() => {
    console.log("CriminalRecord contract deployed successfully!");
    console.log("Contract address:", CriminalRecord.address);
    console.log("Owner address:", accounts[0]);
  });
};