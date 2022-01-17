const {expectEvent, expectRevert, BN} = require('@openzeppelin/test-helpers');
const Adder = artifacts.require("Adder");
const {expect} = require('chai');
const GAS_LIMIT = 100000;

contract("Adder", (accounts) => {

    let [alice, bob] = accounts;

    beforeEach(async () => {
        this.contractInstance = await Adder.new();
    })

    // Test Adder.summTwoNumbers() methods correctness
    context ("Adder.summTwoNumbers() methods correctness", async () => {

        it("Add 5 and 7 - positive status", async () => {
            const rezult = await this.contractInstance.summTwoNumbers(5, 7, {from: alice});
            expect(rezult.receipt.status).to.be.true;
        })
        it("Add 5 and 7 - correctness summ value", async () => {
            const rezult = await this.contractInstance.summTwoNumbers(5, 7, {from: alice});
            expect(rezult.logs[0].args.summ).to.be.bignumber.equal(new BN(12));
        })
        it("Add 5 and 7 - expense gas", async () => {
            const rezult = await this.contractInstance.summTwoNumbers(5, 7, {from: alice});
            expect(rezult.receipt.gasUsed).to.be.lessThan(GAS_LIMIT);
        })
    })

    // Test Adder.getSavedSumm() methods correctness
    context ("Adder.getSavedSumm() methods correctness", async () => {

        it("Get saved summ - positive status", async () => {
            const rezult = await this.contractInstance.seeSavedSumm({from: alice});
            expect(rezult.receipt.status).to.be.true;
        })
        it("Get saved summ - expense gas", async () => {
            const rezult = await this.contractInstance.seeSavedSumm({from: alice});
            expect(rezult.receipt.gasUsed).to.be.lessThan(GAS_LIMIT);
        })
    })
})