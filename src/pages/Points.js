import React, {useEffect} from 'react'
import { Container, Row, Col, Table,Pagination, Button } from 'react-bootstrap'
import { getAllPoints, deletepoints } from '../actions/pointsActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {Helmet} from "react-helmet";

const Points = ({history, match}) => {

    const pageNumber = match.params.pageNumber | 1

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const getPoints = useSelector(state => state.getPoints)
    const {loading, error, page, pages, points } = getPoints

    const deletePoints = useSelector(state => state.deletePoints)
    const {loading:deleteloading, error:errordelete, success } = deletePoints

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
        if(userInfo && userInfo.role !== 2){
            history.pushState(`/dashboard/${userInfo._id}`)
            
        }else{
            dispatch(getAllPoints(pageNumber))
        }
        if(success){
            dispatch(getAllPoints(pageNumber))
        }
        if(errordelete){
            toast.error(errordelete)
        }
    }, [history,dispatch,userInfo,pageNumber,success,errordelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?'))
        {
            dispatch(deletepoints(id))  
        }
    
    }

    return (
        <div style={{marginTop:'75px'}}>
               <Helmet>
                <meta charSet="utf-8" />
                <title>Rewards/Points | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                        <h1 className="text-center mt-5 mb-2">Student's Reward</h1>
                        <Link to="/admin/rewards/create" className="btn btn-primary"><i className="fas fa-plus-circle"></i></Link>
                        {deleteloading && <Loader />}
                        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                        <Table responsive hover striped>
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Points</th>
                                    <th>Messages</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {points.map(items=> (
                                   <tr key={items._id}>
                                       <td>{items.user.name}/{items.user.email}</td>
                                       <td>{items.points}</td>
                                       <td>{items.message}</td>
                                       <td><Button variant='danger' onClick={()=> deleteHandler(items._id)}><i className='fas fa-trash'></i></Button></td>
                                   </tr> 
                                ))}
                            </tbody>
                        </Table>
                        }
                    </Col>
                    <Col md={12}>
                    <Pagination>
                        {[...Array(pages).keys()].map(x => (
                            <Pagination.Item active={x+1 === page}> <Link key={x+1} to={`/admin/rewards/page/${x +1 }`}>{x+1}</Link></Pagination.Item>
                        ))}
                    </Pagination>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Points
