import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap'
import { createorupdatepoints } from '../actions/pointsActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_POINTS_RESET } from '../constants/pointsContants'
import {Helmet} from "react-helmet";

const CreatePoints = ({history}) => {
    const [studentEmail, setStudentEmail] = useState('')
    const [studentID, setStudentId] = useState('')
    const [points, setPoints] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const createPoints = useSelector(state => state.createPoints)
    const { loading, error, success } = createPoints

    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        }else if(userInfo && userInfo.role !==2){
            history.push(`/dashboard/${userInfo._id}`)
        }else{
            dispatch({type: CREATE_POINTS_RESET})
        }
        if(success){
            toast.success('Successfully added points')
            history.push('/admin/rewards')
        }
        if(error){
            toast.error(error)
        }
    }, [userInfo, history, success,error, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!studentID){
            toast.error('Please enter student id')
        }else if(!points){
            toast.error('Please enter a student points')
        }else if(!message){
            toast.error('Please enter message to the student')
        }else if(!studentEmail){
            toast.error('Please enter a student email')
        }else if(!subject){
            toast.error('Please enter a email subject')
        }else{
            dispatch(createorupdatepoints(studentID, points, message, studentEmail, subject))
        }
    }

   

    return (
        <div style={{marginTop:'75px'}}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Create or Update points | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                        <h1 className="mt-5">Create or Update points</h1>
                        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                        <Form onSubmit={handleSubmit} className="mt-3 mb-3">
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="points">
                                        <Form.Label>Student ID</Form.Label>
                                        <FormControl value={studentID}
                                        onChange={(e)=>setStudentId(e.target.value)}
                                        placeholder="Enter student ID"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="points">
                                        <Form.Label>Student Email</Form.Label>
                                        <FormControl value={studentEmail}
                                        onChange={(e)=>setStudentEmail(e.target.value)}
                                        placeholder="Enter student email"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="points">
                                    <Form.Label>Points</Form.Label>
                                        <FormControl value={points}
                                        onChange={(e)=>setPoints(e.target.value)}
                                        placeholder="Enter points"
                                        autoFocus
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="points">
                                    <Form.Label>Subject</Form.Label>
                                        <FormControl value={subject}
                                        onChange={(e)=>setSubject(e.target.value)}
                                        placeholder="Enter email subject"
                                        autoFocus
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3" controlId="message">
                                        <Form.Label>Message to the student</Form.Label>
                                        <FormControl 
                                        as="textarea" 
                                        rows={3}
                                        value={message}
                                        onChange={(e)=>setMessage(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button type="submit" className="btn btn warning mt-3 mb-3">Create</Button>
                        </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreatePoints
