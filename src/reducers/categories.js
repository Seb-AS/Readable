import * as Types from "../actions/Types";

function categories(state = [], action) {
  switch (action.type) {
    case Types.GET_CATEGORY:
      return action.res.categories;
    default:
      return state;
  }
}

export default categories;
