const initialState = {
  candidates: [],
  voters: {},
  accounts: [],
};

const votingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_CANDIDATES':
      return {
        ...state,
        candidates: action.payload,
      };
    case 'LOAD_VOTERS':
      return {
        ...state,
        voters: action.payload,
      };
    case 'SET_ACCOUNTS':
      return {
        ...state,
        accounts: action.payload,
      };
    default:
      return state;
  }
};

export default votingReducer;
