import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Container, Row, Col, Card, Form, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getlimitbooks } from '../actions/libraryActions'
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import Topdesign from '../images/top_life.png'
import FooterArea from '../images/footer_life.png'

const PublicLibrary = () => {
  

    const [limit, setLimit] = useState('kids_english')

    const dispatch = useDispatch()


    const getLimitLibrary = useSelector(state => state.getLimitLibrary)
    const { loading, error, books } = getLimitLibrary

    useEffect(()=> {
        dispatch(getlimitbooks(limit))
    }, [dispatch,limit])

    return (
        <div style={{marginTop:'82px'}}>
            
            <Helmet>
                <meta charSet="utf-8" />
                <title>Library | Learn and Share Online English Education</title>
            </Helmet>
            <Image src={Topdesign} style={{position:'fixed',width:'100%',zIndex:'100'}} />
            <Container >
                <Row style={{paddingTop:"90px"}}>
                    <Col md={2}>
                        <Form.Label className="mt-5">Select Category</Form.Label>
                        <Form.Control as="select" value={limit} onChange={(e)=>setLimit(e.target.value)}>
                            <option value="kids_english">KIDS ENGLISH</option>
                            <option value="teens_english">TEENS ENGLISH</option>
                            <option value="adult_english">ADULT ENGLISH</option>
                            <option value="practical_english">PRACTICAL ENGLISH</option>
                            <option value="business_level1">BUSINESS LEVEL ONE</option>
                            <option value="business_level2">BUSINESS LEVEL TWO</option>
                            <option value="eilts">IELTS SPEAKING</option>
                        </Form.Control>
                    </Col>   
                    <Col md={10}>
                        <Row>
                            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                                
                                <>
                                {books.map(items=>(
                                    <Col md={4}  key={items._id}>
                                        <Card className="hvr-wobble-to-bottom-right mt-3" >
                                            <Card.Img variant="top" style={{ width:'100%',height:'300px'}} src={items.thumbnail} />
                                            <Card.Body>
                                                <Card.Title className="text-center">{items.bookName}</Card.Title>
                                            </Card.Body>
                                            <Link style={{width:'100%'}} to={`/book/${items.pdfName}`} className="btn btn-primary text-center">Open Book</Link>
                                        </Card>
                                    </Col>
                                ))}
                                </>
                            }
                        </Row>
                    </Col>
                   <Col md={12}>
                      <strong> <p className="text-center mt-4">To view more books please login with your email <Link to="/login">here</Link></p></strong>
                   </Col>
                             
                </Row>
            </Container>
            <Image src={FooterArea} style={{width:'100%', position:'absolute'}} />
        </div>
    )
}

export default PublicLibrary;