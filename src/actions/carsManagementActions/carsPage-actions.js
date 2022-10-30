import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { normalizeFetchedData } from "../../helperFunctions";
import { fetchEntities } from "../entitiesManagementActions/entitiesPage-actions";
export const fetchInitialData = ({ entityId }) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const data = await fetchEntities();
      const cars = data?.entities.find((entity) => {
        return entity.EntityID === Number.parseInt(entityId);
      });
      if (data?.entities.length) {
        dispatch({
          type: "carsPage-cars",
          data: cars.entityVehicals,
        });
        dispatch({
          type: "carsPage-filteredCars",
          data: cars.entityVehicals,
        });
      }
      if (data) {
        dispatch({
          type: "carsPage-data",
          data: cars,
        });
      }
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
export const fetchCars = () => {
  return new Promise(async (resolve, reject) => {
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("AccessToken", `${auth.userData.access_token}`);
    // myHeaders.append("TokenID", `${auth.userData.TokenID}`);
    var requestOptions = {
      method: "GET",
      headers: {
        AccessToken: auth.userData.access_token,
        TokenID: auth.userData.TokenID,
      },
      redirect: "follow",
    };
    try {
      var response = await fetch(`${baseURI}/data`, requestOptions);
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

export const fetchAllCars = ({ storeId }) => {
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
        `${baseURI}/store/Cars?StoreID=${storeId}`,
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

export const updateFilteredResult = () => {
  return (dispatch, getState) => {
    const cars = getState().carsPage_reducer.cars;
    const search = getState().carsPage_reducer.search.toLowerCase().trim();
    const filteredCars = cars.filter(
      (car) => {
        return (
          car?.Color?.toLowerCase()?.indexOf(search) !== -1 ||
          car?.VehiclelID?.toString()?.indexOf(search) !== -1 ||
          car?.PlateNumber?.toString()?.indexOf(search) !== -1 ||
          car?.ModelYear?.toString()?.indexOf(search) !== -1
          // car.PowerOfEngine.indexOf(search) !== -1 ||
          // car.LicenceType.indexOf(search) !== -1 ||
          // car.RigistrationOffice.toLowerCase().indexOf(search) !== -1
        );
      }
      // car.Address?.toLowerCase().indexOf(search) !== -1 ||
      // car.TelNo?.indexOf(search) !== -1 ||
    );

    dispatch({
      type: "carsPage-filteredCars",
      data: filteredCars,
    });
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "carsPage-isLoading", data: isLoading });
  };
};

const sendRemoveCustomer = (customerID) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `${baseURI}/dashboard/users/${customerID}`,
        requestOptions
      );
      const responseText = await response.text();
      const body = responseText ? JSON.parse(responseText) : "";
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

export const removeCustomer = (customerID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      await sendRemoveCustomer(customerID);
      dispatch(
        layoutActions.alertModal({
          show: true,
        })
      );
      const cars = await fetchCars();
      dispatch({
        type: "carsPage-cars",
        data: cars,
      });
      dispatch({
        type: "carsPage-filteredCars",
        data: cars,
      });

      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};
export const carsSortBy = (column) => {
  return (dispatch, getState) => {
    let cars = getState().carsPage_reducer.filteredCars.slice();
    if (column === getState().carsPage_reducer.tableSorting.column) {
      dispatch({
        type: "carsPage-tableSorting",
        data: {
          column,
          direction:
            getState().carsPage_reducer.tableSorting.direction === "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "carsPage-filteredCars",
        data: cars.reverse(),
      });
      return;
    }
    switch (column) {
      case "Color":
        cars = cars.sort((a, b) => {
          a = a.Color;
          b = b.Color;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "PlateNumber":
        cars = cars.sort((a, b) => {
          a = a.PlateNumber;
          b = b.PlateNumber;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "ModelYear":
        cars = cars.sort((a, b) => {
          a = a.ModelYear;
          b = b.ModelYear;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "PowerOfEngine":
        cars = cars.sort((a, b) => {
          a = a.PowerOfEngine;
          b = b.PowerOfEngine;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "LicenceType":
        cars = cars.sort((a, b) => {
          a = a.LicenceType;
          b = b.LicenceType;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "RigistrationOffice":
        cars = cars.sort((a, b) => {
          a = a.RigistrationOffice;
          b = b.RigistrationOffice;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "CreateDate":
        cars = cars.sort((a, b) => {
          a = a.CreateDate;
          b = b.CreateDate;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "VehiclelID":
        cars = cars.sort((a, b) => {
          a = a.VehiclelID;
          b = b.VehiclelID;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "carsPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "carsPage-filteredCars",
      data: cars,
    });
  };
};
