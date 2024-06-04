import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Table, Pagination, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import { getAllApplicationsAdmin, deleteApplicationAction } from '../actions/enrollActions'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import dateformat from 'dateformat'
import { toast } from 'react-toastify'
import { APPLICATION_DELETE_RESET } from '../constants/enrollConstants'
import {Helmet} from "react-helmet";

const AllApplications = ({history, match}) => {
    const pageNumber = match.params.pageNumber || 1
   
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const getAllApplication = useSelector(state => state.getAllApplication)
    const { loading:loadingAllApp, error:errorAllApp, allapplication,page, pages } = getAllApplication

    const applicationDelete = useSelector(state => state.applicationDelete)
    const { loading:loadingDelete, error:errorDelete, success } = applicationDelete

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            dispatch({type: APPLICATION_DELETE_RESET})
            dispatch(getAllApplicationsAdmin('',pageNumber))
            if(success){
                toast.success('Successfully delete')
                dispatch(getAllApplicationsAdmin('',pageNumber))
            }
            if(errorDelete){
                toast.error(errorDelete)
                dispatch(getAllApplicationsAdmin('',pageNumber))
            }
        }
        if(userInfo && userInfo.role !== 2){
            history.push(`/dashboard/${userInfo._id}`)
        }
    }, [userInfo, history, dispatch, pageNumber,success,errorDelete])

    const deleteHandler = (id) => {
        
        if(window.confirm('Are you sure?'))
        {
            dispatch(deleteApplicationAction(id))  
            
        }
    
}

    return (
        <div style={{marginTop:'75px'}}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>All Pending and Approved Applications | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                        {loadingDelete && <Loader />}
                        {loadingAllApp ? <Loader/> : errorAllApp ? <Message variant="danger">{errorAllApp}</Message> : 
                        <Row>
                           <h3 className="text-center mt-2">All Pending and Approved Applications</h3>
                            <Col md={12}>
                                <Table responsive striped hover>
                                    <thead>
                                        <tr>
                                            <th>ID/Course Name/Details</th>
                                            <th>User</th>
                                            <th>Status</th>
                                            <th>is Finished</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allapplication.map(items =>(
                                            <>
                                            <tr key={items._id}>
                                                <td>{items._id} /<br />{items.course.name} / {items.course.details}</td>
                                                <td>{items.user.name} /<br /> {items.user.email} / <br /> {items.user.contactNo}</td>
                                                <td>{items.isApproved ? <span><span className="badge bg-success">Approved</span> at {dateformat(items.approvedAt)}</span> : <span className="badge bg-danger">Not yet approved</span>} / <br />
                                                {items.isPaid ? <span><span className="badge bg-success">Paid</span> at {dateformat(items.paidAt)}</span> : <span className="badge bg-danger">Not yet paid</span>}</td>
                                                <td>{items.isFinished ? <span><span className="badge bg-success">Finished</span> at {dateformat(items.isFinishedAt)}</span> : <span className="badge bg-danger">Not yet finished</span>}</td>
                                                <td>
                                                <Link to={`/myclassdetails/${items._id}`}className="btn btn-info" style={{marginRight:'5px'}}><i className="fas fa-eye"></i></Link>
                                                    <Link to={`/updateapplication/${items._id}`} className="btn btn-primary" style={{marginRight:'5px'}}><i className="fas fa-edit"></i></Link>
                                                    <Button variant='danger' onClick={()=> deleteHandler(items._id)} style={{marginTop:'5px'}}><i className='fas fa-trash'></i></Button>
                                                </td>
                                            </tr>
                                           
                                            </>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        }
                    </Col>
                    <Col md={12}>
                        <div className="text-center">
                            <Pagination className="mt-2">
                                {[...Array(pages).keys()].map(x => (
                                    <Pagination.Item active={x+1 === page}> <Link key={x+1} to={`/allapplications/page/${x +1 }`}>{x+1}</Link></Pagination.Item>
                                ))}
                            </Pagination>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AllApplications
