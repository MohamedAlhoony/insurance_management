import React, { useEffect } from 'react'
import PageContainer from '../../../components/pageContainer/pageContainer'
import { connect } from 'react-redux'
import { Form, Grid, Segment, Button } from 'semantic-ui-react'
import FormData from './formData/formData'
import ConfirmDialog from '../../../components/confirmDialog/confirmDialog'
import * as actions from '../../../actions/subscriptionsManagementActions/addSubscriptionPage-actions'
import { confirmDialog } from '../../../actions/layout-actions'
const AddSubscription_Page = (props) => {
    useEffect(() => {
        props.dispatch(actions.fetchInitialData())
        return () => {
            props.dispatch({ type: 'reset-addSubscriptionPage_reducer' })
        }
    }, [])

    const handleFormChange = (value, id) => {
        props.dispatch(actions.changeFormFieldValue(value, id))
    }
    const confirmedSubmitForm = () => {
        props.dispatch(actions.submitForm())
    }
    const submitForm = () => {
        props.dispatch(
            actions.preSubmitValidation((isFormValid) => {
                if (isFormValid) {
                    props.dispatch(confirmDialog({ show: true }))
                }
            })
        )
    }

    return (
        <PageContainer loading={props.isLoading}>
            <ConfirmDialog onConfirm={confirmedSubmitForm} />
            <Form>
                <Segment>
                    <Grid columns={'three'} stackable>
                        <Grid.Row>
                            <FormData
                                handleFormChange={handleFormChange}
                                formData={props.formData}
                                currencies={props.currencies}
                            />
                            <Grid.Column width={'sixteen'}>
                                <Button
                                    onClick={() => {
                                        submitForm()
                                    }}
                                    className={'primary'}
                                    content={'??????????'}
                                />
                                <Button
                                    content={'??????????'}
                                    onClick={() => props.history.goBack()}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Form>
        </PageContainer>
    )
}

export default connect(({ addSubscriptionPage_reducer }) => {
    return {
        isLoading: addSubscriptionPage_reducer.isLoading,
        formData: addSubscriptionPage_reducer.formData,
        currencies: addSubscriptionPage_reducer.currencies,
    }
})(AddSubscription_Page)
