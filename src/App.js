import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initWeb3 } from './actions/votingActions';
import AddCandidate from './components/AddCandidate';
import CandidateList from './components/CandidateList';
import Vote from './components/Vote';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { candidates, voters, accounts } = useSelector((state) => state.voting);

  useEffect(() => {
    dispatch(initWeb3());
  }, [dispatch]);

  const refreshData = () => {
    dispatch(initWeb3());
  };

  return (
    <div className="container">
      <h1>Voting DApp</h1>
      <button onClick={refreshData}>Refresh Data</button>
      <AddCandidate />
      <CandidateList candidates={candidates} />
      {accounts.map((account, index) => (
        <div key={index}>
          <h2>Vote as {account}</h2>
          {voters[account] ? (
            <p>You have already voted.</p>
          ) : (
            <Vote candidates={candidates} accountIndex={index} />
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
