import { combineReducers } from 'redux';
import votingReducer from './votingReducer';

export default combineReducers({
  voting: votingReducer,
});
