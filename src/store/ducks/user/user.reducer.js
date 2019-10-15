import { LOAD_USER } from '../action.types'
import initialState from '../initial.state';

export default (state = initialState.user, action) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...action.user }
    default:
      return state;
  }
}