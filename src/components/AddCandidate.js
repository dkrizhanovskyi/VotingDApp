import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addCandidate } from '../actions/votingActions';

const AddCandidate = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addCandidate(name));
      setName('');
    }
  };

  return (
    <div>
      <h2>Add Candidate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCandidate;
