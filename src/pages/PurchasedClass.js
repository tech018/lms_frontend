import React, {useEffect} from 'react'
import { Container, Row, Col, Table, Button,Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { purchasedclass, deletepurchasedclass } from '../actions/purchasedClassActions'
import { PURCHASED_CREATEUPDATE_RESET } from '../constants/purchasedClassContants'

const PurchasedClass = ({history, match}) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const getAllPurchased = useSelector(state => state.getAllPurchased)
    const { loading, error, page, pages, purchased } = getAllPurchased

    const deletePuchasedClass = useSelector(state => state.deletePuchasedClass)
    const { loading:loadingDeletePC, error:errorDeletePC, success } = deletePuchasedClass

    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        }else{
            dispatch({type: PURCHASED_CREATEUPDATE_RESET})
            dispatch(purchasedclass(pageNumber))
        }
        if(userInfo && userInfo.role !==2){
            history.push(`/dashboard/${userInfo._id}`)
        }
        if(success){
            dispatch(purchasedclass(pageNumber))
        }
    },[history,dispatch,userInfo,success, pageNumber])


    const deleteHandler = (id) => {
        
        if(window.confirm('Are you sure?'))
        {
            dispatch(deletepurchasedclass(id))  
            
        }
    
    }

    return ( 
        <div style={{marginTop:'82px'}}>
            <Container>
                <Row>
                    <Col md={12}>
                        {loadingDeletePC && <Loader />}
                        {errorDeletePC && <errorDeletePC />}
                        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                            <>
                            <h1 className="mt-5 mb-3 text-center">STUDENT PURCHASED CLASS</h1>
                            <Link to="/admin/create/purchasedclass" className="btn btn-success mb-4">Create</Link>
                            <Table hover striped>
                                <thead>
                                    <tr>
                                        <th>USER</th>
                                        <th>PURCHASED CLASS</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchased.map(items=>(
                                        <tr key={items._id}>
                                            <td>{items.user.email} / {items.user.name}</td>
                                            <td>{items.class}</td>
                                            <td>
                                            <Button variant='danger' onClick={()=> deleteHandler(items._id)}><i className='fas fa-trash'></i></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            </>
                        }
                    </Col>
                    <Col md={12}>
                        <Pagination className="mb-5">
                            {[...Array(pages).keys()].map(x => (
                                <Pagination.Item active={x+1 === page}> <Link key={x+1} to={`/admin/pruchasedclass/page/${x +1 }`}>{x+1}</Link></Pagination.Item>
                            ))}
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PurchasedClass;