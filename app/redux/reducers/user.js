import {
  USER_FETCH_DATA,
  USER_FETCH_GROUP_DATA_EVENTS,
  USER_FETCH_GROUP_DATA_USERS,
  USER_FETCH_GROUP_DATA_LISTINGS,
} from "../constants";
const initialState = {
  currentUser: null,
  events: null,
  usersG: null,
  listings: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_FETCH_DATA:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case USER_FETCH_GROUP_DATA_EVENTS:
      return {
        ...state,
        events: action.events,
      };
    case USER_FETCH_GROUP_DATA_USERS:
      return {
        ...state,
        usersG: action.usersG,
      };
    case USER_FETCH_GROUP_DATA_LISTINGS:
      return {
        ...state,
        listings: action.listings,
      };
    default:
      return state;
  }
};
