import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Image, Card, Pagination, Modal, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { detailsapplication, 
    getAllTeacherApp,
    countAllOngoingClass,
    countAllFinishedClass,
    countCourse
 } from '../actions/enrollActions'
import Users from '../images/users.png'
import ExamLogo from '../images/examlogo.png'
import Announcement from '../images/announcement.png'
import AllApplications from '../images/applications.png'
import PurchasedClassLogo from '../images/purchased_class.png'
import Youtube from '../images/youtube.png'
import Reward from '../images/reward.png'
import Testimonials from '../images/modules.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { studentpoints } from '../actions/pointsActions'
import { STUDENT_POINTS_RESET } from '../constants/pointsContants'
import {Helmet} from "react-helmet";
import { studentpurchasedclass } from '../actions/purchasedClassActions'

const Dashboard = ({history, match}) => {

    const [show, setShow] = useState(false);
  
    const pageNumber = match.params.pageNumber || 1
    
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const id = userInfo && userInfo._id

    const applicationDetails = useSelector(state => state.applicationDetails)
    const { loading:loadingApplications, error:errorApplications, applications,pages:studentPages,page:studentPage } = applicationDetails

    const ongoingClass = useSelector(state => state.ongoingClass)
    const { loading:loadingCount, error:errorCount, ongoingclass } = ongoingClass

    const finishedClass = useSelector(state => state.finishedClass)
    const { loading:loadingCountf, error:errorCountf, finishedclass } = finishedClass

    const getTeacherApp = useSelector(state => state.getTeacherApp)
    const { loading:loadingTeacherApp, error:errorTeacherApp, teacherapp, page, pages } = getTeacherApp

    const getStudentPoints = useSelector(state => state.getStudentPoints)
    const { loading:loadingPoints, error:errorPoints, studpoints } = getStudentPoints

    const countEnrolled = useSelector(state => state.countEnrolled)
    const { loading:loadingEnrolled, error:errorEnrolled, countenroll } = countEnrolled

    const studentPurchasedClass = useSelector(state => state.studentPurchasedClass)
    const { loading:loadingPurchasedClass, error:errorPurchasedClass, studentclass } = studentPurchasedClass
    
    useEffect(()=>{
        if(!userInfo){
          history.push('/login')
        }else{
            dispatch(detailsapplication(userInfo._id, pageNumber))
            dispatch(getAllTeacherApp(userInfo._id, pageNumber))
            dispatch(countAllOngoingClass(id))
            dispatch(countAllFinishedClass(id))
            dispatch({type: STUDENT_POINTS_RESET })
            dispatch(studentpoints(id))
            dispatch(countCourse(id))
            dispatch(studentpurchasedclass(id))
           
        }
    },[userInfo, history, dispatch, pageNumber,id])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div style={{marginTop:"80px"}}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>{`${userInfo && userInfo.name}`} | Dashboard | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
               <Row>
                    <Col md={3}>  
                        {loading && <Loader /> }
                        {error && <Message>{error}</Message> }
                            {userInfo && 
                                <Card className="mt-3 mb-3 card_student"  key={userInfo._id} style={{ width: '15rem' }}>
                                    <Card.Body>
                                    <Image className="mx-auto d-block" roundedCircle style={{width:'120px',height:'120px', }} src={userInfo.picture} />
                                    <p className="text-center"><i className="fas fa-user"></i> {userInfo.name} <br />{userInfo.role === 2 && <span style={{fontWeight:"bold"}}>Admin</span>}
                                    {userInfo.role === 1 && <span style={{fontWeight:"bold"}}>Teacher</span>}</p>
                                   {userInfo && userInfo.role === 0 && 
                                    <Row>
                                        <Col md={12} className="text-center">
                                            {loadingEnrolled ? <Loader /> : errorEnrolled ? <Message variant="danger">{errorEnrolled}</Message> : 
                                            <span>Purchased Course: <span className="badge rounded-pill bg-info">{countenroll.count}</span></span>
                                            }
                                        </Col>
                                        <Col md={12} className="text-center">
                                            {loadingCount ? <Loader /> : errorCount ? <Message variant="danger">{errorCount}</Message> : 
                                            <span>Ongoing class: <span className="badge rounded-pill bg-success">{ongoingclass.count}</span></span>
                                            }
                                        </Col>
                                        <Col md={12} className="text-center">
                                            {loadingPurchasedClass ? <Loader /> : errorPurchasedClass ? <Message variant="danger">{errorCountf}</Message> : 
                                            <span>Purchased Class: <span className="badge rounded-pill bg-info">{studentclass.class}</span></span>
                                            }
                                        </Col>
                                        <Col md={12} className="text-center">
                                            {loadingCountf ? <Loader /> : errorCount ? <Message variant="danger">{errorCountf}</Message> : 
                                            <span>Class history: <span className="badge rounded-pill bg-info">{finishedclass.count}</span></span>
                                            }
                                        </Col>
                                        {userInfo && userInfo.role === 0 && 
                                        <Col md={12} className="text-center">
                                            {loadingPoints ? <Loader /> : errorPoints ? <Message variant="danger">{errorPoints}</Message> : 
                                            <span><Link onClick={handleShow} style={{textDecoration:'none'}}>Points:</Link> <span className="badge rounded-pill bg-warning">{studpoints.points}</span></span>
                                            
                                            }
                                        </Col>
                                        }
                                    </Row>
                                   }
                                    </Card.Body>
                                </Card>    
                            }
                    </Col>
                    {userInfo && userInfo.role === 2 && 
                        <>
                            <Col md={3}>
                                <Card className="mt-3 mb-3 hvr-bounce-to-left card_student" style={{ width: '15rem' }}>
                                    <Card.Body>
                                        {userInfo && userInfo.role === 2 && <Image className="mx-auto d-block" roundedCircle style={{width:'120px',height:'120px', }} src={AllApplications} />}
                                        <br />
                                        {userInfo && userInfo.role === 2 && <Link to="/allapplications" className="btn btn-info mx-auto d-block">APPLICATIONS</Link>}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="mt-3 mb-3 hvr-bounce-to-left card_student" style={{ width: '15rem' }}>
                                    <Card.Body>
                                        {userInfo && userInfo.role === 2 && <Image className="mx-auto d-block" roundedCircle style={{width:'120px',height:'120px', }} src={Users} />}
                                        <br />
                                        {userInfo && userInfo.role === 2 && <Link to="/users" className="btn btn-danger mx-auto d-block">USERS</Link>}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="mt-3 mb-3 hvr-bounce-to-left card_student" style={{ width: '15rem' }}>
                                    <Card.Body>
                                        {userInfo && userInfo.role === 2 && <Image className="mx-auto d-block" roundedCircle style={{width:'120px',height:'120px', }} src={Announcement} />}
                                        <br />
                                        {userInfo && userInfo.role === 2 && <Link to="/announcements" className="btn btn-success mx-auto d-block">ANNOUNCEMENTS</Link>}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="mt-3 mb-3 hvr-bounce-to-left card_student" style={{ width: '15rem' }}>
                                    <Card.Body>
                                        {userInfo && userInfo.role === 2 && <Image className="mx-auto d-block" roundedCircle style={{width:'120px',height:'120px', }} src={Testimonials} />}
                                        <br />
                                        {userInfo && userInfo.role === 2 && <Link to="/admin/testimonials" className="btn btn-warning mx-auto d-block">TESTIMONIALS</Link>}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="mt-3 mb-3 hvr-bounce-to-left card_student" style={{ width: '15rem' }}>
                                    <Card.Body>
                                        {userInfo && userInfo.role === 2 && <Image className="mx-auto d-block" roundedCircle style={{width:'120px',height:'120px', }} src={Reward} />}
                                        <br />
                                        {userInfo && userInfo.role === 2 && <Link to="/admin/rewards" className="btn btn-info mx-auto d-block">REWARDS</Link>}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="mt-3 mb-3 hvr-bounce-to-left card_student" style={{ width: '15rem' }}>
                                    <Card.Body>
                                        {userInfo && userInfo.role === 2 && <Image className="mx-auto d-block" roundedCircle style={{width:'120px',height:'120px', }} src={Youtube} />}
                                        <br />
                                        {userInfo && userInfo.role === 2 && <Link to="/admin/videos" className="btn btn-danger mx-auto d-block">Videos</Link>}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="mt-3 mb-3 hvr-bounce-to-left card_student" style={{ width: '15rem' }}>
                                    <Card.Body>
                                        {userInfo && userInfo.role === 2 && <Image className="mx-auto d-block" roundedCircle style={{width:'120px',height:'120px', }} src={PurchasedClassLogo} />}
                                        <br />
                                        {userInfo && userInfo.role === 2 && <Link to="/admin/pruchasedclass" className="btn btn-success mx-auto d-block">Purchased Class</Link>}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="mt-3 mb-3 hvr-bounce-to-left card_student" style={{ width: '15rem' }}>
                                    <Card.Body>
                                        {userInfo && userInfo.role === 2 && <Image className="mx-auto d-block" roundedCircle style={{width:'120px',height:'120px', }} src={ExamLogo} />}
                                        <br />
                                        {userInfo && userInfo.role === 2 && <Link to="/admin/speakingassesment" className="btn btn-success mx-auto d-block">Speaking Assessment Test</Link>}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                    }
                    {loadingApplications ? <Loader /> : errorApplications ? <Message variant="danger">{errorApplications}</Message> :
                        <>
                            {applications.map(items=>(
                                <Col md={3}>
                                     {items.isApproved && 
                                        <Card className="mt-3 mb-3 hvr-sink text-center card_student" key={items._id}>
                                            <Card.Body>
                                            {items.isApproved && <h4 className="text-center mt-1">{items.course.name}</h4>}
                                            {items.isApproved && <p>Package: {items.course.package} / Price: ${items.course.price} / Class minutes: {items.course.minutes} / Number of class: {items.course.numofclass} / Description: {items.course.details} </p>}
                                            {items.isApproved && <p className="text-center">{items.isPaid && <span><span className="badge bg-success">Paid</span> at {moment(items.paidAt).format('LLL')}</span>}</p>}
                                            {items.isApproved && <p className="text-center">{items.isPaid && <span><span className="badge bg-success">Approved</span> at {moment(items.approvedAt).format('LLL')}</span>}</p>}
                                            {items.isFinished ? <span><span class="badge rounded-pill bg-success">Finished</span> at {moment(items.isFinishedAt).format('LLL')}</span> : <span class="badge rounded-pill bg-warning">on going class</span>}
                                            {items.isApproved && <Link to={`/myclassdetails/${items._id}`} className="mt-2 btn btn-info mx-auto d-block">Check class</Link> }
                                            </Card.Body>
                                        </Card>
                                     }
                                </Col> 
                            ))}
                             {userInfo && userInfo.role === 0 && 
                             <Pagination className="mx-auto">
                             <label style={{marginRight:'10px'}}>{pages && "Pages"}</label>
                                 {[...Array(studentPages).keys()].map(x => (
                                     <Pagination.Item active={x+1 === studentPage}> <Link key={x+1} to={`/dashboard/page/${x +1 }`}>{x+1}</Link></Pagination.Item>
                                 ))}
                             </Pagination>
                             }
                        </>
                    }
                    {userInfo && userInfo.role === 1 && 
                    <>
                    {loadingTeacherApp ? <Loader /> : errorTeacherApp ? <Message variant="danger">{errorTeacherApp}</Message> :
                        <>
                        {teacherapp.map(teacher=> (
                             <Col md={3}>
                             <Card className="mt-3 mb-3 text-center" key={teacher._id}>
                            
                                 <Card.Body>
                                 {teacher.isApproved && <h4 className="text-center mt-1">{teacher.course.name}</h4>}
                                 {teacher.isApproved && <p className="text-center">{teacher.isPaid && <span><span className="badge bg-success">Paid</span> at {moment(teacher.paidAt).format('LLL')}</span>}</p>}
                                 {teacher.isApproved && <p className="text-center">{teacher.isPaid && <span><span className="badge bg-success">Approved</span> at {moment(teacher.approvedAt).format('LLL')}</span>}</p>}
                                 {teacher.isApproved && <p className="text-center">Student Name/Email : <strong className="text-dark">{teacher.user.name}/{teacher.user.email}</strong></p>}
                                 {teacher.isFinished ? <span><span class="badge rounded-pill bg-success">finished</span> at {moment(teacher.isFinishedAt).format('LLL')}</span> : <span class="badge rounded-pill bg-warning">on going class</span>}
                                    {teacher.isApproved && <Link to={`/myclassdetails/${teacher._id}`} className="mt-2 btn btn-info mx-auto d-block">Check class</Link> }
                                 </Card.Body>
                             </Card>
                        </Col> 
                        ))}
                        
                        {userInfo && userInfo.role === 1 && 
                        <Pagination className="mx-auto">
                        <label style={{marginRight:'10px'}}>{pages && "Pages"}</label>
                            {[...Array(pages).keys()].map(x => (
                                <Pagination.Item active={x+1 === page}> <Link key={x+1} to={`/dashboard/page/${x +1 }`}>{x+1}</Link></Pagination.Item>
                            ))}
                        </Pagination>
                        }
                        </>
                    }
                    </>
                    }
                   
               </Row>
               {userInfo && userInfo.role === 0 && 
               <Modal show={show}  size="lg" onHide={handleClose} animation={true}>
               <Modal.Header>
               <Modal.Title>Reward/Points System : 5 points = 1 class</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                   <h5>You can get 1 point if;</h5>
                  <p>1. You do the homework completely, submit within 2 hours after the class time and finally, get a a full mark</p>
                  <h5>You can get 3 point if;</h5>
                   <p>1. There's no class cancellation for the whole month</p>
                   <p>2. You leave a testimony (a minimum of 2 sentences) and use an actual photo. </p>
                   <p>3. You share your good experience with us through your social media circle and send a screenshot of it to Admin.</p>
                    <h5>You can get 5 points if;</h5>
                    <p>1. You invite others and they enrolled a course. 5 points per person.</p>
               </Modal.Body>
               <Modal.Footer>
               <Button variant="primary" onClick={handleClose}>
                   Close
               </Button>
               </Modal.Footer>
           </Modal>
               }
            </Container>
        </div>
    )
}

export default Dashboard
