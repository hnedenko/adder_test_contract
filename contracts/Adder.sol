// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/// @title Contract for adding two numbers and saving rezults
/// @author @oleh
/// @dev The project is purposely kept very simple for easy testing/deployment/...
contract Adder {
    uint[] private saved_numbers;

    event NewSummCalculated(address user, uint firstNumber, uint secondNumber, uint summ);
    event ValueAddedToBlockChain(address user, uint summ);
    event GetAllNumbers(address user);

    /// @notice Added two numbers and save summ in ClockChain. Emit events about its
    /// @param _firstNumber The user`s public address
    /// @param _secondNumber The user`s public address
    function summTwoNumbers(uint _firstNumber, uint _secondNumber) external {
        // count summ
        uint summ = _firstNumber + _secondNumber;
        emit NewSummCalculated(msg.sender, _firstNumber, _secondNumber, summ);

        // writing summ in BlockChain
        saved_numbers.push(summ);
        emit ValueAddedToBlockChain(msg.sender, summ);
    }
    /// @notice Returns all saved in BlockChain summs and emit event about it
    /// @return all saved in BlockChain summs
    function getSavedSumm() external returns (uint[] memory) {
        emit GetAllNumbers(msg.sender);
        return saved_numbers;
    }
}
