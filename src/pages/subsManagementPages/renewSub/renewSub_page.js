import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button, Header } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/subManagementActions/renewSubPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
const RenewSub_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.storeId));
    return () => {
      props.dispatch({ type: "reset-renewSubPage_reducer" });
    };
  }, []);

  const handleFormChange = (value, id) => {
    props.dispatch(actions.changeFormFieldValue(value, id));
  };
  const confirmedSubmitForm = () => {
    props.dispatch(actions.submitForm(props.storeId));
  };
  const submitForm = () => {
    props.dispatch(
      actions.preSubmitValidation((isFormValid) => {
        if (isFormValid) {
          props.dispatch(confirmDialog({ show: true }));
        }
      })
    );
  };
  const generatePassword = () => {
    let value = "";
    const smallAlphabets = "abcdefghijklmnopqrstuvwxyz";
    const capitalAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersSet = "0123456789";
    const symbolsSet = "@#$%";
    let charSet;
    for (let i = 0; i < 6; i++) {
      if (i <= 1) {
        charSet = capitalAlphabets;
      } else if (i > 1 && i < 4) {
        charSet = smallAlphabets;
      } else if (i === 5) {
        charSet = numbersSet;
      } else {
        charSet = symbolsSet;
      }
      value += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    props.dispatch(actions.changeFormFieldValue(value, "password"));
  };

  const copyToClipboard = (element) => {
    element.select();
    document.execCommand("copy");
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={confirmedSubmitForm} />
      <Header size={"large"} content={props.store?.StoreName} />
      <Form>
        <Segment>
          <Grid columns={"three"} stackable>
            <Grid.Row>
              <FormData
                copyToClipboard={copyToClipboard}
                generatePassword={generatePassword}
                handleFormChange={handleFormChange}
                formData={props.formData}
                plans={props.plans}
              />
              <Grid.Column width={"sixteen"}>
                <Button
                  onClick={() => {
                    submitForm();
                  }}
                  className={"primary"}
                  content={"تجديد الاشتراك"}
                />
                <Button
                  content={"إغلاق"}
                  onClick={() => props.history.goBack()}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </PageContainer>
  );
};

export default connect(({ renewSubPage_reducer }, props) => {
  return {
    isLoading: renewSubPage_reducer.isLoading,
    formData: renewSubPage_reducer.formData,
    plans: renewSubPage_reducer.plans,
    storeId: props.match.params.storeId,
    store: renewSubPage_reducer.store,
  };
})(RenewSub_Page);
