import {
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_SUCCESS,
  CREATE_NOTIFICATION_FAIL,
  CREATE_NOTIFICATION_SUCCESS,
} from "../actions/types";

const initialState = {
  notifications: null,
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
    default:
      return state;
  }
}
