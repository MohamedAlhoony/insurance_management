import React from "react";
import { Link } from "react-router-dom";
import { Menu, Input, Button, Icon, Form } from "semantic-ui-react";
const TopMenu = (props) => {
  return (
    <Menu stackable pointing>
      <Menu.Menu position={"right"}>
        <Menu.Item>
          <Button
            size={"small"}
            as={Link}
            to={`/stores/${props.storeId}/subscription/renew`}
            content={"تجديد الاشتراك"}
            labelPosition={"right"}
            icon={<Icon name={"linkify"} />}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default TopMenu;
