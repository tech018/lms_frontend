import React, {useEffect} from 'react'
import { Container, Col, Row, Card, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getAllTeachers } from '../actions/userActions'
import {Helmet} from "react-helmet";
import Topdesign from '../images/top_life.png'
import FooterArea from '../images/footer_life.png'

const Teachers = () => {
    const dispatch = useDispatch()

    const teacherList = useSelector(state => state.teacherList)
    const { loading, error, teacher } = teacherList

    const role = 1
    useEffect(()=>{
        dispatch(getAllTeachers(role))
    }, [dispatch])

    return (
        <div style={{marginTop:'82px'}}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Our Team | Learn and Share Online English Education</title>
            </Helmet>
            <Image src={Topdesign} style={{position:'fixed',width:'100%',zIndex:'100'}} />
            <Container>
                <Row>
                    <h1 className="text-center mb-5" style={{paddingTop:'60px'}}>Our Team</h1>
                   {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                        <>
                        {teacher.map(items=>(
                            <Col md={4} className="mb-5">
                                <Card style={{ width: '18rem' }} className="hvr-bounce-to-left card-teacher">
                                    <Card.Img variant="top" style={{height:'250px',width:'100%'}} src={items.picture} />
                                    <Card.Body>
                                        <Card.Title className="text-center">{items.name}</Card.Title>
                                    </Card.Body>
                                    </Card>
                            </Col>
                        ))}
                        </>
                   }
                </Row>
            </Container>
            <Image src={FooterArea} style={{width:'100%', position:'absolute'}} />
        </div>
    )
}

export default Teachers
