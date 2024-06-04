import React from 'react'
import {  Container, Row, Col, Image } from 'react-bootstrap'
import FooterLogo from '../images/logo.png'
import QRCode from '../images/qrcode.png'
import Skype from '../images/skype.png'
import Dingtalk from '../images/dingtalk.png'
import Wechat from '../images/wachat.png'

const Footer = () => {
    return (
        <div className="footer" style={{backgroundColor:'#003976',marginTop:'167px'}}>
              <Container>
           <Row>
              
                    <Col md={5}>
                        <Image className="mt-3 footer-logo" src={FooterLogo} style={{width:'230px'}} />
                        <p className="mt-2 text-light text-mark">Free Your Potential And Foster a Love of Learning to Last a Lifetime. Contact Us Now to Learn More about Our Online Services!</p>
                    </Col>
                    <Col md={3}>
                        <h3 className="mt-3 text-light header-chat">Chat agent</h3>
                        <Image src={QRCode} className="qrcode"/>
                    </Col>
                    <Col md={4} className="text-light">
                    <h3 className="mt-3 text-light text-get">Get Intouch</h3>
                    <p className="para"><Image src={Skype} style={{width:'30px'}} /> marjorie.balutoc1</p>
                    <p className="para"><Image src={Dingtalk} style={{width:'30px'}} /> lsojoe</p>
                    <p className="para"><i className="fa fa-envelope"></i> learnandshareoe@gmail.com</p>
                    <p className="para"><Image src={Wechat} style={{width:'30px'}} /> LSO033018</p>
                    </Col>
               
            </Row>
            </Container>
            <div className="bg-info text-light">
                <Container>
                    <Row>
                        <Col md={12} className="pt-2 pb-2 text-center">
                            © Copyright Learn and Share Online Education. All rights reserved 2021. Designed and Developed by <a style={{textDecoration:'none', color:'whitesmoke'}} href="www.zepnds.com">Zep Network and Data Solution</a>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Footer
