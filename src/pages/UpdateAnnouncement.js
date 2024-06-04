import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { updateAnnouncement } from '../actions/announcementActions'
import { ANNOUNCEMENT_UPDATE_RESET } from '../constants/announcementContants'
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import {Helmet} from "react-helmet";

const UpdateAnnouncement = ({history, match}) => {
    const announcementId = match.params.id
    
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState(EditorState.createEmpty())


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const announcementUpdate = useSelector(state => state.announcementUpdate)
    const { success: updateAnnSuccess, error:errorUpdateAnnounce, announceupdate } = announcementUpdate

    const editorState = details
    const outputdetails = (draftToHtml(convertToRaw(editorState.getCurrentContent())))

    useEffect(()=>{
        if( !userInfo){
            history.push('/login')
        }
        if(updateAnnSuccess){
            dispatch({type:ANNOUNCEMENT_UPDATE_RESET})
            toast.success(`Successfully created announcement title: ${announceupdate.title}`)
            history.push('/announcements')
        }
        if(errorUpdateAnnounce){
            dispatch({type:ANNOUNCEMENT_UPDATE_RESET})
            toast.error(errorUpdateAnnounce)
            history.push('/announcements')
        }

        
    },[history, announceupdate,updateAnnSuccess,errorUpdateAnnounce,dispatch,userInfo])

 
    

    const handleSbmit = (e) => {
        e.preventDefault()
        if(!title){
            toast.error('Please fill the title')
        }else if(!outputdetails){
            toast.error('Please fill the details')
        }else{
            dispatch(updateAnnouncement({
                _id:announcementId,
                title,
                outputdetails,
               
            }))
        }
       
    }

    return (
        <div style={{marginTop:'75px'}}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Update Announcement | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <h1 className="mt-3">Update Announcement</h1>
                    <Col md={12}>
                        <Form onSubmit={handleSbmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Announcement Title</Form.Label>
                                    <Form.Control 
                                    value={title}
                                    placeholder="Annoucement Title"
                                    onChange={(e)=>setTitle(e.target.value)}
                                    type="text"
                                    className="mb-2"
                                    />
                                </Col>
                                <Col md={12}>
                                <Editor editorState={details}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                wrapperStyle={{ border: "1px solid white", marginBottom: "20px" }}
                                editorStyle={{ height: "200px", padding: "0px"}}
                                onEditorStateChange={editorState => setDetails(editorState)} />
                                </Col>
                            </Row>
                            <Button type="submit" className="mb-3" variant="primary">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UpdateAnnouncement
