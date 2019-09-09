import axios from 'axios'
import web3 from '../../../components/Web3.js'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const login = (username, password) => {
  return (dispatch, getState) => {
    return axios.post(`${API_URL}/login`, {username, password})
      .then((res) => {
        let data = res.data[0];
        let ethAccount = web3.eth.accounts.privateKeyToAccount(data.privateKey);
        let address = ethAccount.address;
        data.address = address
        dispatch({
          type    : LOGIN_SUCCESS,
          payload : data
        })
      })
  }
}

export const actions = {
  login
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_SUCCESS]  : (state, action) => {
    return {
      ...state,
      user: action.payload
    }
  },
  [LOGIN_ERROR]  : (state, action) => {
    return {
      ...state,
      loginError: action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    user: null,
    loginError: null
}
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
