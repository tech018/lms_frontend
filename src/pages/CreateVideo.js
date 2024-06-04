import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createvideo } from '../actions/videosActions'
import { toast } from 'react-toastify'
import { Form, FormControl, Container, Col, Row, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Helmet} from "react-helmet";

const CreateVideo = ({history}) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [videoId, setVideoId] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    const createVideo = useSelector(state => state.createVideo)
    const {loading, error, success } = createVideo

    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        }
        if(userInfo && userInfo.role !== 2){
            history.push(`/dashboard/${userInfo._id}`)
        }
        if(success){
            toast.success('Successfully saved')
            history.push('/admin/videos')
          
        }
    }, [userInfo,history,success,dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if(!title){
            toast.error('Please enter a video title')
        }else if(!videoId){
            toast.error('Please enter a youtube ID')
        }else{
            dispatch(createvideo(
                videoId,
                title
            ))
           
        }

    }

    return (
        <div style={{marginTop:'75px'}}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Create Youtube Video | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                        <Form className="mt-5 mb-5" onSubmit={submitHandler}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <FormControl
                                        type="text"
                                        value={title}
                                        onChange={(e)=>setTitle(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Video ID</Form.Label>
                                        <FormControl
                                        type="text"
                                        value={videoId}
                                        onChange={(e)=>setVideoId(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button type="submit" variant="warning" className="mt-3">Create</Button>
                        </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateVideo
