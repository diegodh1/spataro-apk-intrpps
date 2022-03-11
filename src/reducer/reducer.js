import {POST_LOGIN, REFRESH} from '../actions/types';

const initialState = {
  user: {
    AppUserName: '',
    AppUserEmail: '',
    AppUserLastName: '',
    AppUserErpName: '',
  },
  refresh: false,
  baseUrl: 'http://181.48.13.178:3001',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN:
      const newState = Object.assign({}, state, {user: action.data});
      return newState;
    case REFRESH:
      return {...state, refresh: action.data};
    default:
      return state;
  }
};

export default reducer;
