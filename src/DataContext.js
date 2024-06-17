import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import contractData from './Voting.json';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [voters, setVoters] = useState({});

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = new Web3(Web3.givenProvider || "http://localhost:8545");
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccounts(accounts);
        const contractInstance = new web3Instance.eth.Contract(contractData.abi, contractAddress);
        setContract(contractInstance);
        await loadCandidates(contractInstance);
        await loadVoters(contractInstance, accounts);
      } catch (error) {
        console.error("Error initializing web3: ", error);
      }
    };
    init();
  }, []);

  const loadCandidates = async (contractInstance) => {
    try {
      const candidatesCount = await contractInstance.methods.candidatesCount().call();
      const candidatesArray = [];
      for (let i = 0; i < candidatesCount; i++) {
        const candidate = await contractInstance.methods.getCandidate(i).call();
        candidatesArray.push({ name: candidate[0], voteCount: candidate[1].toString() });
      }
      setCandidates(candidatesArray);
    } catch (error) {
      console.error("Error loading candidates:", error);
    }
  };

  const loadVoters = async (contractInstance, accounts) => {
    try {
      const votersStatus = {};
      for (let account of accounts) {
        const hasVoted = await contractInstance.methods.voters(account).call();
        votersStatus[account] = hasVoted;
      }
      setVoters(votersStatus);
    } catch (error) {
      console.error("Error loading voters:", error);
    }
  };

  const refreshData = async () => {
    if (contract) {
      await loadCandidates(contract);
      await loadVoters(contract, accounts);
    }
  };

  return (
    <DataContext.Provider value={{ candidates, voters, addCandidate, vote, refreshData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
