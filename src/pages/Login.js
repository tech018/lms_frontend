import React, {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Container, Col, Form, Card, Button, Image } from 'react-bootstrap'
import Topdesign from '../images/top_life.png'
import FooterArea from '../images/footer_life.png'
import { listAnnounce } from '../actions/announcementActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import { toast } from 'react-toastify'
import { Markup } from 'interweave';
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";

const Login = ({ history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

 
    const dispatch = useDispatch()
    
    const announceList = useSelector(state => state.announceList)
    const {loading, error, announcement } = announceList

    const userLogin = useSelector(state => state.userLogin)
    const {loading:loadingLogin, error:errorLogin, userInfo } = userLogin

    

    useEffect(()=> {
        if(userInfo){
            history.push(`/dashboard/${userInfo._id}`)
        }else{
            history.push('/login')
        }
        dispatch(listAnnounce())
    },[dispatch, userInfo, history])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!email || !password){
            toast.error('Please Insert your email or password')
        }
        if(password.length < 6){
            toast.error('Password atleast six characters')
        }
        try {
            dispatch(login(email, password))
        } catch (error) {
             toast.error(error ) 
            
        }
    }

    return (
        <div style={{marginTop:'82px'}}>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Member's Login | Learn and Share Online English Education</title>
            </Helmet>
            <Image src={Topdesign} style={{position:'fixed',width:'100%',zIndex:'100'}} />
            <div>
            <Container>
                <Row style={{paddingTop:'60px'}}>
                    <Col md={4}>
                        <Card className="text-white" style={{marginTop:'30px', marginBottom:'30px',backgroundColor:'rgb(2, 58, 122)'}}>
                            {loadingLogin && <Loader />}
                            {errorLogin && <Message>{errorLogin}</Message>}
                            <Form onSubmit={handleSubmit} style={{padding:'30px 30px 30px 30px'}}>
                                <Form.Group controlId="email" className="mt-2">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                    type="email" 
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    autoFocus
                                    />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Row className="mt-3">
                                    <Col md={6}>
                                    <Button type="submit" className="btn btn-info">Login</Button>
                                    </Col>
                                    <Col md={6}>
                                        <Link className="text-white" to="/forgotpassword">Forgot password?</Link> 
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                    <Col md={8}>
                        { loading ? ( <Loader /> ) : error ? (<Message variant='danger'>{error}</Message>) : (
                           <div>
                                {announcement.map(announce=> (
                                    <div key={announce._id} style={{marginTop:'30px'}} className="alert alert-dismissible alert-info">
                                        <h2 className="mt-1 text-white"><i className="fas fa-bullhorn"></i> Announcement</h2>
                                        {announce.title}
                                        <Markup content={announce.details} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
           
            </div>
            <Image src={FooterArea} style={{width:'100%', position:'absolute'}} />
        </div>
    )
}

export default Login
