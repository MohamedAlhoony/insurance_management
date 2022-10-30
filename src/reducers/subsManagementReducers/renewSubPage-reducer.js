let defaultState = {
  isLoading: false,
  plans: [],
  store: null,
  formData: {
    plan: {
      element: "input",
      value: "",
      label: true,
      labelText: "الباقة",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        dir: "ltr",
        // maxLength: 12,
        // placeholder: 'الاسم',
      },
    },
    voucherCode: {
      element: "input",
      value: "",
      label: true,
      labelText: "الكود",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        maxLength: 49,
        // placeholder: 'الاسم',
      },
    },
    // username: {
    //   element: "input",
    //   value: "",
    //   label: true,
    //   labelText: "اسم المستخدم",
    //   errorMsg: "",
    //   config: {
    //     autoComplete: "off",
    //     type: "text",
    //     required: true,
    //     dir: "ltr",
    //     maxLength: 49,
    //     // placeholder: 'الاسم',
    //   },
    // },
    // password: {
    //   element: "input",
    //   value: "",
    //   label: true,
    //   labelText: "كلمة السر",
    //   errorMsg: "",
    //   config: {
    //     autoComplete: "off",
    //     required: true,
    //     // type: 'password',
    //     // readOnly: true,
    //     dir: "ltr",
    //     name: "password",
    //     // maxLength: 12,
    //     // placeholder: 'الاسم',
    //   },
    // },

    // phoneNumber: {
    //   element: "input",
    //   value: "",
    //   label: true,
    //   labelText: "رقم الهاتف",
    //   errorMsg: "",
    //   config: {
    //     autoComplete: "off",
    //     type: "text",
    //     required: true,
    //     dir: "ltr",
    //     // maxLength: 12,
    //     // placeholder: 'الاسم',
    //   },
    // },
    // email: {
    //   element: "input",
    //   value: "",
    //   label: true,
    //   labelText: "البريد الإلكتروني",
    //   errorMsg: "",
    //   config: {
    //     autoComplete: "off",
    //     type: "text",
    //     required: true,
    //     dir: "ltr",
    //     // maxLength: 12,
    //     // placeholder: 'الاسم',
    //   },
    // },
  },
};

const renewSubPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "renewSubPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "renewSubPage-store":
      return {
        ...state,
        store: action.data,
      };
    case "renewSubPage-plans":
      return {
        ...state,
        plans: action.data,
      };
    // case "renewSubPage-name-value":
    // case "renewSubPage-username-value":
    // case "renewSubPage-password-value":
    // case "renewSubPage-phoneNumber-value":
    case "renewSubPage-voucherCode-value":
    case "renewSubPage-plan-value":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.data.id]: {
            ...state.formData[action.data.id],
            value: action.data.value,
          },
        },
      };
    // case "renewSubPage-name-errorMsg":
    // case "renewSubPage-username-errorMsg":
    // case "renewSubPage-password-errorMsg":
    // case "renewSubPage-phoneNumber-errorMsg":
    case "renewSubPage-voucherCode-errorMsg":
    case "renewSubPage-plan-errorMsg":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.data.id]: {
            ...state.formData[action.data.id],
            errorMsg: action.data.value,
          },
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default renewSubPage_reducer;
