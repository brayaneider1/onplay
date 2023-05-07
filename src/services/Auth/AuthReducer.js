import { handleActions } from 'redux-actions';
import { Token } from '../../common/Storage/Token';

export const INITIAL_STATE = {
  authentication: Token.getToken(),
  loading: false,
  error:false,
  token:{data:{},token:null}
}

const reducer = handleActions({
  AUTH: {
    LOGIN: (state, { payload: {} }) => ({ ...state, loading: true }),
    LOGIN_RESPONSE: {
      next(state, { payload: { token } }) {
        return { ...state, token, authentication: true,loading:false }
      },
      throw(state) {
        return { ...state,loading:false,error:true }
      }
    },

    LOGOUT: (state, { payload: {} }) => ({ ...state, authentication: false }),
  }
},
  INITIAL_STATE 
);

export default reducer;