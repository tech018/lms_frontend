import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { createLesson } from '../actions/lessonsActions'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { LESSONS_CREATE_RESET } from '../constants/lessonsConstants'
import TextField from '@material-ui/core/TextField';
import moment from 'moment'
import {Helmet} from "react-helmet";

const CreateLesson = ({history, match}) => {
    const classId = match.params.id
    const [timeIn, setTimeIn] = useState(new Date(''))
    const [timeOut, setTimeOut] = useState(new Date(''))


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const createNewLesson = useSelector(state => state.createNewLesson)
    const { loading, error, success } = createNewLesson

    const dispatch = useDispatch()

    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        }
        if(userInfo && userInfo.role === 0){
            history.push(`/lessons/${classId}`)
        }
        if(success){
            toast.success('Successfully created')
            dispatch({type: LESSONS_CREATE_RESET})
            history.push(`/lessons/${classId}`)
        }
        if(error){
            toast.error(error)
            history.push(`/lessons/${classId}`)
        }
    }, [userInfo, history, success, error, classId, dispatch])

   

    const handleSubmit = (e) => {
        e.preventDefault()
         if(!timeIn){
        toast.error('Please select a time start')
        }else if(!timeOut){
            toast.error('Please select a time end')
        }else{
            console.log(timeIn , timeOut)
            dispatch(createLesson({
                Id: classId,
                time_in: new Date(timeIn),
                time_out: new Date(timeOut),
            }))
            console.log(moment(timeIn).format('lll'))
            console.log(moment(timeOut).format('lll'))
        }
    }

    return (
        <div style={{marginTop:'75px'}}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Create new schedule | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                        {loading && <Loader />}
                        <Form className="mt-3 mb-4" onSubmit={handleSubmit}>
                            <Row>
                                <Col className="mt-4" md={4}>
                                    <Form.Label>Date and Time Start</Form.Label>
                                    <TextField
                                        type="datetime-local"
                                        className="textField"
                                        value={timeIn}
                                        onChange={(e)=>setTimeIn(e.target.value)}
                                        />
                                    </Col>
                                <Col md={4} className="mt-4"> 
                                <Form.Label>Date and Time End</Form.Label> 
                                    <TextField
                                    type="datetime-local"
                                    className="textField"
                                    value={timeOut}
                                    onChange={(e)=>setTimeOut(e.target.value)}
                                    />
                                </Col>
                            </Row>
                        <Button className="mt-3" type="submit" variant="primary">Create</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateLesson
