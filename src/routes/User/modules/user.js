import web3 from '../../../components/Web3.js'

export const GET_USER_INFO = 'GET_USER_INFO'
export const GET_USER_BALANCE = 'GET_USER_BALANCE'
export const GET_USER_TICKETS = 'GET_USER_TICKETS'
export const GET_USER_EVENTS = 'GET_USER_EVENTS'

export const getUserInfo = () => {
  // return (dispatch, getState) => {
  //   web3.eth
  //
  //   .then((tickets) => {
  //     dispatch({
  //       type: GET_USER_INFO,
  //       payload: tickets
  //     })
  //   });
  //
  // }
}

export const getUserTickets = () => {
  return (dispatch, getState) => {
    web3.eth

    .then((tickets) => {
      dispatch({
        type: GET_USER_TICKETS,
        payload: tickets
      })
    });

  }
}

export const getUserEvents = () => {
  return (dispatch, getState) => {
    console.log('getState(): ', getState())
    const { abis, terrapinAddr } = getState().events;
    let terrapin = new web3.eth.Contract(abis.terrapin.abi, terrapinAddr);
    console.log('getUserEventsContract: ', terrapin);
    let userEvents = [];
    return terrapin.methods.getEvents().call().then((eventContractAddrs) => {
      let populatedEvents = eventContractAddrs.map((eventAddr, index) => {
        let eventContract = new web3.eth.Contract(abis.event.abi, eventAddr)
        console.log('eventContract: ', eventContract);
      });
    });

    // .then((tickets) => {
    //   dispatch({
    //     type: GET_USER_EVENTS,
    //     payload: tickets
    //   })
    // });
  }

}

export const getUserBalance = (privateKey) => {
  console.log('getbalance');
  return (dispatch, getState) => {
    console.log('getState()', getState());
    web3.eth.getBalance(getState().login.user.address)
      .then((balance) => {
        console.log('balance: ', balance);
        dispatch({
          type: GET_USER_BALANCE,
          payload: balance
        });
      });
  }
}

export const actions = {
  getUserInfo,
  getUserTickets,
  getUserEvents,
  getUserBalance
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_USER_INFO]  : (state, action) => {
    return {
      ...state
    }
  },
  [GET_USER_BALANCE]  : (state, action) => {
    return {
      ...state,
      balance: action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
