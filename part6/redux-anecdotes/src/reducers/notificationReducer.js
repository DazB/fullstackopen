const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (notification, timeout = 5) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, timeout * 1000)
  }
}

export default notificationReducer
