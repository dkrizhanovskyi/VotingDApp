// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint public candidatesCount;

    event votedEvent(uint indexed candidateId);

    function addCandidate(string memory name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
    }

    function vote(uint candidateId) public {
        require(!voters[msg.sender], "You have already voted");
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate ID");

        voters[msg.sender] = true;
        candidates[candidateId].voteCount++;

        emit votedEvent(candidateId);
    }

    function getCandidate(uint candidateId) public view returns (uint, string memory, uint) {
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate ID");
        Candidate memory candidate = candidates[candidateId];
        return (candidate.id, candidate.name, candidate.voteCount);
    }
}
