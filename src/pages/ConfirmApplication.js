import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, createApplication } from '../actions/enrollActions'
import Message from '../components/Message'
import {  Container, Row, Table, OverlayTrigger,Tooltip, Col, Button, Form, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'



const ConfirmApplication = ({ match,location,history  }) => {

    const courseId = match.params.id
    const pm =  location.search ? location.search.split('=')[1] : 1

    const dispatch = useDispatch()
    
    const applicationCreate = useSelector(state => state.applicationCreate)
    const {success, order} = applicationCreate
    
    const enroll = useSelector(state => state.enroll)
    const {enrollItems} = enroll

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
 
    useEffect(()=>{
        if(success){
            history.push(`/myapplication/${order._id}`)
        }
        if(userInfo){ 
            if(courseId) {
                dispatch(addToCart(courseId, pm))
            }
            
        }else{
            history.push('/login')
        }
    },[dispatch,courseId,history,success, order, userInfo, pm])

    const removeFromCartHandler =(id) =>{
        dispatch(removeFromCart(id))
    }

    const submitApplication = (e) => {
        e.preventDefault()
            dispatch(createApplication({
                enrollItems: enroll.enrollItems,
            }))
        
    }

    return (
        <div style={{marginTop:'75px'}}>
            <Container>
                <Row>
                    <Col md={9}>
                       
                            <h1 className="mt-3 mb-3">Check your Application</h1>
                        {enrollItems.length === 0 ? <Message>Your order is empty<Link to="/coursesoffer"> Go Back</Link></Message> : 
                             <Table responsive striped bordered hover size="sm">
                             <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Details</th>
                                    <th>Price</th>
                                    <th>Number of Class</th>
                                    <th>Minutes per sessions</th>
                                    <th>Package</th>
                                    <th>Payment Method</th>
                                    <th>Actions</th>
                                </tr>
                             </thead>
                             <tbody>
                                  {enrollItems.map(item => (
                                       <tr key={item.course}>
                                           <td>{item.name}</td>
                                           <td>{item.details}</td>
                                           <td>${item.price}</td>
                                           <td>{item.numofclass} classes</td>
                                           <td>{item.minutes}</td>
                                           <td>{item.package}</td>
                                           <td>{item.paymentMethod}</td>
                                           <td>
                                           <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete {item.name}</Tooltip>}>
                                            <span className="d-inline-block">
                                           <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}><i className="fas fa-trash"></i></Button>
                                           </span>
                                            </OverlayTrigger>
                                           </td>
                                       </tr>
                                  ))}
                                  </tbody>
                            </Table>
                        }
                        
                      
                    </Col>
                    <Col md={3}>
                        <Card className="mt-5">
                            <Form style={{margin:'20px 20px 20px 35px'}} onSubmit={submitApplication}>
                                <Row>
                                    <Col md={12}>
                                    <Button type="submit" variant="primary">Submit Application</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ConfirmApplication
