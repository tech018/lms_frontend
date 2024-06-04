import React, {useEffect} from 'react'
import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import { detailsById } from '../actions/enrollActions'
import { finishlessons,ongoinglessons,countnewlessons } from '../actions/lessonsActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Lessons from '../images/lessons.png'
import ExamLogo from '../images/examlogo.png'
import schedule from '../images/schedule.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {Helmet} from 'react-helmet'

const MayClass = ({history, match}) => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const applicationById = useSelector(state => state.applicationById)
    const { loading, error, applicant } = applicationById

    const onGoingLessons = useSelector(state => state.onGoingLessons)
    const { ongoingclass } = onGoingLessons

    const finishedLessons = useSelector(state => state.finishedLessons)
    const { finishedclass } = finishedLessons

    const countNewLessons = useSelector(state => state.countNewLessons)
    const { newlesson } = countNewLessons

  

    useEffect(()=> {
        if(userInfo){
            
            dispatch(detailsById(id))
            dispatch(finishlessons(id))
            dispatch(ongoinglessons(id))
            dispatch(countnewlessons(id))
           
        }else{
            history.push('/login')
        }
    }, [dispatch, history, match, userInfo, id])

    return (
        <div style={{marginTop:'75px'}}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>{`${applicant && applicant.isApproved && applicant.course.name}`} | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                        {loading ? <Loader /> : error  ? <Message variant="danger">{error}</Message> : 
                            <Row>
                                <Col md={12}>
                                    <h2 className="mb-4 mt-3 text-center">Class Name: {applicant && applicant.isApproved && applicant.course.name}</h2>
                                   <Row>
                                      
                                       <Col md={2}>
                                       {finishedclass && <p>Finished class: <span className="badge rounded-pill bg-primary">{finishedclass.count}</span></p>}
                                       </Col>
                                       <Col md={2}>
                                       {ongoingclass && <p>Not finish class: <span className="badge rounded-pill bg-danger">{ongoingclass.count}</span></p>}
                                       </Col>
                                       
                                   </Row>
                                </Col>
                                <Col md={2}>
                                    <Card className="mb-3 hvr-sink hvr-bounce-to-left card_student">
                                        <Card.Body>
                                            <Image src={Lessons} className="mx-auto d-block" style={{width:'130px'}}/>
                                        </Card.Body>    
                                        <Link to={`/lessons/${applicant._id}`} className="btn btn-danger" style={{width:'100%'}}>My Classnotes {userInfo && userInfo.role === 0 && <span className="badge rounded-pill bg-primary">{newlesson && newlesson.count === null ? <span></span> : newlesson && <span>{newlesson.count} new</span>}</span>}</Link>
                                    </Card>
                                </Col>
                                <Col md={2}>
                                    <Card className="mb-3 hvr-sink hvr-bounce-to-left card_student">
                                        <Card.Body>
                                            <Image src={schedule} className="mx-auto d-block" style={{width:'130px'}}/>
                                        </Card.Body>
                                        <Link to={`/scheduler/${applicant._id}`} className="btn btn-primary" style={{width:'100%'}}>My Schedule</Link>
                                    </Card>
                                </Col>
                                <Col md={2}>
                                    <Card className="mb-3 hvr-sink hvr-bounce-to-left card_student">
                                        <Card.Body>
                                            <Image src={ExamLogo} className="mx-auto d-block" style={{width:'130px'}}/>
                                        </Card.Body>
                                        <Link to={`/admin/speakingassesment/${applicant._id}`} className="btn btn-primary" style={{width:'100%'}}>Speaking Assessment Test</Link>
                                    </Card>
                                </Col>
                               
                            </Row>
                        }
                       
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MayClass
