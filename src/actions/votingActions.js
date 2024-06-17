import Web3 from 'web3';
import contractData from '../Voting.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

let web3;
let contract;

export const initWeb3 = () => async (dispatch) => {
  try {
    web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    contract = new web3.eth.Contract(contractData.abi, contractAddress);
    dispatch({ type: 'SET_ACCOUNTS', payload: accounts });
    dispatch(loadCandidates());
    dispatch(loadVoters(accounts));
  } catch (error) {
    console.error("Error initializing web3: ", error);
  }
};

export const loadCandidates = () => async (dispatch) => {
  try {
    const candidatesCount = await contract.methods.candidatesCount().call();
    const candidatesArray = [];
    for (let i = 0; i < candidatesCount; i++) {
      const candidate = await contract.methods.getCandidate(i).call();
      candidatesArray.push({ name: candidate[0], voteCount: candidate[1].toString() });
    }
    dispatch({ type: 'LOAD_CANDIDATES', payload: candidatesArray });
  } catch (error) {
    console.error("Error loading candidates:", error);
  }
};

export const loadVoters = (accounts) => async (dispatch) => {
  try {
    const votersStatus = {};
    for (let account of accounts) {
      const hasVoted = await contract.methods.voters(account).call();
      votersStatus[account] = hasVoted;
    }
    dispatch({ type: 'LOAD_VOTERS', payload: votersStatus });
  } catch (error) {
    console.error("Error loading voters:", error);
  }
};

export const addCandidate = (name) => async (dispatch, getState) => {
  const { voting: { accounts } } = getState();
  try {
    await contract.methods.addCandidate(name).send({ from: accounts[0] });
    dispatch(loadCandidates());
  } catch (error) {
    console.error("Error adding candidate:", error);
  }
};

export const vote = (candidateId, accountIndex) => async (dispatch, getState) => {
  const { voting: { accounts, voters } } = getState();
  try {
    if (voters[accounts[accountIndex]]) {
      console.log("User has already voted.");
      return;
    }
    await contract.methods.vote(candidateId).send({ from: accounts[accountIndex] });
    dispatch(loadCandidates());
    dispatch(loadVoters(accounts));
  } catch (error) {
    console.error("Error voting:", error);
  }
};
