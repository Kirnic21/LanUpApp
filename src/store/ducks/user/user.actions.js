import { LOAD_USER } from "../action.types";

const setUser = user => ({
  type: LOAD_USER,
  user
})

export {
  setUser
}