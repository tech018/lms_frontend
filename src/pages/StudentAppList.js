import React ,{ useEffect } from 'react'
import { Row, Col, Table, Container} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getStudentListApplications, } from '../actions/enrollActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import dateformat from 'dateformat'
import { Link } from 'react-router-dom'


const StudentAppList = ({ history, match }) => {
    const dispatch = useDispatch()
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const applicationStudentList = useSelector(state => state.applicationStudentList)
    const { loading, error, myApplications } = applicationStudentList

    const id = match.params.id
    useEffect(()=>{
        
        if(userInfo){
            dispatch(getStudentListApplications(id))
        }else{
            history.push('/login')
        }
       
    },[dispatch, id, history, userInfo])

    

    return (
        <div style={{marginTop:'75px'}}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h2 className="mt-3 mb-2">Your Applications</h2>
                    { loading ? ( <Loader /> ) : error ? (<Message variant='danger'>{error}</Message>) : (     
                       <Table>
                         
                        <thead>
                            <tr>
                                <th>Order No</th>
                                <th>Date Created</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {myApplications.map(items=>(
                            <tr key={items._id}>
                                <td>{items._id}</td>
                                <td>{dateformat(items.createdAt)}</td>
                                <td><Link to={`/myapplication/${items._id}`} className="btn btn-primary btn-sm">Check Details</Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                      
                     ) }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default StudentAppList
