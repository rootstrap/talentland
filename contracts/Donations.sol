// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {IERC20} from "./interfaces/IERC20.sol";

/**
* @author https://github.com/davidAI04
**/
contract Donations {
    
    IERC20 dai = IERC20(0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063); 
    IERC20 usdc = IERC20(0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174);

    //0 = DAI , 1 = USDC
    uint256[2] public totalDonations;

    event newDonation(address, uint256);

    /**
    * @notice main function for DAI donations simulations
    * @param amount to be donate
    **/
    function donationSimulationInDAI(uint amount) public {
        require(amount >= 1e18, "Donation value > 1e18");
        donationSimulation(amount, 0);
    }

    /**
    * @notice main function for USDC donations simulations
    * @param amount to be donate
    **/
    function donationSimulationInUSDC(uint amount) public {
        require(amount >= 1e6, "Donation value > 1e6");
        donationSimulation(amount, 1);
    }

    /**
    * @notice Logic for simulations, check the user's balance does not exceed 
    * the amount to be donated and stored in the state the value "donated" by the user.
    * @param amount to be donate
    * @param coinReference 0 = DAI, 1 = USDC
    **/
    function donationSimulation(uint amount, uint8 coinReference) internal {
        uint256 balance = coinReference == 0 ? 
        dai.balanceOf(msg.sender) : usdc.balanceOf(msg.sender);
        require(balance >= amount, "You don't have enough funds");
        totalDonations[coinReference] += amount ;
        emit newDonation(msg.sender, amount);
    }

}