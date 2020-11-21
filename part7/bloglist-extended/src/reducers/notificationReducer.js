let timeoutID = 0

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      clearTimeout(timeoutID)
      return { message: action.message, style: action.style }
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message, style, timeout = 5) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      style,
    })
    timeoutID = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, timeout * 1000)
  }
}

export default notificationReducer
