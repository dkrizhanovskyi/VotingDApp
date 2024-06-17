const { expect } = require("chai");

describe("Voting contract", function () {
  let Voting;
  let voting;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    Voting = await ethers.getContractFactory("Voting");
    [owner, addr1, addr2, _] = await ethers.getSigners();
    voting = await Voting.deploy();
    await voting.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await voting.owner()).to.equal(owner.address);
    });

    it("Should initialize with two candidates", async function () {
      const candidatesCount = await voting.candidatesCount();
      expect(candidatesCount).to.equal(2);

      const candidate1 = await voting.getCandidate(0);
      expect(candidate1[0]).to.equal("Alice");

      const candidate2 = await voting.getCandidate(1);
      expect(candidate2[0]).to.equal("Bob");
    });
  });

  describe("Voting", function () {
    it("Should let users vote and record votes correctly", async function () {
      await voting.connect(addr1).vote(0);
      await voting.connect(addr2).vote(1);

      const candidate1 = await voting.getCandidate(0);
      expect(candidate1[1]).to.equal(1);

      const candidate2 = await voting.getCandidate(1);
      expect(candidate2[1]).to.equal(1);
    });

    it("Should not allow double voting", async function () {
      await voting.connect(addr1).vote(0);
      await expect(voting.connect(addr1).vote(0)).to.be.revertedWith("You have already voted.");
    });

    it("Should not allow voting for non-existent candidates", async function () {
      await expect(voting.connect(addr1).vote(999)).to.be.revertedWith("Invalid candidate ID.");
    });
  });

  describe("Candidate Management", function () {
    it("Should allow adding candidates", async function () {
      await voting.addCandidate("Charlie");
      const candidatesCount = await voting.candidatesCount();
      expect(candidatesCount).to.equal(3);

      const candidate = await voting.getCandidate(2);
      expect(candidate[0]).to.equal("Charlie");
    });

    it("Should not allow adding empty candidates", async function () {
      await expect(voting.addCandidate("")).to.be.revertedWith("Candidate name cannot be empty");
    });
  });
});
