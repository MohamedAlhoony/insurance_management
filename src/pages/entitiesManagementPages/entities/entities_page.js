import React, { useEffect } from "react";
import * as actions from "../../../actions/entitiesManagementActions/entitiesPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import EntitiesTableItems from "./entitiesTableItems/entitiesTableItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import debounce from "lodash.debounce";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../actions/layout-actions";

let updateFilteredResult;
const _updateFilteredResult = debounce((value) => {
  updateFilteredResult(value);
}, 700);
const Entities_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData({ storeId: props.storeId }));
    return () => {
      props.dispatch({ type: "reset-entitiesPage_reducer" });
    };
  }, []);
  updateFilteredResult = (value) => {
    props.dispatch(actions.updateFilteredResult());
  };
  const entitiesSortBy = (column) => {
    props.dispatch(actions.entitiesSortBy(column));
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
          props.dispatch({ type: "entitiesPage-search", data: value });
          _updateFilteredResult(value);
        }}
        search={props.search}
      />
      <Table inverted={props.isDarkMode} stackable striped celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "EntityID"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                entitiesSortBy("EntityID");
              }}
            >
              المعرف
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "Name"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                entitiesSortBy("Name");
              }}
            >
              اسم الكيان
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "Address"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                entitiesSortBy("Address");
              }}
            >
              العنوان
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "EntityType"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                entitiesSortBy("EntityType");
              }}
            >
              النوع
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "TelNo"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                entitiesSortBy("TelNo");
              }}
            >
              رقم الهاتف
            </Table.HeaderCell>

            <Table.HeaderCell></Table.HeaderCell>
            {/* <Table.HeaderCell></Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <EntitiesTableItems
            handleDeleteCustomer={handleDeleteCustomer}
            entities={props.filteredEntities}
            storeId={props.storeId}
          />
        </Table.Body>
      </Table>
    </PageContainer>
  );
};

export default connect(({ entitiesPage_reducer, layout_reducer }, props) => {
  return {
    isLoading: entitiesPage_reducer.isLoading,
    filteredEntities: entitiesPage_reducer.filteredEntities,
    tableSorting: entitiesPage_reducer.tableSorting,
    search: entitiesPage_reducer.search,
    storeId: props.match.params.storeId,
  };
})(Entities_Page);
