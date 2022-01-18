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
            var rezult = await this.contractInstance.summTwoNumbers.call(5, 7, {from: alice});
            expect(rezult).to.be.bignumber.equal(new BN(12));
        })
        it("Add 5 and 7 - expense gas", async () => {
            const rezult = await this.contractInstance.summTwoNumbers(5, 7, {from: alice});
            expect(rezult.receipt.gasUsed).to.be.lessThan(GAS_LIMIT);
        })
        it("Add 5 and 7 - emit events", async () => {
            const rezult = await this.contractInstance.summTwoNumbers(5, 7, {from: alice});
            await expectEvent.inTransaction(rezult.tx, this.contractInstance, "NewSummCalculated")
            await expectEvent.inTransaction(rezult.tx, this.contractInstance, "ValueAddedToBlockChain")
        })
    })

    // Test Adder.getSavedSumm() methods correctness
    context ("Adder.getSavedSumm() methods correctness", async () => {

        it("Get saved summ - positive status", async () => {
            const rezult = await this.contractInstance.getSavedSumm({from: alice});
            expect(rezult.receipt.status).to.be.true;
        })
        it("Get saved summ - last sum in returned list", async () => {
            await this.contractInstance.summTwoNumbers(5, 7, {from: alice});
            var rezult = await this.contractInstance.getSavedSumm.call({from: alice});
            last_index = rezult.length - 1;
            expect(rezult[last_index]).to.be.bignumber.equal(new BN(12));
        })
        it("Get saved summ - past sum in returned list", async () => {
            await this.contractInstance.summTwoNumbers(5, 7, {from: alice});
            await this.contractInstance.summTwoNumbers(1, 7, {from: alice});
            await this.contractInstance.summTwoNumbers(2, 1, {from: alice});
            await this.contractInstance.summTwoNumbers(4, 6, {from: alice});
            var rezult = await this.contractInstance.getSavedSumm.call({from: alice});
            expect(rezult.toString()).to.be.bignumber.include(new BN(12));
            expect(rezult.toString()).to.be.bignumber.include(new BN(8));
            expect(rezult.toString()).to.be.bignumber.include(new BN(3));
        })
        it("Get saved summ - expense gas", async () => {
            const rezult = await this.contractInstance.getSavedSumm({from: alice});
            expect(rezult.receipt.gasUsed).to.be.lessThan(GAS_LIMIT);
        })
        it("Get saved summ - availability for non-owner", async () => {
            const rezult = await this.contractInstance.getSavedSumm({from: bob});
            expect(rezult.receipt.status).to.be.true;
        })
        it("Get saved summ - emit events", async () => {
            const rezult = await this.contractInstance.getSavedSumm({from: alice});
            await expectEvent.inTransaction(rezult.tx, this.contractInstance, "UserGetSavedNumbers")
        })
    })
})