import { GET_USERS_SUCCESS, GET_USERS_FAIL } from "../actions/types";

const initialState = {
  users: [],
};

export default function Users(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        users: [],
      };
    default:
      return state;
  }
}
