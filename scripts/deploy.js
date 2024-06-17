async function main() {
  const hre = require("hardhat");

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  await voting.deployed();
  console.log("Voting contract deployed to:", voting.address);

  // Добавление кандидатов
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
