import axios from "axios";
import {
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAIL,
  GET_SERVICES_BY_ARRIVAL_SUCCESS,
  GET_SERVICES_BY_ARRIVAL_FAIL,
  GET_SERVICES_BY_SOLD_SUCCESS,
  GET_SERVICES_BY_SOLD_FAIL,
  GET_SERVICE_SUCCESS,
  GET_SERVICE_FAIL,
  SEARCH_SERVICES_SUCCESS,
  SEARCH_SERVICES_FAIL,
  RELATED_SERVICES_SUCCESS,
  RELATED_SERVICES_FAIL,
  FILTER_SERVICES_SUCCESS,
  FILTER_SERVICES_FAIL,
  CREATE_SERVICE_FAIL,
  CREATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
} from "./types";

const backend_url = import.meta.env.VITE_API_URL;

export const get_services = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${backend_url}/api/service/get-services`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_SERVICES_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_SERVICES_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_SERVICES_FAIL,
    });
  }
};

export const get_services_by_arrival = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${backend_url}/api/service/get-services?sortBy=date_created&order=desc&limit=3`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_SERVICES_BY_ARRIVAL_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_SERVICES_BY_ARRIVAL_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_SERVICES_BY_ARRIVAL_FAIL,
    });
  }
};

export const get_services_by_sold = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${backend_url}/api/service/get-services?sortBy=sold&order=desc&limit=3`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_SERVICES_BY_SOLD_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_SERVICES_BY_SOLD_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_SERVICES_BY_SOLD_FAIL,
    });
  }
};

export const get_service = (serviceId) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${backend_url}/api/service/get-service/${serviceId}`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_SERVICE_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_SERVICE_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_SERVICES_FAIL,
    });
  }
};

export const get_related_services = (serviceId) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${backend_url}/api/service/related/${serviceId}`,
      config
    );

    if (res.status === 200 && !res.data.error) {
      dispatch({
        type: RELATED_SERVICES_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: RELATED_SERVICES_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: RELATED_SERVICES_FAIL,
    });
  }
};

export const get_filtered_services =
  (category_id, sort_by, order) => async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      category_id,

      sort_by,
      order,
    });

    try {
      const res = await axios.post(
        `${backend_url}/api/service/by/search/`,
        body,
        config
      );

      if (res.status === 200 && !res.data.error) {
        dispatch({
          type: FILTER_SERVICES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: FILTER_SERVICES_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: FILTER_SERVICES_FAIL,
      });
    }
  };

export const get_search_services =
  (search, category_id) => async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      search,
      category_id,
    });

    try {
      const res = await axios.post(
        `${backend_url}/api/service/search/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: SEARCH_SERVICES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: SEARCH_SERVICES_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: SEARCH_SERVICES_FAIL,
      });
    }
  };

export const create_service =
  (name, description, category_id, photo) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      const body = new FormData();
      body.append("name", name);
      body.append("description", description);
      body.append("category", category_id);
      body.append("photo", photo);

      try {
        const res = await axios.post(
          `${backend_url}/api/service/create/`,
          body,
          config
        );

        if (res.status === 201) {
          dispatch({
            type: CREATE_SERVICE_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: CREATE_SERVICE_FAIL,
          });
        }
      } catch (err) {
        dispatch({
          type: CREATE_SERVICE_FAIL,
        });
      }
    }
  };
