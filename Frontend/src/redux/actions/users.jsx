import axios from "axios";
import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "./types";
const backend_url = 'http://trendyswap.es:8000';;

export const get_users = (search) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ search });

    try {
      const res = await axios.post(
        `${backend_url}/api/users/search/`,
        body,
        config
      );
      if (res.status === 200) {
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_USERS_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: GET_USERS_FAIL,
      });
    }
  } else {
    dispatch({
      type: GET_USERS_FAIL,
    });
  }
};

export const delete_user = (id) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.delete(
        `${backend_url}/api/users/delete/${id}/`,
        config
      );
      if (res.status === 204) {
        dispatch({
          type: DELETE_USER_SUCCESS,
        });
      } else {
        dispatch({
          type: DELETE_USER_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: DELETE_USER_FAIL,
      });
    }
  } else {
    dispatch({
      type: DELETE_USER_FAIL,
    });
  }
};
