import { UPLOAD_GALLERY, DELETE_GALLERY, UPDATE_GALLERY } from '../action.types'
import initialState from '../initial.state';

export default (state = initialState.gallery, action) => {
  switch (action.type) {
    case UPLOAD_GALLERY:
      return [...state, action.data]
    case DELETE_GALLERY:
      return [...state.filter(c => !action.data.includes(c.id))]
    case UPDATE_GALLERY:
      return [...action.data]
    default:
      return state;
  }
}