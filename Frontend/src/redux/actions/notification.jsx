import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_SUCCESS,
  CREATE_NOTIFICATION_FAIL,
  CREATE_NOTIFICATION_SUCCESS,
  SEND_NOTIFICATION_SUCCESS,
  SEND_NOTIFICATION_FAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAIL,
  REJECT_REQUEST_SUCCESS,
  REJECT_REQUEST_FAIL,
  CHECK_NOTIFICATIONS_SENDED_SUCCESS,
  CHECK_NOTIFICATIONS_SENDED_FAIL,
} from "./types";

const backend_url = 'https://api.trendyswap.es:8000';;

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

export const send_notification =
  (owner_publication_id, user_requesting_id) => async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    const body = JSON.stringify({
      owner_publication_id,
      user_requesting_id,
    });

    try {
      const res = await axios.post(
        `${backend_url}/api/notification/sendNotification/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: SEND_NOTIFICATION_SUCCESS,
          payload: res.data,
        });
        dispatch(setAlert("Notificación enviada", "green"));
      } else {
        dispatch({
          type: SEND_NOTIFICATION_FAIL,
        });
        dispatch(setAlert("Error al enviar notificación", "red"));
      }
    } catch (err) {
      dispatch({
        type: SEND_NOTIFICATION_FAIL,
      });
      dispatch(setAlert("Error al enviar notificación", "red"));
    }
  };

export const send_email =
  (user_requesting_email, publication_id, notification_id) =>
  async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    const body = JSON.stringify({
      user_requesting_email,
      publication_id,
      notification_id,
    });

    try {
      const res = await axios.post(
        `${backend_url}/api/notification/send-email/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: SEND_EMAIL_SUCCESS,
          payload: res.data,
        });
        dispatch(setAlert("Email enviado", "green"));
      } else {
        dispatch({
          type: SEND_EMAIL_FAIL,
        });
        dispatch(setAlert("Error al enviar email", "red"));
      }
    } catch (err) {
      dispatch({
        type: SEND_EMAIL_FAIL,
      });
      dispatch(setAlert("Error al enviar email", "red"));
    }
  };

export const setHuboCambio = (huboCambio) => {
  return {
    type: "SET_HUBO_CAMBIO",
    payload: huboCambio,
  };
};

export const reject_request = (notification_id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  const body = JSON.stringify({
    notification_id,
  });

  try {
    const res = await axios.post(
      `${backend_url}/api/notification/reject-request/`,
      body,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: REJECT_REQUEST_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert("Solicitud rechazada", "green"));
    } else {
      dispatch({
        type: REJECT_REQUEST_FAIL,
      });
      dispatch(setAlert("Error al rechazar solicitud", "red"));
    }
  } catch (err) {
    dispatch({
      type: REJECT_REQUEST_FAIL,
    });
    dispatch(setAlert("Error al rechazar solicitud", "red"));
  }
};

export const check_notifications_sended =
  (publication_id) => async (dispatch) => {
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
        `${backend_url}/api/notification/check-sent/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: CHECK_NOTIFICATIONS_SENDED_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: CHECK_NOTIFICATIONS_SENDED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: CHECK_NOTIFICATIONS_SENDED_FAIL,
      });
    }
  };
