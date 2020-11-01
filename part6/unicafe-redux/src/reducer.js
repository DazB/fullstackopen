const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const changedStateGood = {
        ...state,
        good: state.good + 1,
      }
      return changedStateGood
    case 'OK':
      const changedStateOK = {
        ...state,
        ok: state.ok + 1,
      }
      return changedStateOK
    case 'BAD':
      const changedStateBad = {
        ...state,
        bad: state.bad + 1,
      }
      return changedStateBad
    case 'ZERO':
      return initialState
    default:
      return state
  }
}

export default counterReducer
