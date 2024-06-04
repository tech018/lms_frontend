import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { listCourse, deleteCourse } from '../actions/courseActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const CourseOffer = ({ match, history }) => {
    const [category, setCategory] = useState('Business')

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const courseList = useSelector(state => state.courseList)
    const { loading, error, courses, pages, page } = courseList

    const courseDelete = useSelector(state => state.courseDelete)
    const {  success:successDelete } = courseDelete
    
    
    useEffect(()=>{
        if(!userInfo ){
            history.push('/login')
        }else{
            if(successDelete){
                dispatch(listCourse(pageNumber, category))
            }
            dispatch(listCourse(pageNumber, category))

        }
      
    },[dispatch, pageNumber, history, userInfo, successDelete,category])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?'))
        {
            dispatch(deleteCourse(id))  
            
        }
        if(error){
            toast.error('Error delete')
        }
    }

    return (
        <div style={{marginTop:"110px"}}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Courses Offer | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
          <Col md={12}>
          <h1 className="mt-3 mb-3">Courses Offer</h1>
          </Col>
          <Col md={12}>
          <Form>
                             <Form.Label className="mt-5" as="h4">Select Category</Form.Label>
                            {[ 'radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                      <Form.Check
                                        inline
                                        label="Business English"
                                        name="group1"
                                        value="Business"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-1`}
                                    />
                                     <Form.Check
                                        inline
                                        label="News English"
                                        name="group1"
                                        value="new_english"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-2`}
                                    />
                                     <Form.Check
                                        inline
                                        label="English for Specific Purpose"
                                        name="group1"
                                        value="english_for_specific"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-3`}
                                    />
                                    <Form.Check
                                        inline
                                        label="KIDS/TEENS ENGLISH"
                                        name="group1"
                                        value="kids_english"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-4`}
                                    />
                                     <Form.Check
                                        inline
                                        label="DAILY CONVO/PRACTICAL ENGLISH"
                                        name="group1"
                                        value="daily_convo"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-5`}
                                    />
                                     <Form.Check
                                        inline
                                        label="IELTS Speaking"
                                        name="group1"
                                        value="eilts"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-6`}
                                    />
                                </div>
                            ))}
                         </Form>
          </Col>
          {userInfo && userInfo.role === 2 &&
            <Col md={6}>
                <Link to="/createcourse" className="btn btn-primary mb-5 mt-3">Create Course</Link>
            </Col>
            } 
           {
                loading ? ( <Loader /> ) : error ? (<Message variant='danger'>{error}</Message>) : (
                <div>
                
                <Row>
                {courses.map(co=> (
                    <Col key={co._id} sm={12} md={6} lg={4} xl={3}>
                         <Card className="mb-2 hvr-sink card-teacher">
                         <Card.Body>
                        <Card.Title as='div'>
                            <strong>{co.name}</strong>
                        </Card.Title>
                        <Card.Text>
                            Descriptions: {co.details}
                        </Card.Text>
                        <Card.Text>
                            Class minutes: {co.minutes}
                        </Card.Text>
                        <Card.Text>
                            Package: {co.package}
                        </Card.Text>
                        <Card.Text>
                            Number of Class: {co.numofclass}
                        </Card.Text>
                        
                       {userInfo && userInfo.role === 2  && 
                        <Card.Text as="p">
                            Price: ${co.price}
                        </Card.Text>
                       }
                    
                    </Card.Body>
                       
           {userInfo && userInfo.role === 0 &&  <Link to={`/enroll/${co._id}`} className="btn btn-success" style={{width:'100%'}}>Book now</Link>}
           {userInfo && userInfo.role ===2 &&  <Button variant='danger' onClick={()=> deleteHandler(co._id)} style={{width:'100%'}}><i className='fas fa-trash' ></i>Delete</Button>}
           {userInfo && userInfo.role === 2 &&  <Link to={`/updatecourse/${co._id}`} className="btn btn-warning mt-1" style={{width:'100%'}}>Update Course</Link>}
                    </Card>
                    </Col>
                ))}
                </Row>
                <Paginate pages={pages} page={page} />
                
                </div>
                )
            } 
            </Container>
        </div>
        
    )
}

export default CourseOffer
