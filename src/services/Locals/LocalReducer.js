import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  loading: false,
  error:false,
  field:{openTime:'',closeTime:''},
}

const reducer = handleActions({
  LOCAL: {
    POST_LOCAL: (state, { payload: {} }) => ({ ...state, loading: true }),
    POST_LOCAL_RESPONSE: {
      next(state, { payload: { data } }) {
        return { ...state, data,loading:false }
      },
      throw(state) {
        return { ...state,loading:false,error:true }
      }
    },
    POST_FIELD: (state, { payload: {} }) => ({ ...state, loading: true }),
    POST_FIELD_RESPONSE: {
      next(state, { payload: { data } }) {
        return { ...state, data,loading:false }
      },
      throw(state) {
        return { ...state,loading:false,error:true }
      }
    },
    FIELD_DATA: (state, { payload: {data} }) => ({ ...state,field:data, loading: true }),
    DATA_FIELD: (state) => ({ ...state, loading: true }),
    DATA_FIELD_RESPONSE: {
      next(state, { payload: { data } }) {
        return { ...state,field:data,loading:false }
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