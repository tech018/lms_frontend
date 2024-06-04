import React, {useEffect, useState} from 'react'
import { Col, Container, Row, Form, FormControl, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { TestimonyById, updateTest } from '../actions/testimonialActions'
import { toast } from 'react-toastify'
import { TESTIMONIAL_DETAILS_RESET, TESTIMONIAL_UPDATE_RESET } from '../constants/testimonialConstants'
import {Helmet} from "react-helmet";

const TestimonailsUpdate = ({history, match}) => {
    const [title, setTitle] = useState('')
    const [testimonials, setTestimonials] = useState('')
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const testimonialsDetails = useSelector(state => state.testimonialsDetails)
    const { loading, error, testimony } = testimonialsDetails

    const updateTestimonials = useSelector(state => state.updateTestimonials)
    const { loading:loadingUpdate, error:errorUpdate, success } = updateTestimonials

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            dispatch(TestimonyById(match.params.id))
           
        }
        
        setTitle(testimony.title)
        setTestimonials(testimony.testimony)
    }, [history, dispatch, userInfo, match, testimony.title,testimony.testimony, success])


    const handleUpdate = (e) => {
        e.preventDefault()
        if(!title){
            toast.error('Please enter title')
        }else if(!testimonials){
            toast.error('Please enter testimony')
        }else{
            dispatch(updateTest({
                _id: match.params.id,
                title,
                testimony:testimonials,
            }))
           
            if(errorUpdate){
                toast.error(errorUpdate)
            }
            if(success){
                toast.success('Successfully update')
                history.push('/admin/testimonials')
                dispatch({type: TESTIMONIAL_UPDATE_RESET})
                dispatch({type: TESTIMONIAL_DETAILS_RESET})
            }
        }
    }

    return (
        <div style={{marginTop:'68px'}}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Update Testimonials | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                        {loading && <Loader />}
                        {error && <Message variant="danger">{error}</Message>}
                        {loadingUpdate ? <Loader /> : 
                        <Form className="mt-3 mb-3" onSubmit={handleUpdate}>
                            <Row>
                                <Col md={8}>
                                    <Form.Label>Title</Form.Label>
                                    <FormControl
                                    type="text"
                                    value={title}
                                    onChange={(e)=>setTitle(e.target.value)}
                                    autoFocus
                                    />
                                </Col>
                               
                                <Col md={12}>
                                    <Form.Label className="mt-3">Details</Form.Label>
                                    <FormControl 
                                    type="text"
                                    as="textarea" rows={3} 
                                    value={testimonials}
                                    onChange={(e)=>setTestimonials(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" className="btn btn-danger mt-3">Update</Button>
                        </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TestimonailsUpdate;