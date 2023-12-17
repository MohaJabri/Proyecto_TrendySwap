import axios from "axios";
import { GET_USERS_SUCCESS, GET_USERS_FAIL } from "./types";
const backend_url = import.meta.env.VITE_API_URL;

export const get_users = (search) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${backend_url}/api/users/search/`,
        { search: "" },
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
