import React, {useState, useEffect} from 'react'
import { Col, Container, Form, FormControl, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { forgot } from '../actions/userActions'


const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const forgorPassword = useSelector(state => state.forgorPassword)
    const { loading, error, forgotPass } = forgorPassword

    useEffect(()=>{
        if(forgotPass){
            toast.success(forgotPass)
        }
        if(error){
            toast.error(error)
        }
    }, [forgotPass, error])

    const submithandler = (e) => {
        e.preventDefault()
        if(!email){
            toast.error('Please enter your email')
        }else{
       
        dispatch(forgot(email))
        }
    }

    return (
        <div style={{marginTop: '100px'}}>
            <Container>
                <Row>
                    <Col md={12}>
                    <h2 className="mt-5">Forgot your password?</h2>
                {loading && <Loader />}
                <Form className="mb-3" onSubmit={submithandler}>
                    <Row>
                        <Col md={3}>
                            <FormControl 
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="Enter your email"
                            />
                        </Col>
                    </Row>
                    <Button className="mt-3" type="submit" variant="primary">Confirm</Button>
                </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ForgotPassword
