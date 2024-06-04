import React from 'react'
import { Row, Col, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";
import Topdesign from '../images/top_life.png'
import FooterArea from '../images/footer_life.png'

const Courses = () => {
    return (
        <div style={{marginTop:'82px'}}>
             <Image src={Topdesign} style={{position:'fixed',width:'100%',zIndex:'100'}} />
             <Helmet>
                <meta charSet="utf-8" />
                <title>Our Courses | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12} style={{marginTop:'90px'}}>
                        <div class="alert alert-dismissible alert-success mt-3 mb-3">
                            <h1 className="text-light">GENERAL ENGLISH</h1>
                            <p>It’s time to learn English professionally! Our General English courses at Learn and Share Online can help enrollees achieve a solid foundation to develop their foreign language skills. We know that learning a new language can be a daunting challenge. This is why we have developed a modern and flexible range of teaching and learning methods that will keep you motivated. This way, you can make..</p>
                            <Link to="/generalenglish" className="btn btn-info">Readmore</Link>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div class="alert alert-dismissible alert-warning mb-3">
                            <h1 className="text-light">TEST PREPARATION ENGLISH</h1>
                            <p>International English Language Testing System (IELTS) is a standardized English language test designed for foreign speakers who wish to study, work..</p>
                            <Link to="/testpreparation" className="btn btn-info">Readmore</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Image src={FooterArea} style={{width:'100%', position:'absolute'}} />
        </div>
    )
}

export default Courses
