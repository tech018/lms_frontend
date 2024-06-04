import React, {useEffect} from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { lessonSingleDetails, updateStatusNew } from '../actions/lessonsActions'
import moment from 'moment'
import { Markup } from 'interweave';
import { Helmet } from 'react-helmet'
const GetLessonDetails = ({history, match}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const lessonDetails = useSelector(state => state.lessonDetails)
    const { loading, error, lesson } = lessonDetails

    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        }else{
            dispatch(lessonSingleDetails(match.params.id))
            dispatch(updateStatusNew(match.params.id))
        }
    }, [userInfo, history, dispatch, match])

    return (
        <div style={{marginTop:'75px'}}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${lesson && lesson.title}`} | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                       {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                        <Row>
                            <Col md={3}>
                                <Card className="mt-3 mb-3 text-center">
                                    <Card.Body>
                                    <h2 >{lesson.title}</h2>
                                  
                                    <p>
                                        Time Start: {moment(lesson.start).format('LT')} <br />
                                        Time End: {moment(lesson.end).format('LT')}<br />
                                        Date: {moment(lesson.start).format('LL')}
                                    </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={9}>
                                <Card className="mt-3 mb-3">
                                    <Card.Body>
                                    <Markup content={lesson.desc} />
                                    </Card.Body>
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

export default GetLessonDetails
