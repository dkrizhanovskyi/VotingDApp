import React from 'react';
import { useDispatch } from 'react-redux';
import { vote } from '../actions/votingActions';

const Vote = ({ candidates, accountIndex }) => {
  const dispatch = useDispatch();

  return (
    <div>
      {candidates.map((candidate, index) => (
        <button
          key={index}
          onClick={() => dispatch(vote(index, accountIndex))}
        >
          Vote for {candidate.name}
        </button>
      ))}
    </div>
  );
};

export default Vote;
