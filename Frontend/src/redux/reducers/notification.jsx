import {
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_SUCCESS,
  CREATE_NOTIFICATION_FAIL,
  CREATE_NOTIFICATION_SUCCESS,
  REJECT_REQUEST_SUCCESS,
  REJECT_REQUEST_FAIL,
} from "../actions/types";

const initialState = {
  notifications: null,
  huboCambio: false,
};

export default function Notifications(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: payload.notifications,
      };
    case GET_NOTIFICATIONS_FAIL:
      return {
        ...state,
        notifications: null,
      };
    case CREATE_NOTIFICATION_SUCCESS:
    case CREATE_NOTIFICATION_FAIL:
    case "SET_HUBO_CAMBIO":
      return {
        ...state,
        huboCambio: payload,
      };

    case REJECT_REQUEST_SUCCESS:
    case REJECT_REQUEST_FAIL:

    default:
      return state;
  }
}
