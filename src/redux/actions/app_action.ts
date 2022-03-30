import * as actionTypes from "./action_types"

export const loading = (enable = true) => {
  return {
    type: actionTypes.LOADER,
    enable,
  }
}
