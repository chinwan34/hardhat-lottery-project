const { developmentChains } = require("../helper-hardhat-config");

const BASE_FEE = ethers.utils.parseEther("0.25"); // 0.25 link per request
const GAS_PRICE_LINK = 1e9; // Link per gas. Calcualted value based on the gas price of the link

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const args = [BASE_FEE, GAS_PRICE_LINK];

  if (developmentChains.includes(network.name)) {
    log("local network detected! Deploying mocks...");
    // Deploy a mock vrfcoordinator...
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      // The constructor of the VRFCoordinatorV2Mock file
      args: args,
    });
    log("Mocks Deployed!");
    log("---------------------------------------");
  }
};

module.exports.tags = ["all", "mocks"];
