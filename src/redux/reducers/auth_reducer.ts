import * as actionTypes from "../actions/action_types"
import produce from "immer"

const INITIAL_STATE = {
  access_token: null,
  role: null,
}

export default function appReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case actionTypes.REQUEST_LOGIN:
      return produce(state, (draft) => {
        draft.access_token = action.data.access_token
        draft.role = action.data.role
      })

    case actionTypes.REQUEST_LOGOUT:
      return produce(state, (draft) => {
        draft.access_token = INITIAL_STATE.access_token
        draft.role = INITIAL_STATE.role
      })

    default:
      return state
  }
}
