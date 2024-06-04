import React, {useEffect, useState} from 'react'
import { updateApplicant, detailsById } from '../actions/enrollActions'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Container, Form, FormControl, Row, Col, Button } from 'react-bootstrap'
import { getAllTeachers } from '../actions/userActions'
import { APPLICATION_UPDATE_RESET } from '../constants/enrollConstants'
import {Helmet} from "react-helmet";

const ApplicationUpdate = ({history, match}) => {
    const [isPaid, setIsPaid] = useState(false)
    const [isApproved, setIsApproved] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const [teacherId, setTeacherId] = useState('')

    const courseId = match.params.id

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const applicationById = useSelector(state => state.applicationById)
    const { loading , error, applicant } = applicationById

    const teacherList = useSelector(state => state.teacherList)
    const { teacher } = teacherList

    const updateApp = useSelector(state => state.updateApp)
    const { loading:loadingUpdate, error:errorUpdate, success } = updateApp

    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        }else{
            dispatch(detailsById(courseId))
            dispatch(getAllTeachers(1))
            setIsPaid(applicant.isPaid)
            setIsApproved(applicant.isApproved)
            setIsFinished(applicant.isFinished)
        }
        if(success){
            dispatch(detailsById(courseId))
            dispatch(getAllTeachers(1)) 
            toast.success('successfully updated the application')
            dispatch({type: APPLICATION_UPDATE_RESET})
        }
        if(errorUpdate){
            dispatch(detailsById(courseId))
            dispatch(getAllTeachers(1))
            toast.error(errorUpdate)
        }
        if(userInfo && userInfo.role !== 2 ){
            history.push(`/dashboard/${userInfo._id}`)
            
        }
    }, [userInfo,history, dispatch, courseId, applicant.isPaid, applicant.isApproved,applicant.isFinished, success, errorUpdate])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if(!teacherId){
            toast.error('please select a teacher')
        }else{
            dispatch(updateApplicant(courseId, teacherId, isApproved, isPaid, isFinished))
        }
    }

    return (
        <div style={{marginTop:"75px"}}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Update this Course | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                        {loadingUpdate && <Loader />}
                       {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                        <Form className="mb-4" onSubmit={onSubmitHandler}>
                            <h3 className="mt-3">Update this Course</h3>
                            <Row>
                                <Col md={2}>
                                    <Form.Check label="Approved" inline checked={isApproved} onChange={(e)=>setIsApproved(e.target.checked)} />
                                </Col>
                                <Col md={2}>
                                    <Form.Check label="Paid" inline checked={isPaid} onChange={(e)=>setIsPaid(e.target.checked)} />
                                </Col>
                                <Col md={2}>
                                    <Form.Check label="is Finished" inline checked={isFinished} onChange={(e)=>setIsFinished(e.target.checked)} />
                                </Col>
                                <Col md={5}>
                                <FormControl as="select" value={teacherId} onChange={(e)=>setTeacherId(e.target.value)}>
                                    <option value="0"> Select Teacher</option>
                                    {teacher.map(items=>(
                                        <option value={items._id} key={items._id}>{items.name}</option>
                                    ))}
                                </FormControl>
                                </Col>
                            </Row>
                            <Button type="submit" variant="primary">Update</Button>
                        </Form>
                       }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ApplicationUpdate
