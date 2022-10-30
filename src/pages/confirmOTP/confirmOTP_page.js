import React, { useEffect } from "react";
import * as actions from "../../actions/confirmOTPPage-actions";
import auth from "../../auth";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Form,
  Button,
  Icon,
  Header,
  Input,
  Segment,
  Message,
} from "semantic-ui-react";
import styles from "./styles.module.css";
const Login_Page = (props) => {
  useEffect(() => {
    if (auth.clientId === null || auth.tokenId === null) {
      props.history.push("/login");
    }
    return () => {
      props.dispatch({ type: "reset-confirmOTPPage_reducer" });
    };
  }, []);
  // dispatch({type:'',data:""})
  const handleInputChange = (event, meta) => {
    if (props[meta.id].errorMsg !== "") {
      props.dispatch({
        type: `confirmOTPPage-${meta.id}-errorMsg`,
        data: { id: meta.id, value: "" },
      });
    }
    props.dispatch({
      type: `confirmOTPPage-${meta.id}-value`,
      data: { id: meta.id, value: event.target.value },
    });
  };

  const redirect = () => {
    if (auth.isAuthenticated) {
      props.history.push("/");
    }
  };
  const submitForm = (event) => {
    event.preventDefault();
    props
      .dispatch(actions.confirmOTP())
      .then((res) => {
        console.log("yes");
        redirect(res);
      })
      .catch(() => {
        console.log("confirmOTP error");
      });
  };

  return (
    <Container className={styles.container} style={{ height: "100%" }}>
      <Grid style={{ height: "100%" }} verticalAlign={"middle"} centered={true}>
        <Grid.Row style={{ maxWidth: "500px" }}>
          <Grid.Column width={16}>
            <Header as={"h3"} textAlign={"center"}>
              تأكيد رقم الهاتف
            </Header>
            <Message
              info
              content={"تم ارسال رسالة نصية إلى رقم هاتفك تحوي رمز التأكيد."}
            />
            <Form
              loading={props.isLoading}
              onSubmit={submitForm}
              size={"large"}
            >
              <Form.Field
                error={
                  props.code.errorMsg !== ""
                    ? {
                        content: props.code.errorMsg,
                      }
                    : null
                }
                value={props.code.value}
                onChange={(event) =>
                  handleInputChange(event, {
                    id: "code",
                  })
                }
                control={Input}
                // placeholder={"9x-xxx-xx-xx"}
                label={"الكود:"}
                style={{ direction: "ltr" }}
                // action={<Button content={"+218"} />}
                fluid
              />

              {/* <Form.Field error={props.code.errorMsg === "" ? false : true}>
                <label>رقم الهاتف:</label>
                <Input
                  icon={<Icon name={"code"} />}
                  value={props.code.value}
                  onChange={(event) =>
                    handleInputChange(event, {
                      id: "code",
                    })
                  }
                />
              </Form.Field> */}
              {/* <Form.Field error={props.password.errorMsg === "" ? false : true}>
                <label>كلمة السر:</label>
                <Input
                  icon={<Icon name={"lock"} />}
                  type={"password"}
                  value={props.password.value}
                  onChange={(event) =>
                    handleInputChange(event, {
                      id: "password",
                    })
                  }
                />
              </Form.Field> */}
              <Button fluid className={"primary"} size={"large"} type="submit">
                ارسال
              </Button>
            </Form>
            {props.generalErrorMsg !== "" ? (
              <Segment color={"red"} style={{ color: "red" }}>
                <ul>
                  حدث خطأ
                  <li>تأكد من أن الكود صحيح</li>
                  <li>تأكد من اتصالك بالانترنت</li>
                </ul>
              </Segment>
            ) : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default connect(({ confirmOTPPage_reducer }) => {
  return {
    code: confirmOTPPage_reducer.code,
    // password: confirmOTPPage_reducer.password,
    generalErrorMsg: confirmOTPPage_reducer.generalErrorMsg,
    isLoading: confirmOTPPage_reducer.isLoading,
  };
})(Login_Page);
