import {POST_LOGIN, REFRESH} from '../actions/types';

const initialState = {
  user: {AppUserName: '', AppUserEmail: '', AppUserLastName: ''},
  refresh: false,
  baseUrl: 'http://181.48.13.178:3001',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN:
      return {...state, user: action.data};
    case REFRESH:
      return {...state, refresh: action.data};
    default:
      return state;
  }
};

export default reducer;
