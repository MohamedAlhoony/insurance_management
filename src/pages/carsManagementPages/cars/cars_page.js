import React, { useEffect } from "react";
import * as actions from "../../../actions/carsManagementActions/carsPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import CarsTableItems from "./carsTableItems/carsTableItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import debounce from "lodash.debounce";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../actions/layout-actions";

let updateFilteredResult;
const _updateFilteredResult = debounce((value) => {
  updateFilteredResult(value);
}, 700);
const Cars_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData({ entityId: props.entityId }));
    return () => {
      props.dispatch({ type: "reset-carsPage_reducer" });
    };
  }, []);
  updateFilteredResult = (value) => {
    props.dispatch(actions.updateFilteredResult());
  };
  const carsSortBy = (column) => {
    props.dispatch(actions.carsSortBy(column));
  };
  let confirmedFunction;
  const confirmedHandleDeleteCustomer = (customer) => {
    props.dispatch(actions.removeCustomer(customer.id));
  };
  const handleDeleteCustomer = (customer) => {
    confirmedFunction = () => {
      confirmedHandleDeleteCustomer(customer);
    };
    props.dispatch(confirmDialog({ show: true }));
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />
      <TopMenu
        isDarkMode={props.isDarkMode}
        handleSearchChange={(value) => {
          props.dispatch({ type: "carsPage-search", data: value });
          _updateFilteredResult(value);
        }}
        search={props.search}
      />
      <Table inverted={props.isDarkMode} stackable striped celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "VehiclelID"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                carsSortBy("VehiclelID");
              }}
            >
              معرف السيارة
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "Color"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                carsSortBy("Color");
              }}
            >
              اللون
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "PlateNumber"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                carsSortBy("PlateNumber");
              }}
            >
              رقم اللوحة
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "ModelYear"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                carsSortBy("ModelYear");
              }}
            >
              سنة الموديل
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "PowerOfEngine"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                carsSortBy("PowerOfEngine");
              }}
            >
              قوة الحصان
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "LicenceType"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                carsSortBy("LicenceType");
              }}
            >
              نوع اللوحة
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "RigistrationOffice"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                carsSortBy("RigistrationOffice");
              }}
            >
              مكتب الاصدار
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "CreateDate"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                carsSortBy("CreateDate");
              }}
            >
              تاريخ الانشاء
            </Table.HeaderCell>

            {/* <Table.HeaderCell></Table.HeaderCell> */}
            {/* <Table.HeaderCell></Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <CarsTableItems
            handleDeleteCustomer={handleDeleteCustomer}
            cars={props.filteredCars}
            storeId={props.storeId}
          />
        </Table.Body>
      </Table>
    </PageContainer>
  );
};

export default connect(({ carsPage_reducer, layout_reducer }, props) => {
  return {
    isLoading: carsPage_reducer.isLoading,
    filteredCars: carsPage_reducer.filteredCars,
    tableSorting: carsPage_reducer.tableSorting,
    search: carsPage_reducer.search,
    entityId: props.match.params.entityId,
  };
})(Cars_Page);
