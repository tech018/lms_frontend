import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { createorupdate } from '../actions/purchasedClassActions'

const CreatePurchasedClass = ({history}) => {
    const [userId, setUserId] = useState('')
    const [addClass, setAddClass] = useState('')


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    const createUpdatePurchaseClass = useSelector(state => state.createUpdatePurchaseClass)
    const {loading, error, success } = createUpdatePurchaseClass

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
        if(userInfo && userInfo.role !== 2){
            history.push(`/dashboard/${userInfo._id}`)
        }
        if(success){
            toast.success('Successfully saved!')
            history.push('/admin/pruchasedclass')
        }
    }, [userInfo,history,success])

    const submitHandler = (e)=> {
        e.preventDefault()
        dispatch(createorupdate(userId,addClass ))
    }
    return (
        <div style={{marginTop:'82px'}}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h1 className="mt-5 mb-4">Create Class Puchased</h1>
                        {loading ? <Loader /> : error ? toast.error(error) : 
                        <Form onSubmit={submitHandler}>
                            <Row>
                                <Col md={6}>
                                    <FormControl
                                    placeholder="User ID"
                                    value={userId}
                                    onChange={(e)=>setUserId(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <FormControl
                                    placeholder="On going class purchased"
                                    value={addClass}
                                    onChange={(e)=>setAddClass(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Button className="mt-4" variant="primary" type="submit">Create</Button>
                        </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
} 

export default CreatePurchasedClass