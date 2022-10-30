import React from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import moment from "moment";
import { dateFormat } from "../../../../config";
import { Link } from "react-router-dom";
const CustomersTable = (props) => {
  const getTableItems = (props) => {
    if (!props.entities.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan={6}>لا يوجد نتائج</Table.Cell>
        </Table.Row>
      );
    }
    return props.entities.map((entity, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{entity.EntityID}</Table.Cell>
          <Table.Cell>{entity.Name}</Table.Cell>
          <Table.Cell>{entity.Address}</Table.Cell>
          <Table.Cell>{entity.EntityType === 1 ? "أفراد" : "شركات"}</Table.Cell>
          <Table.Cell>{entity.TelNo}</Table.Cell>
          <Table.Cell>
            <Link to={`/entities/${entity.EntityID}/vehicals`}>
              عرض المركبات ({entity?.entityVehicals.length})
            </Link>
          </Table.Cell>
          {/* <Table.Cell width={"1"}>
            <Dropdown icon={<Icon name={"ellipsis horizontal"} fitted />}>
              <Dropdown.Menu direction={"left"}>
                <Dropdown.Item
                  text={"تعديل"}
                  icon={"edit"}
                  as={Link}
                  to={`/categorys/${category.id}/update`}
                />
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => props.handleDeleteCustomer(category)}
                  text={"حذف"}
                  icon={"trash"}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell> */}
        </Table.Row>
      );
    });
  };
  return <>{getTableItems(props)}</>;
};

export default CustomersTable;
