import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  loading: false,
  error:false,
}

const reducer = handleActions({
  RESERVATIONS: {
    POST_RESERVATIONS: (state, { payload: {} }) => ({ ...state, loading: true }),
    POST_RESERVATIONS_RESPONSE: {
      next(state, { payload: { data } }) {
        return { ...state, data,loading:false }
      },
      throw(state) {
        return { ...state,loading:false,error:true }
      }
    },
    CANCEL_RESERVATIONS: (state, { payload: {} }) => ({ ...state, loading: true }),
    CANCEL_RESERVATIONS_RESPONSE: {
      next(state, { payload: { data } }) {
        return { ...state, data,loading:false }
      },
      throw(state) {
        return { ...state,loading:false,error:true }
      }
    },
  }
  
},
  INITIAL_STATE 
);

export default reducer;