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
  CREATE_PUBLICATION_SUCCESS,
  CREATE_PUBLICATION_FAIL,
  UPDATE_PUBLICATION_SUCCESS,
  UPDATE_PUBLICATION_FAIL,
  DELETE_PUBLICATION_SUCCESS,
  DELETE_PUBLICATION_FAIL,
} from "../actions/types";

const initialState = {
  publication: null,
  publication_arrival: null,
  publication_sold: null,
  publications: null,
  search_publication: null,
  related_publication: null,
  filtered_publication: null,
};

export default function Publications(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PUBLICATIONS_SUCCESS:
      return {
        ...state,
        publications: payload.publications,
      };
    case GET_PUBLICATIONS_FAIL:
      return {
        ...state,
        publications: null,
      };
    case GET_PUBLICATIONS_BY_ARRIVAL_SUCCESS:
      return {
        ...state,
        publications_arrival: payload.publications,
      };
    case GET_PUBLICATIONS_BY_ARRIVAL_FAIL:
      return {
        ...state,
        publications_arrival: null,
      };
    case GET_PUBLICATIONS_BY_SOLD_SUCCESS:
      return {
        ...state,
        publications_sold: payload.publications_sold,
      };
    case GET_PUBLICATIONS_BY_SOLD_FAIL:
      return {
        ...state,
        publications_sold: null,
      };
    case GET_PUBLICATION_SUCCESS:
      return {
        ...state,
        publication: payload.publication,
      };
    case GET_PUBLICATION_FAIL:
      return {
        ...state,
        publication: null,
      };
    case RELATED_PUBLICATIONS_SUCCESS:
      return {
        ...state,
        related_publications: payload.related_publications,
      };
    case RELATED_PUBLICATIONS_FAIL:
      return {
        ...state,
        related_publications: null,
      };
    case FILTER_PUBLICATIONS_SUCCESS:
      return {
        ...state,
        filtered_publications: payload.filtered_publications,
      };
    case FILTER_PUBLICATIONS_FAIL:
      return {
        ...state,
        filtered_publications: null,
      };
    case SEARCH_PUBLICATIONS_SUCCESS:
      return {
        ...state,
        search_publications: payload,
      };
    case SEARCH_PUBLICATIONS_FAIL:
      return {
        ...state,
        search_publications: null,
      };

    case CREATE_PUBLICATION_SUCCESS:
      return {
        ...state,
      };

    case CREATE_PUBLICATION_FAIL:
      return {
        ...state,
      };

    case DELETE_PUBLICATION_SUCCESS:
      return {
        ...state,
      };

    case DELETE_PUBLICATION_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
