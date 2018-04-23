import * as RestAPI from '../api/RestAPI'
import * as Types from './Types.js';

export const getCategories = () => {
  return (dispatch) => {
    RestAPI.getCategories().then(res => {
      dispatch({ type: Types.GET_CATEGORY, res })
    })
  }
}
