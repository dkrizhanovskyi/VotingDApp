require('dotenv').config({ path: './key.env' });

const { INFURA_PROJECT_ID, MNEMONIC } = process.env;

console.log("Loaded INFURA_PROJECT_ID:", INFURA_PROJECT_ID);
console.log("Loaded MNEMONIC:", MNEMONIC);

if (!INFURA_PROJECT_ID || !MNEMONIC) {
  throw new Error("Please set your INFURA_PROJECT_ID and MNEMONIC in a .env file");
}

require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.0",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: MNEMONIC
      }
    }
  }
};
