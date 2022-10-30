let defaultState = {
  isLoading: false,
  isFormValid: true,
  generalErrorMsg: "",
  code: {
    value: "",
    errorMsg: "",
  },
  // password: {
  //   value: "+7290022*admin@WS.ly",
  //   errorMsg: "",
  // },
};

const confirmOTPPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "confirmOTPPage-isLoading":
      return {
        ...state,
        isLoading: action.value,
      };
    // case "confirmOTPPage-password-errorMsg":
    case "confirmOTPPage-code-errorMsg":
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          errorMsg: action.data.value,
        },
      };
    // case "confirmOTPPage-password-value":
    case "confirmOTPPage-code-value":
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          value: action.data.value,
        },
      };
    case "confirmOTPPage-generalErrorMsg":
      return {
        ...state,
        generalErrorMsg: action.data,
      };

    case "confirmOTPPage-isFormValid":
      return {
        ...state,
        isFormValid: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default confirmOTPPage_reducer;
