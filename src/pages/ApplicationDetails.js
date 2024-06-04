import React, {useEffect} from 'react'
import Loader from '../components/Loader'
import { detailsapplication } from '../actions/enrollActions'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Table } from 'react-bootstrap'
import Message from '../components/Message'
import moment from 'moment'

 
const ApplicationDetails = ({history, match}) => {
    const userId = match.params.id

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const applicationDetails = useSelector(state => state.applicationDetails)
    const { loading, error, applications } = applicationDetails

    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        }else{
            dispatch(detailsapplication(userId))
        }
    }, [userInfo,history ,userId,dispatch])

    return (
        <div style={{marginTop: '75px'}}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h1 className="mt-5">Your enrolled courses</h1>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Price</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <Loader /> : error ? <Message>{error}</Message> : 
                                   <>
                                   {applications.map(items => (
                                       <tr key={items._id}>
                                            <td>{items.course.name}</td>
                                            <td>$ {items.course.price}</td>
                                            <td>{items.isPaid ? <span><span className="badge bg-success">Paid</span> at {moment(items.paidAt).format('LLL')}</span> : <span><span className="badge bg-danger">Not yet paid</span>  pay at {items.paymentMethod} </span>}</td>
                                            <td>{items.isApproved ? <span><span className="badge bg-success">Approved</span> at {moment(items.approvedAt).format('LLL')}</span> : <span className="badge bg-danger">Not yet approved</span>}</td>
                                          
                                       </tr>
                                   ))}
                                   </>
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ApplicationDetails
