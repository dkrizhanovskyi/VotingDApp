async function main() {
    const hre = require("hardhat");
  
    const Voting = await hre.ethers.getContractFactory("Voting");
    const voting = await Voting.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3"); // Замените на адрес вашего контракта
  
    await voting.addCandidate("Alice");
    await voting.addCandidate("Bob");
  
    console.log("Candidates added.");
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  