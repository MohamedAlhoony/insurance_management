import React, { Fragment, useRef } from "react";
import {
  Form,
  Grid,
  Input,
  Select,
  Button,
  Card,
  List,
  Header,
  Icon,
} from "semantic-ui-react";
const FormFields = (props) => {
  const el = useRef(null);
  const renderFields = () => {
    const formArray = [];
    for (let elementName in props.formData) {
      formArray.push({
        id: elementName,
        settings: props.formData[elementName],
      });
    }

    return formArray.map((item, i) => {
      return <Fragment key={i}>{renderTemplates(item)}</Fragment>;
    });
  };

  const handleInputChange = (event, id) => {
    let value;
    if (id === "plan") {
      value = event;
    } else {
      value = event.target.value;
    }
    props.handleFormChange(value, id);
  };

  const renderTemplates = (data) => {
    let formTemplate = "";
    let values = data.settings;
    switch (data.id) {
      // case "name":
      // case "username":
      // case "email":
      case "voucherCode":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              error={
                values.errorMsg !== ""
                  ? {
                      content: values.errorMsg,
                    }
                  : null
              }
              control={Input}
              value={values.value}
              onChange={(event) => handleInputChange(event, data.id)}
              {...values.config}
              label={values.label && values.labelText + ":"}
            />
          </Grid.Column>
        );
        break;
      case "password":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              error={
                values.errorMsg !== ""
                  ? {
                      content: values.errorMsg,
                    }
                  : null
              }
              value={values.value}
              onChange={(event) => handleInputChange(event, data.id)}
              {...values.config}
              control={Input}
              label={values.label && values.labelText + ":"}
              actionPosition={"left"}
              action={
                <Button.Group>
                  <Button
                    icon={"random"}
                    onClick={(e) => {
                      e.preventDefault();
                      props.generatePassword();
                    }}
                  />
                  <Button.Or text={"أو"} />
                  <Button
                    icon={"copy"}
                    onClick={(e) => {
                      e.preventDefault();
                      const input = document.querySelector(
                        'input[name="password"]'
                      );
                      props.copyToClipboard(input);
                    }}
                  />
                </Button.Group>
              }
              fluid
            />
          </Grid.Column>
        );
        break;
      case "plan":
        formTemplate = (
          <Grid.Column width={16} style={{ padding: "14px" }}>
            <Header content={"اختر الباقة"} />
            <Card.Group style={{ marginTop: "2rem" }}>
              {props.plans.map((plan, key) => {
                return (
                  <Card
                    link
                    onClick={() => {
                      handleInputChange(plan.PlanID, data.id);
                    }}
                    // onClick={() => props.history.replace(`/stores/${store.StoreID}`)}
                    style={{ maxWidth: "20rem" }}
                    key={key}
                  >
                    <Card.Content>
                      <Card.Header
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{plan.PlaneTitle}</span>
                        {Number.parseInt(values.value) === plan.PlanID ? (
                          <Icon name={"check"} />
                        ) : null}
                      </Card.Header>
                      {/* <Card.Meta></Card.Meta> */}
                      <Card.Description>
                        <List divided relaxed>
                          <List.Item>
                            <List.Icon size="large" verticalAlign="middle" />
                            <List.Content>
                              <List.Header>السعر</List.Header>
                              <List.Description>
                                {plan.Price} د.ل
                              </List.Description>
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Icon size="large" verticalAlign="middle" />
                            <List.Content>
                              <List.Header>عدد الايام</List.Header>
                              <List.Description>
                                {plan.NumberOfDays}
                              </List.Description>
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Icon size="large" verticalAlign="middle" />
                            <List.Content>
                              <List.Header>عدد الطلبات</List.Header>
                              <List.Description>
                                {plan.NumberOfOrders}
                              </List.Description>
                            </List.Content>
                          </List.Item>
                        </List>
                        {/* <strong>السعر: </strong> {plan.Price} د.ل
                      </Card.Description>
                      <Card.Description>
                        <strong>عدد الأيام: </strong>
                        {plan.NumberOfDays}
                      </Card.Description>
                      <Card.Description>
                        <strong> عدد الطلبات: </strong>
                        {plan.NumberOfOrders} */}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                );
              })}
            </Card.Group>

            {/* <Form.Field
              control={Select}
              {...values.config}
              fluid
              onChange={(_, value) => {
                handleInputChange(value, data.id);
              }}
              label={values.labelText}
              value={values.value}
              error={
                values.errorMsg !== ""
                  ? {
                      content: values.errorMsg,
                    }
                  : null
              }
              options={props.plans.map((item) => {
                return {
                  text: item.PlaneTitle + "  (" + item.Price + "د.ل)",
                  value: item.PlanID,
                  key: item.PlanID,
                };
              })}
            /> */}
          </Grid.Column>
        );
        break;

      default:
        formTemplate = null;
    }
    return formTemplate;
  };
  return <Fragment>{renderFields()}</Fragment>;
};

export default FormFields;
