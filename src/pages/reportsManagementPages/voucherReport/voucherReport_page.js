import React, { useEffect } from "react";
import * as actions from "../../../actions/reportsManagementActions/voucherReportPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import VoucherReportTableItems from "./voucherReportItems/voucherReportItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import moment from "moment";
const VoucherReport_Page = (props) => {
  useEffect(() => {
    return () => {
      props.dispatch({ type: "reset-voucherReportPage_reducer" });
    };
  }, []);
  const sortTable = (column) => {
    props.dispatch(actions.voucherSortBy(column));
  };
  const handleVoucherChange = (value) => {
    props.dispatch(actions.changeVoucher(value));
  };
  const handleDatePickerChange = (value, meta) => {
    if (
      meta.id === "from" &&
      props.dateFilter.to !== "" &&
      moment(value).isAfter(moment(props.dateFilter.to))
    ) {
      props.dispatch(actions.dateFilter({ to: "" }));
    }
    props.dispatch(actions.dateFilter({ [meta.id]: value }));
  };
  const updateVoucherReport = () => {
    props.dispatch(actions.updateVoucherReport());
  };
  const exportVoucherReport = (type) => {
    props.dispatch(actions.exportVoucherReport(type));
  };
  return (
    <PageContainer loading={props.isLoading}>
      <TopMenu
        voucher={props.voucher}
        isExportBtnLoading={props.isExportBtnLoading}
        exportVoucherReport={exportVoucherReport}
        updateVoucherReport={updateVoucherReport}
        handleDatePickerChange={handleDatePickerChange}
        handleVoucherChange={handleVoucherChange}
        // dateFilter={props.dateFilter}
      />
      <Table sortable stackable striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "InvoiceId"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("InvoiceId");
              }}
            >
              ???????? ????????????????
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "Batch"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("Batch");
              }}
            >
              ???????? ????????????
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "BuyerName"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("BuyerName");
              }}
            >
              ?????? ????????????
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "BrandName"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("BrandName");
              }}
            >
              ?????????????? ????????????????
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "DenominationName"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("DenominationName");
              }}
            >
              ??????????
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "ProviderName"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("ProviderName");
              }}
            >
              ????????????
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "SerialNumber"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("SerialNumber");
              }}
            >
              ?????????? ????????????????
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "SecretNumber"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("SecretNumber");
              }}
            >
              ?????????? ??????????
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "SellingPrice"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("SellingPrice");
              }}
            >
              ?????? ??????????
            </Table.HeaderCell>
            {/* <Table.HeaderCell
              sorted={
                props.tableSorting.column === "SellCurrency"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("SellCurrency");
              }}
            >
              ???????? ??????????
            </Table.HeaderCell> */}

            {/* <Table.HeaderCell
              sorted={
                props.tableSorting.column === "BuyerId"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("BuyerId");
              }}
            >
              ???????? ????????????
            </Table.HeaderCell> */}
            {/* <Table.HeaderCell
              sorted={
                props.tableSorting.column === "MetaData"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("MetaData");
              }}
            >
              ???????????? ???????? ??????????????
            </Table.HeaderCell> */}
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "CreatedDate"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("CreatedDate");
              }}
            >
              ?????????? ??????????????
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "ExpirationDate"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("ExpirationDate");
              }}
            >
              ?????????? ???????????? ????????????????
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <VoucherReportTableItems voucherData={props.voucherData} />
        </Table.Body>
        {!props.voucherData.length && (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={14}>???? ???????? ??????????</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </PageContainer>
  );
};

export default connect(({ voucherReportPage_reducer }, props) => {
  return {
    isLoading: voucherReportPage_reducer.isLoading,
    isExportBtnLoading: voucherReportPage_reducer.isExportBtnLoading,
    voucherData: voucherReportPage_reducer.voucherData,
    tableSorting: voucherReportPage_reducer.tableSorting,
    dateFilter: voucherReportPage_reducer.dateFilter,
    voucher: voucherReportPage_reducer.voucher,
  };
})(VoucherReport_Page);
