import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { updateStudApp, getApplicationDetails } from '../actions/enrollActions'
import { getAllTeachers } from '../actions/userActions'
import { APPLICATION_UPDATE_RESET,APPLICATION_DETAILS_RESET } from '../constants/enrollConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { toast } from 'react-toastify'

const UpdateStudApp = ({match, history}) => {
    const [iteacher, setIteacher] = useState('')
    const dispatch = useDispatch()
    const applicationId = match.params.id
    const [isApproved, setIsApproved] = useState(false)
    const [isPaid, setIsPaid] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const studentApplicationUpdate = useSelector(state => state.studentApplicationUpdate)
    const { loading, error, success:successUpdateStud } = studentApplicationUpdate

    const applicationDetails = useSelector(state => state.applicationDetails)
    const { loading:loadingDetails, error:errorDetails, application } = applicationDetails

    const teacherList = useSelector(state => state.teacherList)
    const { teacher } = teacherList

    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        }
        if(successUpdateStud){
            dispatch({type: APPLICATION_UPDATE_RESET})
            dispatch({type: APPLICATION_DETAILS_RESET})
            history.push('/studentapplication')
            toast.success('Successfull updated')
        }
     
        dispatch(getApplicationDetails(applicationId))
        dispatch(getAllTeachers())
        setIsPaid(application.isPaid)
        setIsApproved(application.isApproved)
    }, [history, userInfo, dispatch, successUpdateStud, applicationId, application.isPaid, application.isApproved])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateStudApp({
            _id:applicationId, isPaid, isApproved, teacherId: iteacher
        }))
      
    }

    return (
        <div style={{marginTop:'75px'}}>
            <Container>
                <Row>
                    <Col md={12}>
                        {loadingDetails && <Loader />}
                        {errorDetails && <Message>{errorDetails}</Message>}
                        {loading ? <Loader /> : error ? <Message>{error}</Message> :
                            <Form onSubmit={submitHandler}>
                                <h2 className="mt-3 mt-2">Update Application Status</h2>
                                <Row>
                                    <Col md={2}>
                                        <Form.Group>
                                            <Form.Label>Approve now</Form.Label>
                                                <Form.Check 
                                                type="checkbox"
                                                label="Approved" 
                                                checked={isApproved}
                                                onChange={(e)=>setIsApproved(e.target.checked)}
                                                ></Form.Check>
                                        </Form.Group>
                                    </Col>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label>Already paid?</Form.Label>
                                                <Form.Check 
                                                type="checkbox"
                                                label="Paid"
                                                checked={isPaid}
                                                onChange={(e)=>setIsPaid(e.target.checked)}
                                                ></Form.Check>
                                        </Form.Group>
                                    </Col>
                                    <Col md={5}>
                                    <Form.Control as="select"  onChange={(e)=>setIteacher(e.target.value)} >
                                        {teacher.map(teach=>(
                                            <>
                                                <option key={teach._id} value={teach._id}>{teach.name}</option>
                                            </>
                                        ))}
                                    </Form.Control>
                                    </Col>
                                </Row>
                                <Button type="submit" className="btn btn-primary mb-3 mt-2">Update</Button>
                            </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UpdateStudApp
