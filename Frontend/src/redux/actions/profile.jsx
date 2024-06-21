import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_OWNER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  GET_OWNER_USER_PROFILE_SUCCESS,
  GET_OWNER_USER_PROFILE_FAIL,
} from "./types";
const backend_url = 'http://trendyswap.es:8000';;

export const get_owner_user_profile = (userId) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    try {
      const res = await axios.get(
        `${backend_url}/api/profile/user/${userId}`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: GET_OWNER_USER_PROFILE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_OWNER_USER_PROFILE_FAIL,
        });
        dispatch(setAlert("Failed to get profile", "red"));
      }
    } catch (err) {
      dispatch({
        type: GET_USER_PROFILE_FAIL,
      });
      dispatch(setAlert("Failed to get profile", "red"));
    }
  }
};

export const get_user_profile = (userId) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    try {
      const res = await axios.get(
        `${backend_url}/api/profile/user/${userId}`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: GET_USER_PROFILE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_USER_PROFILE_FAIL,
        });
        dispatch(setAlert("Failed to get profile", "red"));
      }
    } catch (err) {
      dispatch({
        type: GET_USER_PROFILE_FAIL,
      });
      dispatch(setAlert("Failed to get profile", "red"));
    }
  }
};

export const update_user_profile =
  (
    is_owner,
    first_name,
    last_name,
    phone,
    address,
    city,
    country,
    state,
    postal_code,
    userId,
    profile_image
  ) =>
  async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      const body = new FormData();
      body.append("first_name", first_name);
      body.append("last_name", last_name);
      body.append("phone", phone);
      body.append("address", address);
      body.append("city", city);
      body.append("country", country);
      body.append("state", state);
      body.append("postal_code", postal_code);
      body.append("profile_image", profile_image);

      try {
        const res = await axios.put(
          `${backend_url}/api/profile/update/${userId}`,
          body,
          config
        );

        if (res.status === 200) {
          if (is_owner) {
            dispatch({
              type: UPDATE_OWNER_PROFILE_SUCCESS,
              payload: res.data,
            });

            dispatch(setAlert("Profile updated successfully", "green"));
          } else {
            dispatch({
              type: UPDATE_USER_PROFILE_SUCCESS,
              payload: res.data,
            });
            dispatch(setAlert("Profile updated successfully", "green"));
          }
        } else {
          dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
          });
          dispatch(setAlert("Failed to update profile", "red"));
        }
      } catch (err) {
        dispatch({
          type: UPDATE_USER_PROFILE_FAIL,
        });
        dispatch(setAlert("Failed to update profile", "red"));
      }
    }
  };
