import {POST_LOGIN, REFRESH} from '../actions/types';

const initialState = {
  user: {success: false, user: {}, message: ''},
  refresh: false,
  baseUrl: 'http://35.171.19.122:8080',
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
