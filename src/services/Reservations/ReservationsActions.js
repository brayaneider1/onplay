import { createActions } from 'redux-actions';

export const { reservations } = createActions({
  RESERVATIONS: {
    POST_RESERVATION: (data) => ({ data }),
    POST_RESERVATION_RESPONSE: () => ({  }),
    CANCEL_RESERVATION: (data) => ({ data }),
    CANCEL_RESERVATION_RESPONSE: () => ({  }),
  }
})