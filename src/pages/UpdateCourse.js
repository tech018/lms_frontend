import React,{useEffect, useState} from 'react'
import { Container, Row , Col, Button, Form, FormGroup } from 'react-bootstrap'
import { courseDetails, updateCourse } from '../actions/courseActions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { toast } from 'react-toastify'
import { COURSE_UPDATE_RESET } from '../constants/courseContants'


const UpdateCourse = ({match, history}) => {
    const courseId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [minutes, setMinutes] = useState('')
    const [cpackage, setCPackage] = useState('')
    const [numofclass, setNumOfClass] = useState('')
    const [details, setDetails] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const courseUpdate = useSelector(state => state.courseUpdate)
    const {  success: successUpdate, error: errorUpdate  } = courseUpdate

    const courseDetail = useSelector(state => state.courseDetail)
    const { loading:loadingDetails, error:errorDetails, course  } = courseDetail


    const dispatch = useDispatch()

    useEffect(()=> {
        if(userInfo){
            if(successUpdate){
                history.push('/coursesoffer')
                dispatch({type: COURSE_UPDATE_RESET})
                toast.success(`Successfully updated : ${course.name}`)
            }else if(userInfo.role === 0){
                history.push('/')
            }
            if(userInfo.role === null){
                history.push('/')
            }
            if(userInfo.role === 1){
                history.push('/')
            }
            dispatch(courseDetails(courseId))
           
            setName(course.name)
            setCPackage(course.package)
            setMinutes(course.minutes)
            setDetails(course.details)
            setPrice(course.price)
            setNumOfClass(course.numofclass)
        }else{
            history.push('/login')
        }
    }, [
        dispatch, 
        courseId,
        history, 
        successUpdate, 
        userInfo, 
        course.name, 
        course.package,
        course.minutes,
        course.details,
        course.price,
        course.numofclass,
    ])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateCourse({
            _id: courseId,
            name, 
            details, 
            minutes, 
            cpackage, 
            numofclass, 
            price
        }))
        if(errorUpdate){
            toast.error(errorUpdate)
        }
    }

    return (
        <div style={{marginTop:'75px'}}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h2 className="mt-2">Update Product</h2>
                        {loadingDetails && <Loader />}
                        {errorDetails && <Message variant='danger'>{errorDetails}</Message>}
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={4}>
                                    <Form.Label>Course Name</Form.Label>
                                    <Form.Control 
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Form.Label>
                                            Course Package
                                        </Form.Label>
                                        <Form.Control
                                        type="text"
                                        placeholder="Course Package" 
                                        value={cpackage}
                                        onChange={(e)=>setCPackage(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Form.Label>
                                            Course Minutes per sessions
                                        </Form.Label>
                                        <Form.Control
                                        type="text"
                                        placeholder="Minutes per session" 
                                        value={minutes}
                                        onChange={(e)=>setMinutes(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup>
                                        <Form.Label>
                                            Course Details
                                        </Form.Label>
                                        <Form.Control
                                        as="textarea" rows={3}
                                        placeholder="Course Details" 
                                        value={details}
                                        onChange={(e)=>setDetails(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Form.Label>
                                            Course Price
                                        </Form.Label>
                                        <Form.Control
                                        type="String"
                                        placeholder="Course Price" 
                                        value={price}
                                        onChange={(e)=>setPrice(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Form.Label>
                                            Number of classes
                                        </Form.Label>
                                        <Form.Control
                                        type="text"
                                        placeholder="Number of classes" 
                                        value={numofclass}
                                        onChange={(e)=>setNumOfClass(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button className="mt-3 mb-2" type="submit" variant="primary">Update</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UpdateCourse
