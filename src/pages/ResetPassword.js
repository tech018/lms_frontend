import React, {useState, useEffect} from 'react'
import { Col, Container, Form, FormControl, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { reset } from '../actions/userActions'
import { FORGOT_PASSWORD_RESET } from '../constants/userContants'

const ResetPassword = ({match, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const resetPassword = useSelector(state => state.resetPassword)
    const { loading, error, success:successReset } = resetPassword
    const emailParams = match.params.email
    useEffect(()=>{
        dispatch({ type: FORGOT_PASSWORD_RESET })
        if(!emailParams){
            history.push('/')
        }
        setEmail(match.params.email)
        if(successReset){
            toast.success('Successfully update your password check your email for a new password')
        }
        if(error){
            toast.error(error)
        }
    
    }, [match,successReset,error, history, emailParams, dispatch])

    const submithandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Password not match')
        }else if(!password){
            toast.error('Please enter your password')
        }else if(!confirmPassword){
            toast.error('Please enter cofirm password')
        }else{
            dispatch(reset(email, password))
            
        }
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div style={{marginTop: '82px'}}>
            <Container>
                <Row>
                    <Col md={6}>
                    <h2 className="mt-5">Forgot your password?</h2>
                {loading && <Loader />}
                <Form className="mb-3" onSubmit={submithandler}>
                    <Row>
                        <Col md={12}>
                            <Form.Label>Your Email</Form.Label>
                            <FormControl 
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            disabled
                            />
                        </Col>
                        <Col md={12}>
                        <Form.Label>Your new password</Form.Label>
                            <FormControl 
                            type="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder="Enter your new password"
                            autoFocus
                            className="mt-1"
                            />
                        </Col>
                        <Col md={12}>
                        <Form.Label>confirm new password</Form.Label>
                            <FormControl 
                            type="password"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            className="mt-1"
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

export default ResetPassword
