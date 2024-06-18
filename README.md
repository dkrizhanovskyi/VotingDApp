### README.md

```markdown
# Voting DApp

This is a decentralized voting application built on Ethereum using Solidity, React, and Hardhat. The application allows users to add candidates and vote for them through a web interface and a Telegram bot.

## Project Structure

```
VotingDApp/
├── contracts/
│   ├── SimpleStorage.sol
│   └── Voting.sol
├── public/
│   └── index.html
├── scripts/
│   ├── check.js
│   ├── deploy.js
│   └── interact.js
├── src/
│   ├── components/
│   │   ├── AddCandidate.js
│   │   ├── CandidateList.js
│   │   ├── Vote.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── Voting.json
├── test/
│   └── Voting.test.js
├── .gitattributes
├── .gitignore
├── bot.js
├── hardhat.config.js
├── package.json
├── package-lock.json
├── README.md
├── truffle-config.js
└── style.css
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dkrizhanovskyi/VotingDApp
   cd VotingDApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile the smart contracts:

   ```bash
   npx hardhat compile
   ```

## Deployment

1. Start a local Ethereum node using Hardhat:

   ```bash
   npx hardhat node
   ```

2. Deploy the smart contracts:

   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

3. Note the deployed contract address and update the `App.js`, `bot.js`, and `interact.js` files with the deployed contract address.

## Running the Application

1. Start the React development server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` to interact with the DApp.

## Running the Telegram Bot

1. Create a new bot on Telegram using the BotFather and obtain the bot token.

2. Update the `bot.js` file with your bot token.

3. Start the bot:

   ```bash
   node bot.js
   ```

## Testing

Run the tests using Hardhat:

```bash
npx hardhat test
```

## Project Components

### Smart Contracts

- `SimpleStorage.sol`: A basic storage contract (not directly used in this project).
- `Voting.sol`: The main voting contract allowing adding candidates and voting.

### Frontend

- `public/index.html`: The main HTML file.
- `src/App.js`: Main React component.
- `src/components/AddCandidate.js`: Component for adding candidates.
- `src/components/CandidateList.js`: Component for listing candidates.
- `src/components/Vote.js`: Component for voting.

### Scripts

- `scripts/check.js`: Script to check contract state.
- `scripts/deploy.js`: Script to deploy the contract.
- `scripts/interact.js`: Script to interact with the contract.

### Tests

- `test/Voting.test.js`: Tests for the voting contract.

## License

This project is licensed under the MIT License.
```

