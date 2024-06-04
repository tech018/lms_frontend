import React, {useState, useEffect} from 'react'
import { courseCreate } from '../actions/courseActions'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Form, Button, FormGroup } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { COURSE_CREATE_RESET } from '../constants/courseContants'

const CreateCourse = ({history}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [minutes, setMinutes] = useState('')
    const [cpackage, setCPackage] = useState('')
    const [numofclass, setNumOfClass] = useState('')
    const [details, setDetails] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const createCourse = useSelector(state => state.createCourse)
    const { success: createSuccess, error } = createCourse

    

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else if(userInfo.role === 0){
            history.push('/')
        }
        if(userInfo && userInfo.role === null){
            history.push('/')
        }
        if(userInfo && userInfo.role === 1){
            history.push('/')
        }
        if(createSuccess){
            dispatch({type: COURSE_CREATE_RESET})
            history.push('/coursesoffer')
            toast.success(`Successfully create course ${name}`)
        }
    }, [history, userInfo, createSuccess, dispatch, name])

    const submitHandler = (e) => {
        e.preventDefault()
        if(!name){
            toast.error('Course name is required')
        }else if(!cpackage){
            toast.error('Course package is required')
        }else if(!price){
            toast.error('Course price is required')
        }else if(!numofclass){
            toast.error('Number of class is required')
        }else if(!details){
            toast.error('Class Details is required')
        }else if(!minutes){
            toast.error('Minutes per session is required')
        }else{
            dispatch(courseCreate(
                name, details, minutes, cpackage, numofclass, price
            ))
           
               
            
            if(error){
                toast.error(error)
            }
        }
    }

    return (
        <div style={{paddingTop:'75px',marginBottom:'30px'}}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h1 className="mt-2">Create new course</h1>
                        <Form onSubmit={submitHandler}>
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Form.Label>
                                            Course Name
                                        </Form.Label>
                                        <Form.Control
                                        type="text"
                                        placeholder="Course name" 
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                        autoFocus
                                        />
                                    </FormGroup>
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
                            <Button className="mt-3" type="submit" variant="primary">Create</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateCourse
