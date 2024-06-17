async function main() {
    const votingAddress = "0x6F09598E2B605F26884caD9303d6F567D8a4eEb4"; // Replace with your deployed contract address
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.attach(votingAddress);
  
    const candidatesCount = await voting.candidatesCount();
    console.log("Total candidates count:", candidatesCount.toString());
  
    const deployer = (await ethers.getSigners())[0];
    const voter1 = (await ethers.getSigners())[1];
    const voter2 = (await ethers.getSigners())[2];
  
    console.log("Deployer has voted:", await voting.voters(deployer.address));
    console.log("Voter1 has voted:", await voting.voters(voter1.address));
    console.log("Voter2 has voted:", await voting.voters(voter2.address));
  
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
  