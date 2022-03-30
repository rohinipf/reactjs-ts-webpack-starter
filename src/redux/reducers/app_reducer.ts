import * as actionTypes from "../actions/action_types"
import produce from "immer"

const INITIAL_STATE = {
  loader: false,
}

export default function appReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case actionTypes.LOADER:
      return produce(state, (draft) => {
        draft.loader = action.enable
      })

    default:
      return state
  }
}
