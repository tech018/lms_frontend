import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsById } from '../actions/enrollActions'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ApplicationById = ({history, match}) => {
    const applicationId = match.params.id

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const applicationById = useSelector(state => state.applicationById)
    const { loading, error, applicant } = applicationById

    const dispatch = useDispatch()

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            dispatch(detailsById(applicationId))
        }
    }, [userInfo,dispatch,history,applicationId])

    return (
        <div style={{marginTop:"75px"}}>
            <Container>
                <Row>
                    <Col md={8}>
                        <ListGroup className="mt-3 mb-3">
                            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                                <div>
                                <ListGroup.Item className="text-white">
                                      <h4>ORDER NO. {applicant._id}</h4>
                                      COURSE NAME: {applicant.course.name} < br />
                                      PRICE: ${applicant.course.price} <br />
                                      {applicant.isPaid ? <span><span className="badge bg-success">Paid</span> at {applicant.paidAt}</span> : <span>PAYMENT STATUS: <span className="badge bg-danger">Not yet paid</span></span> } < br />
                                      {applicant.isApproved ? <span><span className="badge bg-success">Approved</span> at {applicant.approvedAt}</span> : <span>STATUS: <span className="badge bg-danger">Not yet approved</span></span> } <br />
                                      PAYMENT METHOD : {applicant.paymentMethod}
                                </ListGroup.Item>
                                </div>
                            }    
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ApplicationById
