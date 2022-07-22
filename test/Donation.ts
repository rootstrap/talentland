import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Donation", function () {
    async function deployDonationContract() {
        const Donation = await ethers.getContractFactory("Donations");
        const donation = await Donation.deploy();
        const [owner, otherAccount] = await ethers.getSigners();
        const daiHolder = await ethers.getImpersonatedSigner("0xd6b26861139a52877Cd7adc437Edd7c5383fF585");
        const usdcHolder = await ethers.getImpersonatedSigner("0x9AC5637d295FEA4f51E086C329d791cC157B1C84");
        return {donation, owner, otherAccount, daiHolder, usdcHolder};
    }
    describe("Deployment", function() {
        it("Total donations value", async function() {
           const { donation } = await loadFixture(deployDonationContract);
            expect(await donation.totalDonations(0)).to.equal(0);
        });
    });

   describe("Donations", function() {
       it("Should update the donation counter if the caller is a DAI holder", async function() {
            const {donation, daiHolder} =  await loadFixture(deployDonationContract);
            const donationValue = ethers.utils.parseEther("200");
            await donation.connect(daiHolder).donationSimulationInDAI(donationValue);
            expect(await donation.totalDonations(0)).to.equal(donationValue);
        });

        it("Should update counter with several donations", async function() {
            const {donation, daiHolder} =  await loadFixture(deployDonationContract);
            /*[200,125,10,5].forEach(async (amount) => {
                const donationReference = ethers.utils.parseEther(String(amount));
                await donation.connect(daiHolder).donationSimulationInDAI(donationReference);
            });*/
            const donation1 = ethers.utils.parseEther("200");
            const donation2 = ethers.utils.parseEther("125");
            const totalDonated = ethers.utils.parseEther("325");
            await donation.connect(daiHolder).donationSimulationInDAI(donation1);
            await donation.connect(daiHolder).donationSimulationInDAI(donation2);
            expect(await donation.totalDonations(0)).to.equal(totalDonated);
        });

        it("Should update the donation counter if the caller is a USDC holder", async function() {
            const {donation, usdcHolder} =  await loadFixture(deployDonationContract);
            const donationValue = ethers.utils.parseUnits("200", "mwei");
            await donation.connect(usdcHolder).donationSimulationInUSDC(donationValue);
            expect(await donation.totalDonations(1)).to.equal(donationValue);
        });

        it("Should REVERT if the caller is NOT a DAI holder", async function() {
            const {donation} =  await loadFixture(deployDonationContract);
            const donationValue = ethers.utils.parseEther("200");
            await expect(donation.donationSimulationInDAI(donationValue)).to.be.revertedWith( "You don't have enough funds");
        });

        it("Should REVERT if the caller is NOT a USDC holder", async function() {
            const {donation} =  await loadFixture(deployDonationContract);
            const donationValue = ethers.utils.parseUnits("200", "mwei");
            await expect(donation.donationSimulationInUSDC(donationValue)).to.be.revertedWith( "You don't have enough funds");
        });
    });

})