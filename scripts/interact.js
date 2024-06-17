const { ethers } = require("hardhat");

async function main() {
  const [deployer, voter1, voter2] = await ethers.getSigners();
  const votingAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.attach(votingAddress);

  console.log("Attached to Voting contract at address:", votingAddress);

  // Add candidates
  await voting.addCandidate("Charlie");
  console.log("Candidate Charlie added");
  await voting.addCandidate("Dave");
  console.log("Candidate Dave added");

  // Voters vote
  await voting.connect(voter1).vote(2);
  console.log("Voter1 voted for candidate 2 (Charlie)");
  await voting.connect(voter2).vote(3);
  console.log("Voter2 voted for candidate 3 (Dave)");

  // Check votes
  const candidatesCount = await voting.candidatesCount();
  console.log("Total candidates count:", candidatesCount.toString());

  for (let i = 0; i < candidatesCount; i++) {
    const candidate = await voting.candidates(i);
    console.log(`Candidate ${i}: ${candidate.name}, Votes: ${candidate.voteCount.toString()}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
