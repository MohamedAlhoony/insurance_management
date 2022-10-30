import { combineReducers } from "redux";
import loginPage_reducer from "./loginPage-reducer";
import layout_reducer from "./layout";
import storesPage_reducer from "./storesManagementReducers/storesPage-reducer";
import categoriesPage_reducer from "./categoriesManagementReducers/categoriesPage-reducer";
import prefsPage_reducer from "./prefsManagementReducers/prefsPage-reducer";
import choicesPage_reducer from "./choicesManagementReducers/choicesPage-reducer";
import productsPage_reducer from "./productsManagementReducers/productsPage-reducer";
import addProductPage_reducer from "./productsManagementReducers/addProductPage-reducer";
import addPrefPage_reducer from "./prefsManagementReducers/addPrefPage-reducer";
import allPage_reducer from "./allManagementReducers/allPage-reducer";
import renewSubPage_reducer from "./subsManagementReducers/renewSubPage-reducer";
import confirmOTPPage_reducer from "./confirmOTPPage-reducer";
import entitiesPage_reducer from "./entitiesManagementReducers/entitiesPage-reducer";
import carsPage_reducer from "./carsManagementReducers/carsPage-reducer";
const appReducer = combineReducers({
  layout_reducer,
  loginPage_reducer,
  storesPage_reducer,
  categoriesPage_reducer,
  prefsPage_reducer,
  choicesPage_reducer,
  productsPage_reducer,
  addProductPage_reducer,
  addPrefPage_reducer,
  allPage_reducer,
  renewSubPage_reducer,
  confirmOTPPage_reducer,
  entitiesPage_reducer,
  carsPage_reducer,
});

export default (state, action) => {
  switch (action.type) {
    case "reset-app":
      state = undefined;
      break;
    case "reset-storesPage_reducer":
      state.storesPage_reducer = undefined;
      break;
    case "reset-addProductPage_reducer":
      state.addProductPage_reducer = undefined;
      break;
    case "reset-categoriesPage_reducer":
      state.categoriesPage_reducer = undefined;
      break;
    case "reset-prefsPage_reducer":
      state.prefsPage_reducer = undefined;
      break;
    case "reset-choicesPage_reducer":
      state.choicesPage_reducer = undefined;
      break;
    case "reset-productsPage_reducer":
      state.productsPage_reducer = undefined;
      break;
    case "reset-addPrefPage_reducer":
      state.addPrefPage_reducer = undefined;
      break;
    case "reset-allPage_reducer":
      state.allPage_reducer = undefined;
      break;
    case "reset-renewSubPage_reducer":
      state.renewSubPage_reducer = undefined;
      break;
    case "reset-confirmOTPPage_reducer":
      state.confirmOTPPage_reducer = undefined;
      break;
    case "reset-entitiesPage_reducer":
      state.entitiesPage_reducer = undefined;
      break;
    case "reset-carsPage_reducer":
      state.carsPage_reducer = undefined;
      break;

    default:
  }
  return appReducer(state, action);
};
