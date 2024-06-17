import React from 'react';

const CandidateList = ({ candidates }) => {
  return (
    <div>
      <h2>Candidate List</h2>
      <ul>
        {candidates.map((candidate, index) => (
          <li key={index}>
            {candidate.name} - {candidate.voteCount} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
