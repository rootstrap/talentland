import { ethers } from "hardhat";

async function main() {
  const Donation = await ethers.getContractFactory("Donations");
  const donation = await Donation.deploy();
  await donation.deployed();

  console.log("CONTRACT DEPLOYED AT:", donation.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
