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
} from "../actions/types";

const initialState = {
  services: null,
  services_arrival: null,
  services_sold: null,
  service: null,
  search_services: null,
  related_services: null,
  filtered_services: null,
};

export default function Services(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SERVICES_SUCCESS:
      return {
        ...state,
        services: payload.services,
      };
    case GET_SERVICES_FAIL:
      return {
        ...state,
        services: null,
      };
    case GET_SERVICES_BY_ARRIVAL_SUCCESS:
      return {
        ...state,
        services_arrival: payload.services,
      };
    case GET_SERVICES_BY_ARRIVAL_FAIL:
      return {
        ...state,
        services_arrival: null,
      };
    case GET_SERVICES_BY_SOLD_SUCCESS:
      return {
        ...state,
        services_sold: payload.services_sold,
      };
    case GET_SERVICES_BY_SOLD_FAIL:
      return {
        ...state,
        services_sold: null,
      };
    case GET_SERVICE_SUCCESS:
      return {
        ...state,
        service: payload.service,
      };
    case GET_SERVICE_FAIL:
      return {
        ...state,
        service: null,
      };
    case RELATED_SERVICES_SUCCESS:
      return {
        ...state,
        related_services: payload.related_services,
      };
    case RELATED_SERVICES_FAIL:
      return {
        ...state,
        related_services: null,
      };
    case FILTER_SERVICES_SUCCESS:
      return {
        ...state,
        filtered_services: payload.filtered_services,
      };
    case FILTER_SERVICES_FAIL:
      return {
        ...state,
        filtered_services: null,
      };
    case SEARCH_SERVICES_SUCCESS:
      return {
        ...state,
        search_services: payload.search_services,
      };
    case SEARCH_SERVICES_FAIL:
      return {
        ...state,
        search_services: null,
      };
    default:
      return state;
  }
}
