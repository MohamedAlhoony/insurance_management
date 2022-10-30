import auth from "../auth";
export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    let isFormValid = true;
    if (getState().confirmOTPPage_reducer.code.value === "") {
      dispatch({
        type: "confirmOTPPage-code-errorMsg",
        data: { id: "code", value: "يجب تعبئة هذا الحقل" },
      });
      isFormValid = false;
    }
    // if (getState().confirmOTPPage_reducer.password.value === '') {
    //     dispatch({
    //         type: 'confirmOTPPage-password-errorMsg',
    //         data: { id: 'password', value: 'يجب تعبئة هذا الحقل' },
    //     })
    //     isFormValid = false
    // }

    cb(isFormValid);
  };
};

export const postSubmitValidation = (err) => {
  return (dispatch, getState) => {
    // if (err.status !== 200) {

    dispatch({
      type: "confirmOTPPage-generalErrorMsg",
      data: "error",
    });
    // }
  };
};

export const confirmOTP = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let credentials = {};
      credentials.code = getState().confirmOTPPage_reducer.code.value;
      //   credentials.password = getState().confirmOTPPage_reducer.password.value;
      if (getState().confirmOTPPage_reducer.isFormValid) {
        dispatch(
          preSubmitValidation((isFormValid) => {
            if (isFormValid) {
              if (getState().confirmOTPPage_reducer.generalErrorMsg !== "") {
                dispatch({
                  type: "confirmOTPPage-generalErrorMsg",
                  data: "",
                });
              }
              dispatch(isLoading(true));
              auth
                .confirmOTP(credentials)
                .then((response) => {
                  resolve(response);
                  dispatch(isLoading(false));
                })
                .catch((response) => {
                  reject();
                  dispatch(isLoading(false));
                  dispatch(postSubmitValidation(response));
                });
            }
          })
        );
      }
    });
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "confirmOTPPage-isLoading", value: isLoading });
  };
};
