import { createActions } from 'redux-actions';

export const { local } = createActions({
  LOCAL: {
    POST_LOCAL: (data) => ({ data }),
    POST_LOCAL_RESPONSE: () => ({  }),
    POST_FIELD: (data) => ({ data }),
    POST_FIELD_RESPONSE: () => ({  }),
    FIELD_DATA: (data) => ({ data }),
    DATA_FIELD: (data) => ({ data }),
    DATA_FIELD_RESPONSE: (data) => ({ data }),
  }
})