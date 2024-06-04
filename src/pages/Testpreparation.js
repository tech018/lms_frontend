import React from 'react'
import { Container, Card, Image } from 'react-bootstrap'
import {Helmet} from "react-helmet";
import Topdesign from '../images/top_life.png'
import FooterArea from '../images/footer_life.png'

const Testpreparation = () => {
    return (
        <div style={{marginTop:'82px'}}>
             <Image src={Topdesign} style={{position:'fixed',width:'100%',zIndex:'100'}} />
             <Helmet>
                <meta charSet="utf-8" />
                <title>Test Preparation English | Learn and Share Online English Education</title>
            </Helmet>
            <Container >
                <Card className="mb-3">
                  <Card.Title> <h1 style={{paddingTop:'102px',paddingBottom:'30px'}} className="mt-2 text-center">TEST PREPARATION ENGLISH</h1></Card.Title>
                    <div className="alert alert-dismissible alert-warning text-light" style={{marginRight:'30px',marginLeft:'30px'}}>
                        <h4 className="alert-heading">IETLS SPEAKING</h4>
                        <p className="mb-0">International English Language Testing System (IELTS) is a standardized English language test designed for foreign speakers who wish to study, work and live in an English-speaking environment. If you plan to study or work in Australia, United Kingdom, or Canada, this is the right course for you! Learn and Share offers IELTS Speaking Course with kind-hearted experienced teachers to provide you any language assistance in order for you to achieve your desired target score in the speaking category.</p>
                    </div>
                    <div className="alert alert-dismissible alert-primary text-light" style={{marginRight:'30px',marginLeft:'30px'}}>
                        <h4 className="alert-heading">TOEFL SPEAKING</h4>
                        <p className="mb-0">Test of English as a Foreign Language is used to measure English language proficiency and aptitude of non-native English speakers who wish to be admitted in colleges, universities and agencies in Australia, Canada, the U.K and the United States. Learn and Share offers TOEFL Speaking Course with kind-hearted experienced teachers to provide you any language assistance in order for you to achieve your desired speaking skill level.</p>
                    </div>
                </Card>
            </Container>
            <Image src={FooterArea} style={{width:'100%', position:'absolute'}} />
        </div>
    )
}

export default Testpreparation
