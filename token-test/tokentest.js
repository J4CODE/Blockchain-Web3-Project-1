// Token.test.js

// Based on OpenZeppelin for securing a blockchain application.

const { expect } = require("chai");

// Import the utilities from Test the Helpers
const {
  BN,
  expectEvent,
  expectRevert,
  constants,
} = require("@openzeppelin/test-helpers");

// Load the compiled artifacts
const TestToken = artifacts.require("TestToken");

// Start the testing block
contract("TestToken", function ([creator, other]) {
  const NAME = "TestToken";
  const SYMBOL = "SIM";
  const TOTAL_SUPPLY = new BN("10000000000000000000000");

  beforeEach(async function () {
    this.token = await TestToken.new(NAME, SYMBOL, TOTAL_SUPPLY, {
      from: creator,
    });
  });

  it("retrieve will return a value previously stored", async function () {
    // Using large integer comparisons
    expect(await this.token.totalSupply()).to.be.bignumber.equal(TOTAL_SUPPLY);
  });

  it("has a name", async function () {
    expect(await this.token.name()).to.be.equal(NAME);
  });

  it("has a symbol", async function () {
    expect(await this.token.symbol()).to.be.equal(SYMBOL);
  });

  it("assigns the initial total supply to the token author", async function () {
    expect(await this.token.balanceOf(creator)).to.be.bignumber.equal(
      TOTAL_SUPPLY
    );
  });
});
