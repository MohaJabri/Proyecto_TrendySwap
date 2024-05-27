import {
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  GET_OWNER_USER_PROFILE_SUCCESS,
  GET_OWNER_USER_PROFILE_FAIL,
} from "../actions/types";

const initialState = {
  ownerProfile: null,
  profile: null,
};

export default function Profile(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload.profile,
      };
    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        profile: null,
      };
    case GET_OWNER_USER_PROFILE_SUCCESS:
      return {
        ...state,
        ownerProfile: payload.profile,
      };
    case GET_OWNER_USER_PROFILE_FAIL:
      return {
        ...state,
        ownerProfile: null,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload.profile,
      };
    case UPDATE_USER_PROFILE_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
