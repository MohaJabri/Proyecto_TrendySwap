import axios from "axios";
import {
  GET_PUBLICATIONS_SUCCESS,
  GET_PUBLICATIONS_FAIL,
  GET_PUBLICATIONS_BY_ARRIVAL_SUCCESS,
  GET_PUBLICATIONS_BY_ARRIVAL_FAIL,
  GET_PUBLICATIONS_BY_SOLD_SUCCESS,
  GET_PUBLICATIONS_BY_SOLD_FAIL,
  GET_PUBLICATION_SUCCESS,
  GET_PUBLICATION_FAIL,
  SEARCH_PUBLICATIONS_SUCCESS,
  SEARCH_PUBLICATIONS_FAIL,
  RELATED_PUBLICATIONS_SUCCESS,
  RELATED_PUBLICATIONS_FAIL,
  FILTER_PUBLICATIONS_SUCCESS,
  FILTER_PUBLICATIONS_FAIL,
  CREATE_PUBLICATION_FAIL,
  CREATE_PUBLICATION_SUCCESS,
  UPDATE_PUBLICATION_SUCCESS,
  UPDATE_PUBLICATION_FAIL,
  DELETE_PUBLICATION_SUCCESS,
  DELETE_PUBLICATION_FAIL,
} from "./types";
import { setAlert } from "./alert";

const backend_url = import.meta.env.VITE_API_URL;

export const get_publications = (userID, page) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${backend_url}/api/publication/get-publications/?user_id=${userID}&&page=${page}`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_PUBLICATIONS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_PUBLICATIONS_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_PUBLICATIONS_FAIL,
    });
  }
};

export const get_publications_by_arrival = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${backend_url}/api/publication/get-publications?sortBy=date_created&order=desc&limit=4`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_PUBLICATIONS_BY_ARRIVAL_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_PUBLICATIONS_BY_ARRIVAL_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_PUBLICATIONS_BY_ARRIVAL_FAIL,
    });
  }
};

export const get_publications_by_sold = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${backend_url}/api/publication/get-publications?sortBy=sold&order=desc&limit=3`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_PUBLICATIONS_BY_SOLD_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_PUBLICATIONS_BY_SOLD_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_PUBLICATIONS_BY_SOLD_FAIL,
    });
  }
};

export const get_publication = (publicationId) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${backend_url}/api/publication/get-publication/${publicationId}`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_PUBLICATION_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_PUBLICATION_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_PUBLICATION_FAIL,
    });
  }
};

export const get_related_publications = (publicationId) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${backend_url}/api/publication/related/${publicationId}`,
      config
    );

    if (res.status === 200 && !res.data.error) {
      dispatch({
        type: RELATED_PUBLICATIONS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: RELATED_PUBLICATIONS_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: RELATED_PUBLICATIONS_FAIL,
    });
  }
};

export const get_filtered_publications =
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
        `${backend_url}/api/publication/by/search/`,
        body,
        config
      );

      if (res.status === 200 && !res.data.error) {
        dispatch({
          type: FILTER_PUBLICATIONS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: FILTER_PUBLICATIONS_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: FILTER_PUBLICATIONS_FAIL,
      });
    }
  };

export const get_search_publications =
  (search, page, category_id = 0) =>
  async (dispatch) => {
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
        `${backend_url}/api/publication/search/?page=${page}`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: SEARCH_PUBLICATIONS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: SEARCH_PUBLICATIONS_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: SEARCH_PUBLICATIONS_FAIL,
      });
    }
  };

export const create_publication =
  (
    service_requested,
    object_offered,
    location,
    description,
    category_id,
    photo
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
      body.append("service_requested", service_requested);
      body.append("object_offered", object_offered);
      body.append("location", location);
      body.append("description", description);
      body.append("category", category_id);
      body.append("photo", photo);

      try {
        const res = await axios.post(
          `${backend_url}/api/publication/create/`,
          body,
          config
        );

        if (res.status === 201) {
          dispatch({
            type: CREATE_PUBLICATION_SUCCESS,
            payload: res.data,
          });

          dispatch(setAlert("Publicación creada", "green"));
        } else {
          dispatch({
            type: CREATE_PUBLICATION_FAIL,
          });

          dispatch(setAlert("Error al crear la publicación", "red"));
        }
      } catch (err) {
        dispatch({
          type: CREATE_PUBLICATION_FAIL,
        });

        dispatch(setAlert("Error al crear la publicación", "red"));
      }
    }
  };

export const delete_publication = (publicationId) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    try {
      const res = await axios.delete(
        `${backend_url}/api/publication/delete/${publicationId}`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: DELETE_PUBLICATION_SUCCESS,
        });
      } else {
        dispatch({
          type: DELETE_PUBLICATION_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: DELETE_PUBLICATION_FAIL,
      });
    }
  }
};

export const update_publication =
  (
    publicationId,
    service_requested,
    object_offered,
    location,
    description,
    category_id,
    photo
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
      body.append("service_requested", service_requested);
      body.append("object_offered", object_offered);
      body.append("location", location);
      body.append("description", description);
      body.append("category", category_id);
      body.append("photo", photo);

      try {
        const res = await axios.put(
          `${backend_url}/api/publication/update/${publicationId}/`,
          body,
          config
        );

        if (res.status === 201) {
          dispatch({
            type: UPDATE_PUBLICATION_SUCCESS,
            payload: res.data,
          });

          dispatch(setAlert("Publicación actualizada", "green"));
        } else {
          dispatch({
            type: UPDATE_PUBLICATION_FAIL,
          });

          dispatch(setAlert("Error al actualizar la publicación", "red"));
        }
      } catch (err) {
        dispatch({
          type: UPDATE_PUBLICATION_FAIL,
        });

        dispatch(setAlert("Error al actualizar la publicación", "red"));
      }
    }
  };
