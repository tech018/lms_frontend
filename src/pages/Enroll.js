import React,{useEffect, useState} from 'react'
import { Container, Row , Col, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { courseDetails } from '../actions/courseActions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { toast } from 'react-toastify'
import { createApplication } from '../actions/enrollActions'
import { APPLICATION_ORDER_RESET } from '../constants/enrollConstants'
import { COURSE_DETAILS_RESET } from '../constants/courseContants'
import { studentpoints } from '../actions/pointsActions'
import { STUDENT_POINTS_RESET } from '../constants/pointsContants'


const Enroll = ({match, history}) => {
    const courseId = match.params.id

    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('')
  

    const courseDetail = useSelector(state => state.courseDetail)
    const { loading, error, course } = courseDetail

    const applicationCreate = useSelector(state => state.applicationCreate)
    const { loading: loadingCreate, error:errorCreate, success:successApplication } = applicationCreate

    const getStudentPoints = useSelector(state => state.getStudentPoints)
    const { loading:loadingPoints, error:errorPoints, studpoints } = getStudentPoints

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo){
           if(successApplication){
            toast.success('Application has been submitted')
            history.push(`/myapplications/${userInfo._id}`)
           }
           if(errorCreate){
               toast.error(errorCreate)
           }
           dispatch({ type: COURSE_DETAILS_RESET })
           dispatch({ type: APPLICATION_ORDER_RESET })  
           dispatch(courseDetails(courseId))
           dispatch({type: STUDENT_POINTS_RESET })
           dispatch(studentpoints(userInfo._id))
          
        }else{
            history.push('/login')
        }
        
    }, [dispatch, match, history, userInfo, successApplication, errorCreate, courseId])

    const addToCartHandler = (e) => {
        e.preventDefault()
       
        
        if(!paymentMethod){
            toast.error('Select you payment Method')
        }else{
            if(paymentMethod !== "Bank Transfer"){
                if(studpoints.points < 5){
                    toast.error('Your points is not enough')
                }else if(course.details !== "SOLO"){
                    toast.error('Only solo class are allowed to pay by points')
                }else{
                    const payment = studpoints.points - 5
                    dispatch(createApplication(courseId, payment))
                } 
            }else{
                const payment = paymentMethod
                dispatch(createApplication(courseId, payment))
            }
            
        }
       
       
    }

    return (
        <div style={{marginTop:'75px'}}>
            <Container>
                <Row>
                   
                </Row>
                {loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) : (
                <Row>
                   
                    <Col md={12}>
                        <Card className="mt-3 mb-3">
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <ListGroup variant='flush' className="mb-3 mt-2">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col sm={12}>
                                                    <h2 className="text-danger">{course.name}</h2>
                                                    <p className="text-primary">
                                                    Details: {course.details} < br />
                                                    Minutes per session: {course.minutes} < br />
                                                    Number of Class: {course.numofclass} <br />
                                                    Package: {course.package} < br />
                                                    Price: ${course.price}
                                                    </p>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                    <Col md={6}>
                                    {loadingPoints && Loader}
                                    {errorPoints && <Message variant="danger">errorPoints</Message>}
                                    {loadingCreate && <Loader />}
                                    <Form style={{paddingLeft:'30px',marginTop:'30px'}} onSubmit={addToCartHandler}>
                                        <Row>
                                            <Col>
                                            <Form.Label>Select payment method</Form.Label>
                                            <Form.Group>
                                            <Form.Check label="Bank Transfer" inline value="Bank Transfer" onChange={(e)=>setPaymentMethod(e.target.value)} />
                                            <Form.Check label="Points" inline value={studpoints.points} onChange={(e)=>setPaymentMethod(e.target.value)} />
                                            </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button type="submit" className="mb-3 mt-3">SUBMIT APPLICATION</Button>
                                    </Form>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                )}
            </Container>
        </div>
    )
}

export default Enroll
