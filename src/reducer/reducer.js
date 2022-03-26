import {POST_LOGIN, REFRESH} from '../actions/types';

const initialState = {
  user: {AppUserName: '', AppUserEmail: '', AppUserLastName: ''},
  refresh: false,
  baseUrl: 'http://190.242.101.171:10042',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN:
      const newState = Object.assign(
        {},
        {baseUrl: state.baseUrl, refresh: false, user: action.data},
      );
      return newState;
    case REFRESH:
      return {...state, refresh: action.data};
    default:
      return state;
  }
};

export default reducer;
