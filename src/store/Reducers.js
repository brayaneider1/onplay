import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { auth } from '../services/Auth//AuthActions';
import reducerAuth from '../services/Auth/AuthReducer'
import reducerLocal from '../services/Locals/LocalReducer'
import reducerReservation from '../services/Reservations/ReservationsReducer'

const appReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: reducerAuth,
  local: reducerLocal,
  reservation: reducerReservation,
})

const rootReducer = (history) => {
  return (state, action) => {
    if (action.type === auth.logout) state = undefined;
    return appReducer(history)(state, action);
  }
}
export default rootReducer;