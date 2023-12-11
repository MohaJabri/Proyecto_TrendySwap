import axios from "axios";
import {
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_SUCCESS,
  CREATE_NOTIFICATION_FAIL,
  CREATE_NOTIFICATION_SUCCESS,
} from "./types";

const backend_url = import.meta.env.VITE_API_URL;

export const get_notifications = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    const res = await axios.get(
      `${backend_url}/api/notification/get-notifications`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_NOTIFICATIONS_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_NOTIFICATIONS_FAIL,
    });
  }
};

export const create_notification = (publication_id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  const body = JSON.stringify({
    publication_id,
  });

  try {
    const res = await axios.post(
      `${backend_url}/api/notification/create/`,
      body,
      config
    );

    if (res.status === 201) {
      dispatch({
        type: CREATE_NOTIFICATION_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: CREATE_NOTIFICATION_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: CREATE_NOTIFICATION_FAIL,
    });
  }
};
