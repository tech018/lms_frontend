import React from 'react'
import AboutBG from '../images/About.png'
import Founder from '../images/founder.jpg'
import { Row, Col, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Courses from '../images/courses.png'
import Team from '../images/team.png'
import {Helmet} from "react-helmet";
import Topdesign from '../images/top_life.png'
import FooterArea from '../images/footer_life.png'

const About = () => {
    return (
       <div> 
           <Image src={Topdesign} style={{position:'fixed',width:'100%',zIndex:'100'}} />
        <div style={{backgroundImage:'url('+ AboutBG +')',marginTop:"82px"}}>
            
             <Helmet>
                <meta charSet="utf-8" />
                <title>About | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <div className="alert alert-dismissible alert-info hvr-bounce-to-left" style={{marginTop:'100px'}}>
                    <Row>
                        <Col md={4}>
                            <Image className="joe" src={Founder} roundedCircle style={{padding:'30px 30px 30px 30px',width:'100%'}} />
                        </Col>
                        <Col md={8} className="thefounder">
                            <h3 className="text-light">The Founder</h3>
                            <div>
                                <p>Hello! Welcome to LEARN AND SHARE ONLINE! My name is Joe, not my real name but students know and remember me with this name. I’m the founder of Learn and Share Online English Education which started to operate in 2018.</p>
                                <p>I am a graduate of Bachelor of Science in Secondary Education majoring in English and have been teaching since 2010.</p>
                                <p>Starting an institution for learning was something I could have never imagined. But thanks to the Almighty who has given me inspirations and motivations, Learn and Share Online English Education now fosters English speaker aspirants from China and Vietnam.</p>
                                <Link to="/founder" className="btn btn-success">View More</Link>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="alert alert-dismissible alert-success mt-4 hvr-bounce-to-left">
                    <Row>
                        <Col md={8} className="ourcourses">
                            <h3 className="mt-4 text-light" style={{paddingLeft:'30px'}}>Our Courses</h3>
                            <p style={{paddingLeft:'30px'}}>
                            An online class is a course conducted over the Internet. They are generally conducted through a learning management system, in which students can view their course syllabus and academic progress, as well as communicate with fellow students and their course instructor.
                            </p>
                            <Link to="/ourcourses" style={{marginLeft:'30px'}} className="btn btn-warning">View Courses</Link>
                        </Col>
                        <Col md={4}>
                            <Image src={Courses} style={{width:'300px',height:'300px'}} />
                        </Col>
                    </Row>
                </div>
                <div className="alert alert-dismissible alert-danger mt-4 mb-4 hvr-bounce-to-left">
                    <Row>
                        <Col md={6}>
                            <Image style={{width:'350px', height:'350px', marginLeft:'70px'}} src={Team} />
                        </Col>
                        <Col md={6} className="ourteam">
                            <h3 className="mt-4 text-light">Our Team</h3>
                            <p>Learn and Share Online is a company based on Philippines providing professional online English language lessons to English-speaker aspirants.We are made up of a team of well-trained professionals from different fields of Education. English is,and always will be our forte.</p>
                            <Link to="/about/teachers" className="btn btn-info">View Team</Link>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Image src={FooterArea} style={{width:'100%', position:'absolute'}} />
        </div>
       
        </div> 
    )
}

export default About
