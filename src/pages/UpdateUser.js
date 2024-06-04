import React, {useEffect, useState} from 'react'
import { Container, Col, Row, Form, Button, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from '../constants/userContants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUser, userDetail } from '../actions/userActions'
import { toast } from 'react-toastify'
import {Helmet} from "react-helmet";

const UpdateUser = ({history, match}) => {
    const userId = match.params.id
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [role, setRole] = useState('')
    const [contactNo, setContactNo] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const {  success: successUpdateUser, error: errorUpdateUser  } = userUpdate

    const userDetails = useSelector(state => state.userDetails)
    const {  loading, error: errorUserDetails, user  } = userDetails

    const dispatch = useDispatch()

    useEffect(()=>{
        if(userInfo){
            if(successUpdateUser){
                history.push('/users')
                toast.success('Successfully updated')
            }
            if(errorUpdateUser){
                history.push('/users')
                toast.error(errorUpdateUser)
            }
            if(userInfo && userInfo.role !== 2){
                history.push(`/dashboard/${userInfo._id}`)
            }else{
                dispatch(userDetail(userId))
                dispatch({
                    type: USER_DETAILS_RESET
                })
               
                
                dispatch({
                    type: USER_UPDATE_RESET
                })
                if(successUpdateUser){
                    history.push('/users')
                    toast.error(successUpdateUser)
                }
            }
            
        }else{
            history.push('/login')
        }
       
    },[ history,dispatch, userInfo, userId, successUpdateUser, errorUpdateUser])

    const submitHandler = (e) => {
        e.preventDefault()
        if(!name){
            toast.error('Please enter name')
        }else if(!contactNo){
            toast.error('Please center contact no')
        }else if(!role){
            toast.error('Please select role')
        }else if(!address){
            toast.error('Please enter address')
        }else{
            dispatch(updateUser({
                _id: user._id,
                name,
                address,
                role,
                contactNo
            }))
        }
    }

    return (
        <div style={{marginTop:'75px'}}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`${user && user.name}`} /Update Info | Learn and Share Online English Education</title>
                </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                        {loading ? <Loader /> : errorUserDetails ? <Message variant="danger">{errorUserDetails}</Message> :
                            <div>
                                <h1 className="mt-3">Update User : {user.name}</h1>
                                <Form className="mb-3" onSubmit={submitHandler}>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>
                                                    Full Name
                                                </Form.Label>
                                                <FormControl 
                                                type="text" 
                                                value={name}
                                                onChange={(e)=>setName(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>
                                                    Contact No
                                                </Form.Label>
                                                <FormControl 
                                                type="text" 
                                                value={contactNo}
                                                onChange={(e)=>setContactNo(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                       <Col md={4}>
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                            <Form.Label>User Role</Form.Label>
                                            <Form.Control as="select" value={role} onChange={(e)=>setRole(e.target.value)}>
                                            <option >Select</option>
                                            <option value="0">Student</option>
                                            <option value="1">Teacher</option>
                                            <option value="2">Administrator</option>
                                            </Form.Control>
                                        </Form.Group>                                  
                                        </Col>
                                        <Col md={12}>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control as="textarea" rows={3} 
                                            value={address}
                                            onChange={(e)=>setAddress(e.target.value)}
                                            />
                                        </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button className="mt-2" type="submit" variant="primary">Update</Button>
                                </Form>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UpdateUser
