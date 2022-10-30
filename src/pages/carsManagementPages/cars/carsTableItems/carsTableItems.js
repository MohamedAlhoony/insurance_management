import React from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import moment from "moment";
import { dateFormat } from "../../../../config";
import { Link } from "react-router-dom";
const CustomersTable = (props) => {
  const getTableItems = (props) => {
    if (!props.cars.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan={8}>لا يوجد نتائج</Table.Cell>
        </Table.Row>
      );
    }
    return props.cars.map((entity, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{entity.VehiclelID}</Table.Cell>
          <Table.Cell>{entity.Color}</Table.Cell>
          <Table.Cell>{entity.PlateNumber}</Table.Cell>
          <Table.Cell>{entity.ModelYear}</Table.Cell>
          <Table.Cell>{entity.PowerOfEngine}</Table.Cell>
          <Table.Cell>{entity.LicenceType}</Table.Cell>
          <Table.Cell>{entity.RigistrationOffice}</Table.Cell>
          <Table.Cell>
            {moment.utc(entity.CreateDate).local().format(dateFormat)}
          </Table.Cell>
          {/* <Table.Cell>
            <Link to={`/cars/${entity.EntityID}/vehicals`}>
              عرض المركبات ({entity?.entityVehicals.length})
            </Link>
          </Table.Cell> */}
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
