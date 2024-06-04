import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Col, Row, Table, Button } from 'react-bootstrap'
import { getListApplications, deleteStudentApplication } from '../actions/enrollActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import dateformat from 'dateformat'


const StudentAllApplications = ({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const applicationList = useSelector(state => state.applicationList)
    const { loading, error, studentApps } = applicationList


    const studentApplicationDelete = useSelector(state => state.studentApplicationDelete)
    const {  success } = studentApplicationDelete

    useEffect(()=>{
        if(userInfo){
            dispatch(getListApplications())
        }else{
            history.push('/login')
        }
        if(success){
            dispatch(getListApplications())
        }
    }, [history, dispatch, userInfo, success])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?'))
        {
            dispatch(deleteStudentApplication(id))  
            
            
        }
    
    }

    return (
        <div style={{marginTop:'75px'}}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h1 className="mt-2">Student Applications</h1>
                        {loading && <Loader /> ? error && <Message>{error}</Message> : 
                            <div>
                                { userInfo && userInfo.role === 2 &&
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Application Id</th>
                                                <th>Status</th>
                                                <th>Student Info</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentApps.map(items=>(
                                                <tr key={items._id}>
                                                    <td>{items._id}</td>
                                                    <td>{items.isPaid ? <span><span className="badge rounded-pill bg-success">Paid</span> paid at {dateformat(items.paidAt)}</span> : <span className="badge rounded-pill bg-danger">Not Paid</span>} / 
                                                    <br />{items.isApproved ? <span><span className="badge rounded-pill bg-success">Approved</span> approved at {dateformat(items.approvedAt)}</span> : <span className="badge rounded-pill bg-danger">Not yet apprroved</span>}</td>
                                                    <td>{items.user.name} /<br />{items.user.email}</td>
                                                    <td>
                                                        <Link to={`/updateapplication/${items._id}`} className="btn btn-primary">Update</Link>
                                                        {userInfo && userInfo.role ===2 &&  <Button style={{marginLeft:'5px'}} variant='danger' onClick={()=> deleteHandler(items._id)}><i className='fas fa-trash'></i>Delete</Button>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                }
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default StudentAllApplications
