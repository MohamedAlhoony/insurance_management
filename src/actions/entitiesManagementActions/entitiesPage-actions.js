import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { normalizeFetchedData } from "../../helperFunctions";
export const fetchInitialData = ({ storeId }) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const data = await fetchEntities();

      if (data?.entities.length) {
        dispatch({
          type: "entitiesPage-entities",
          data: data.entities,
        });
        dispatch({
          type: "entitiesPage-filteredEntities",
          data: data.entities,
        });
      }
      if (data) {
        dispatch({
          type: "entitiesPage-data",
          data: data,
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
export const fetchEntities = () => {
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

export const fetchAllEntities = ({ storeId }) => {
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
        `${baseURI}/store/Entities?StoreID=${storeId}`,
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
    const entities = getState().entitiesPage_reducer.entities;
    const search = getState().entitiesPage_reducer.search.toLowerCase().trim();
    const filteredEntities = entities.filter(
      (entity) => {
        return (
          entity?.Address?.toLowerCase().indexOf(search) !== -1 ||
          entity?.TelNo.indexOf(search) !== -1 ||
          entity?.Name.toLowerCase().indexOf(search) !== -1 ||
          entity?.EntityID?.toString().indexOf(search) !== -1
        );
      }
      // entity.Address?.toLowerCase().indexOf(search) !== -1 ||
      // entity.TelNo?.indexOf(search) !== -1 ||
    );

    dispatch({
      type: "entitiesPage-filteredEntities",
      data: filteredEntities,
    });
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "entitiesPage-isLoading", data: isLoading });
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
      const entities = await fetchEntities();
      dispatch({
        type: "entitiesPage-entities",
        data: entities,
      });
      dispatch({
        type: "entitiesPage-filteredEntities",
        data: entities,
      });

      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};
export const entitiesSortBy = (column) => {
  return (dispatch, getState) => {
    let entities = getState().entitiesPage_reducer.filteredEntities.slice();
    if (column === getState().entitiesPage_reducer.tableSorting.column) {
      dispatch({
        type: "entitiesPage-tableSorting",
        data: {
          column,
          direction:
            getState().entitiesPage_reducer.tableSorting.direction ===
            "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "entitiesPage-filteredEntities",
        data: entities.reverse(),
      });
      return;
    }
    switch (column) {
      case "EntityID":
        entities = entities.sort((a, b) => {
          a = a.EntityID;
          b = b.EntityID;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "Name":
        entities = entities.sort((a, b) => {
          a = a.Name;
          b = b.Name;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "Address":
        entities = entities.sort((a, b) => {
          a = a.Address;
          b = b.Address;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "EntityType":
        entities = entities.sort((a, b) => {
          a = a.EntityType;
          b = b.EntityType;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "TelNo":
        entities = entities.sort((a, b) => {
          a = a.TelNo;
          b = b.TelNo;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "entitiesPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "entitiesPage-filteredEntities",
      data: entities,
    });
  };
};
