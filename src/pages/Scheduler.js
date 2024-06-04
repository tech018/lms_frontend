import React, {useEffect} from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Container, Row, Col } from 'react-bootstrap'
import { timeScheduleById } from '../actions/lessonsActions'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Helmet} from "react-helmet";

const Scheduler = ({history, match}) => {

    const dispatch = useDispatch()



    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const getTimeSchedule = useSelector(state => state.getTimeSchedule)
    const { loading, error, timeschedule } = getTimeSchedule


    useEffect(()=> {
        if(userInfo){
            
            dispatch(timeScheduleById(match.params.id))
        }else{
            history.push('/login')
        }
    }, [dispatch, history, match, userInfo])

   
   
    const localizer = momentLocalizer(moment)


    return (
        <div style={{marginTop:'75px'}}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Schedule | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                       {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                             <Calendar className="mt-3 mb-3"
                             localizer={localizer}
                             events={timeschedule}
                             startAccessor="start"
                             endAccessor="end"
                             style={{ height: 500 }}
                            views={{month:true,agenda:true}}
                             />
                       }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Scheduler
