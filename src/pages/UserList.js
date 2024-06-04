import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Table, Button, FormControl, Pagination, Image } from 'react-bootstrap'
import { getAllUsers, deleteUser } from '../actions/userActions'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {Helmet} from "react-helmet";

const UserList =({history, match})=> {
    const pageNumber = match.params.pageNumber || 1
    const [keyword, setKeyword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    const userList = useSelector(state => state.userList)
    const {loading, error, users, page, pages } = userList

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDeleteUser, error: errorDeleteUser } = userDelete

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
        if(userInfo && userInfo.role !== 2){
            history.push(`/dashboard/${userInfo._id}`)
        }else{
            dispatch(getAllUsers(keyword, pageNumber))
        }
        if(successDeleteUser){
            toast.success('Successfully deleted')
            dispatch(getAllUsers(keyword, pageNumber))
        }
        if(errorDeleteUser){
            toast.error(errorDeleteUser)
        }
    }, [dispatch, userInfo, history, keyword, pageNumber, successDeleteUser, errorDeleteUser])

    const deleteHandler = (id) => {
        
            if(window.confirm('Are you sure?'))
            {
                dispatch(deleteUser(id))  
                
            }
        
    }

    return (
        <div style={{marginTop:'75px'}}>
               <Helmet>
                    <meta charSet="utf-8" />
                    <title>User List | Learn and Share Online English Education</title>
                </Helmet>
            <Container className="mb-5">
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col md={6}>
                            <h1 className="mt-5">User List</h1>
                            </Col>
                            <Col md={6}>
                                <FormControl 
                                placeholder="Search by name.." 
                                value={keyword} 
                                onChange={(e)=>setKeyword(e.target.value)}
                                type="text"
                                className="mt-5"
                                />
                            </Col>
                        </Row>
                        {loading ? <Loader /> : error ? <Message>{error}</Message> : 
                            <Table striped responsive className="mb-5">
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>User ID/Name</th>
                                        <th>Email/ <br />Contact Number</th>
                                        <th>Address</th>
                                        <th>Role</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user=>(
                                        <tr key={user._id}>
                                            <td><Image src={user.picture} style={{width:'40px',height:'40px'}} roundedCircle/></td>
                                            <td>{user._id}/ <br />{user.name}</td>
                                            <td>{user.email} /<br /> {user.contactNo}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                {user.role === 0 && <span>Student</span>}
                                                {user.role === 1 && <span>Teacher</span>}
                                                {user.role === 2 && <span>Administrator</span>}
                                            </td>
                                            <td>
                                                <Link to={`/users/${user._id}`} className="btn btn-primary"><i className="fas fa-edit"></i></Link>
                                                <Button variant='danger' onClick={()=> deleteHandler(user._id)}><i className='fas fa-trash'></i></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                    </Col>
                    <Col md={12}>
                    <Pagination className="mb-5">
                        {[...Array(pages).keys()].map(x => (
                            <Pagination.Item active={x+1 === page}> <Link key={x+1} to={`/users/page/${x +1 }`}>{x+1}</Link></Pagination.Item>
                        ))}
                    </Pagination>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserList
