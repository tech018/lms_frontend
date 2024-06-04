import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listTestimonial, testimonialDeleteAction } from '../actions/testimonialActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";

const AdminTestimonials = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const testimonialList = useSelector(state => state.testimonialList)
    const { loading, error, testimonials} = testimonialList

    const testimonialsDelete = useSelector(state => state.testimonialsDelete)
    const { loading:loadingDelete, error:errorDelete, success} = testimonialsDelete

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
        if(userInfo && userInfo.role !== 2){
            history.push(`/dashboard/${userInfo._id}`)
        }
        if(success){
            dispatch(listTestimonial())
            history.push('/admin/testimonials')
        }
    }, [userInfo, history, dispatch, success])

    const deleteHandler = (id) =>{
         
        if(window.confirm('Are you sure?'))
        {
            dispatch(testimonialDeleteAction(id))  
   
            
        }
    }

    return ( 
        <div style={{marginTop:'68px'}}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Testimonials | Learn and Share Online English Education</title>
            </Helmet>
           <Container>
               <Row>
                   <Col md={12}>
                       <h2 className="mt-3">Testimonials</h2>
                    {loadingDelete && <Loader />}
                    {errorDelete && <Message variant="danger">{errorDelete}</Message>}
                   {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Title</th>
                                    <th>Testimony</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.map(items=>(
                                    <tr key={items._id}>
                                        <td width="10%">{items.user.name}</td>
                                        <td width="20%">{items.title}</td>
                                        <td width="50%">{items.testimony}</td>
                                        <td>
                                            <Link className="btn btn-primary" to={`/admin/testimonials/update/${items._id}`}><i className="fas fa-edit"></i></Link>
                                            <Button variant='danger' onClick={()=> deleteHandler(items._id)}><i className='fas fa-trash'></i></Button>    
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    }
                   </Col>
               </Row>
           </Container>
        </div>
    )
}

export default AdminTestimonials