import _ from "lodash"

export const _checkFormValidation = (
  check: { [x: string]: any },
  formData: { [x: string]: any }
) => {
  return Object.keys(check).reduce((obj: { [x: string]: any }, key: string) => {
    if (
      _.isEmpty(formData[key]) ||
      formData[key] === "" ||
      formData[key].length === 0 ||
      formData[key][0] === ""
    ) {
      obj[key] = check[key]
    }
    return obj
  }, {})
}
