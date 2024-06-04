import React from 'react'
import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import general from '../images/generalenglish.png'
import Topdesign from '../images/top_life.png'
import FooterArea from '../images/footer_life.png'
import {Helmet} from "react-helmet";

const GeneralEnglish = () => {
    return (
        <div style={{ marginTop:'82px',backgroundImage:'url('+ general +')',backgroundPosition:'cover',backgroundRepeat:'no-repeat'}}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>General English | Learn and Share Online English Education</title>
            </Helmet>
            <Image src={Topdesign} style={{position:'fixed',width:'100%',zIndex:'100'}} />
            <Container>
                <Card className="mb-3 text-dark">
                <Row>
                    <Col md={12} style={{padding:'40px 40px 40px 40px'}} >
                        <h1 style={{paddingTop:'30px',paddingBottom:'30px'}} className="text-center">GENERAL ENGLISH CLASS</h1>
                        <p>It’s time to learn English professionally! Our General English courses at Learn and Share Online can help enrollees achieve a solid foundation to develop their foreign language skills. We know that learning a new language can be a daunting challenge. This is why we have developed a modern and flexible range of teaching and learning methods that will keep you motivated. This way, you can make real progress every step of the way!Learn and Share Online’s General English course covers grammar, vocabulary, pronunciation and all the key skills that you will need to develop in order to speak and understand English easily. The course has lesson plans to follow in order to learn the English grammar efficiently. It covers all the grammar topics such as the Parts of Speech, Parts of Sentences, Specific Grammar Rules and others. Moreover, our lessons cover the 4 macro-skills (Reading, Listening, Writing, and Speaking) that offers students total learning experience. All our lessons are developed and delivered by experienced teachers who focus on your individual needs and learning style. If you want to travel, make new friends, and communicate using English language with confidence, try this innovative course and get ready to see how you can make fast progress while having fun!</p>
                    </Col>
                    <Col md={4}>
                        <div style={{marginLeft:'10px'}} className="card text-white bg-primary mb-3 hvr-bounce-to-left">
                            <div className="card-body">
                                <h4 className="card-title">KID's English</h4>
                                <p className="card-text">Learning a Second language is now a common thing for an individual in these modern days. Regardless of what language you want your child/children to learn, it is best for them to start at a young age. Teachers will use visual aids, audio aids and highly-interactive games to teach your kid/kids through our virtual platform.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div style={{marginLeft:'20px'}} className="card text-white bg-primary mb-3 hvr-bounce-to-left">
                            <div className="card-body">
                                <h4 className="card-title">TEEN'S English</h4>
                                <p className="card-text">Boost your child’s confidence to communicate to whether foreigner friends or to locals in English. It is an essential skill in entering adult life stage if you want your child/children have a broader view about the world. Teachers will use appropriate materials for each level of students. See our Lesson Topics here. See the sample material here.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div style={{marginLeft:'20px',marginRight:'10px'}} className="card text-white bg-primary mb-3 hvr-bounce-to-left">
                            <div className="card-body">
                                <h4 className="card-title">ADULT / PROFFESIONAL English</h4>
                                <p className="card-text">Whether your reason of leaning English is personal, entertainment, or professional, you can rely on us! Teachers will use news articles, video and audio materials through our virtual platform. Lesson topics are various, useful and very helpful in both student’s life and English learning. See sample of short videos of classes here. ( with the full consent of the students and agreement to upload them for the purpose of promotion).</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                </Card>
            </Container>
            <Image src={FooterArea} style={{width:'100%', position:'absolute'}} />
        </div>
    )
}

export default GeneralEnglish
