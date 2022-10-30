import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { formatPhoneNumber, isValidEmail } from "../../helperFunctions";
import { fetchStores } from "../storesManagementActions/storesPage-actions";
export const changeFormFieldValue = (value, id) => {
  return (dispatch, getState) => {
    if (id === "phoneNumber") {
      value = value.replace(/[^\d|+]/g, "");
    }
    dispatch({
      type: `renewSubPage-${id}-value`,
      data: { value, id },
    });

    if (getState().renewSubPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `renewSubPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};
export const fetchPlans = (storeId) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      var response = await fetch(
        `${baseURI}/store/plans?StoreID=${storeId}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "renewSubPage-isLoading", data: isLoading });
  };
};

export const fetchInitialData = (storeId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const [plans, stores] = await Promise.all([
        fetchPlans(storeId),
        fetchStores(),
      ]);
      const store = stores.find(
        (store) => store.StoreID === Number.parseInt(storeId)
      );
      dispatch({
        type: "renewSubPage-plans",
        data: plans,
      });
      dispatch({
        type: "renewSubPage-store",
        data: store,
      });
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(
        layoutActions.handleHttpError(error, {
          reload: true,
          willGoBack: true,
        })
      );
      dispatch(isLoading(false));
    }
  };
};

const sendFormData = (formData, storeId) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("StoreID", storeId);
    urlencoded.append("PlanID", formData.plan.value);
    urlencoded.append("VoucherCode", formData.voucherCode.value);
    // urlencoded.append("PhoneNumber", formData.phoneNumber.value);
    // urlencoded.append("Email", formData.email.value);
    // urlencoded.append("Plan", formData.plan.value);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      // body: urlencoded,
    };

    try {
      const response = await fetch(
        `${baseURI}/store/Renew?StoreID=${storeId}&PlanID=${formData.plan.value}&VoucherCode=${formData.voucherCode.value}`,
        requestOptions
      );
      let body;
      try {
        body = JSON.parse(await response.text());
      } catch (err) {}
      if (response.status === 200) {
        resolve(body);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const submitForm = (storeId) => {
  return async (dispatch, getState) => {
    try {
      const formData = getState().renewSubPage_reducer.formData;
      dispatch(isLoading(true));
      await sendFormData(formData, storeId);
      dispatch(clearFormFields());
      dispatch(
        layoutActions.alertModal({
          show: true,
        })
      );
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      // dispatch(postSubmitValidation(error ? error : null))
      dispatch(isLoading(false));
    }
  };
};

const clearFormFields = () => {
  return async (dispatch, getState) => {
    const formData = getState().renewSubPage_reducer.formData;
    for (let key in formData) {
      dispatch({
        type: `renewSubPage-${key}-value`,
        data: { value: "", id: key },
      });
    }
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    const formData = getState().renewSubPage_reducer.formData;
    let isFormValid = true;

    // const phoneNumber = formatPhoneNumber(formData.phoneNumber.value);
    // if (formData.phoneNumber.value !== "" && !phoneNumber) {
    //   isFormValid = false;
    //   dispatch({
    //     type: `renewSubPage-phoneNumber-errorMsg`,
    //     data: { value: "رقم الهاتف غير صحيح", id: "phoneNumber" },
    //   });
    // }
    // if (formData.email.value !== "" && !isValidEmail(formData.email.value)) {
    //   isFormValid = false;
    //   dispatch({
    //     type: `renewSubPage-email-errorMsg`,
    //     data: { value: "البريد الإلكتروني غير صحيح", id: "email" },
    //   });
    // }
    // if (formData.name.value !== "" && formData.name.value.length < 2) {
    //   isFormValid = false;
    //   dispatch({
    //     type: `renewSubPage-name-errorMsg`,
    //     data: { value: "طول الإسم لايجب أن يقل عن حرفان", id: "name" },
    //   });
    // }
    // if (formData.username.value !== "" && formData.username.value.length < 3) {
    //   isFormValid = false;
    //   dispatch({
    //     type: `renewSubPage-username-errorMsg`,
    //     data: {
    //       value: "طول اسم المستخدم لايجب أن يقل عن 3 أحرف",
    //       id: "username",
    //     },
    //   });
    // }
    for (let key in formData) {
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `renewSubPage-${key}-errorMsg`,
          data: { value: "يجب تعبئة هذا الحقل", id: key },
        });
      }
    }

    cb(isFormValid);
  };
};

const postSubmitValidation = (error) => {
  return (dispatch, getState) => {
    switch (error.errorCode) {
      case 2:
        dispatch(
          layoutActions.alertModal({
            isSuccess: false,
            show: true,
            body: "اسم المستخدم موجود بالفعل الرجاء تحديد اسم آخر",
          })
        );
        break;
      case 3:
        dispatch(
          layoutActions.alertModal({
            isSuccess: false,
            show: true,
            body: "رقم المحفظة موجود بالفعل الرجاء تحديد رقم محفظة آخر",
          })
        );
        break;
      case 1:
        dispatch(
          layoutActions.alertModal({
            isSuccess: false,
            show: true,
            body: "كلمة السر يجب أن تتكون على أقل من 6 أحرف وتتضمن حرف كبير واحد على الأقل وحرف صغير ورقم ورمز.",
          })
        );
        break;
      default:
        dispatch(
          layoutActions.alertModal({
            isSuccess: false,
            show: true,
            body: error.message,
          })
        );
    }
  };
};
