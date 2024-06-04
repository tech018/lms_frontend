import React, {useEffect} from 'react'
import { Container, Col, Row, Table, Button } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getallvideos, deletevideo } from '../actions/videosActions'
import { Link } from 'react-router-dom'
import { CREATE_VIDEO_RESET } from '../constants/videoContants'
import {toast} from 'react-toastify'
import {Helmet} from "react-helmet";

const YouTubeVideos = ({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    const youtubeVideos = useSelector(state => state.youtubeVideos)
    const {loading, error, videos } = youtubeVideos

    const deleteVideo = useSelector(state => state.deleteVideo)
    const {loading:loadingDelete, error:errorDelete, success:successDelete } = deleteVideo

    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        }
        if(userInfo && userInfo.role !==2){
            history.push(`/dashboard/${userInfo._id}`)
        }
        if(successDelete){
            dispatch(getallvideos())
            dispatch({type:CREATE_VIDEO_RESET})
        }
        if(errorDelete){
            toast.error(errorDelete)
        }
        dispatch(getallvideos())
        dispatch({type:CREATE_VIDEO_RESET})
    }, [dispatch,userInfo,history,successDelete,errorDelete])

    const deleteHandler = (id) => {
        
        if(window.confirm('Are you sure?'))
        {
            dispatch(deletevideo(id))  
            
        }
    
    }   
    return (
        <div style={{marginTop:'75px'}}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Youtube Video | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                        <Link className="btn btn-info mt-5 mb-3" to={`/admin/video/create`}><i className="fas fa-plus-circle"></i></Link>
                        {loadingDelete && <Loader />}
                        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                        <Table className="mb-5">
                            <thead>
                                <tr>
                                    <th>Youtube Video ID</th>
                                    <th>Video Title</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {videos.map(items=> (
                                    <tr key={items._id}>
                                        <td>{items.videoId}</td>
                                        <td>{items.title}</td>
                                        <td>
                                        <Button variant='danger' onClick={()=> deleteHandler(items._id)}><i className='fas fa-trash'></i></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default YouTubeVideos
