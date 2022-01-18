// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/// @title Contract for adding two numbers and saving rezults
/// @author @oleh
/// @dev The project is purposely kept very simple for easy testing/deployment/...
contract Adder {
    uint[] private savedNumbers;

    event NewSummCalculated(address indexed user, uint firstNumber, uint secondNumber, uint summ);
    event ValueAddedToBlockChain(address indexed user, uint summ);
    event UserGetSavedNumbers(address indexed user, uint[] number);

    /// @notice Added two numbers, return summ and save it in ClockChain. Emit events about its
    /// @param _firstNumber The user`s public address
    /// @param _secondNumber The user`s public address
    /// @return Summ of two numbers
    function summTwoNumbers(uint _firstNumber, uint _secondNumber) external returns (uint) {
        // count summ
        uint summ = _firstNumber + _secondNumber;
        emit NewSummCalculated(msg.sender, _firstNumber, _secondNumber, summ);

        // writing summ in BlockChain
        savedNumbers.push(summ);
        emit ValueAddedToBlockChain(msg.sender, summ);

        return summ;
    }

    /// @notice Return data to all saved in BlockChain summs and emit about its
    function getSavedSumm() external returns (uint[] memory){
        emit UserGetSavedNumbers(msg.sender, savedNumbers);
        return savedNumbers;
    }
}
