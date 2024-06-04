import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { createdAnnouncement } from '../actions/announcementActions'
import { ANNOUNCEMENT_CREATE_RESET } from '../constants/announcementContants'
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import {Helmet} from "react-helmet";


const CreateAnnoucenment = ({history}) => {
    

   

    const [title, setTitle] = useState('')
    const [details, setDetails] = useState(EditorState.createEmpty())


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const announcementCreate = useSelector(state => state.announcementCreate)
    const { success: createSuccess, error:errorAnnounce, announcementCreated } = announcementCreate

    useEffect(()=>{
        if( !userInfo){
            history.push('/login')
        }
        if(createSuccess){
            dispatch({type:ANNOUNCEMENT_CREATE_RESET})
            toast.success(`Successfully created announcement title: ${announcementCreated.title}`)
            history.push('/announcements')
        }
        if(errorAnnounce){
            dispatch({type:ANNOUNCEMENT_CREATE_RESET})
            toast.error(errorAnnounce)
            history.push('/announcements')
        }
    },[history, announcementCreated,createSuccess,errorAnnounce,dispatch,userInfo])

 
    const editorState = details
    const outputdetails = (draftToHtml(convertToRaw(editorState.getCurrentContent())))

    const handleSbmit = (e) => {
        e.preventDefault()
        dispatch(createdAnnouncement({
            title,
            outputdetails,
           
        }))
    }

    return (
        <div style={{marginTop:'75px'}}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Create Announcement | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <h1 className="mt-3">Create Announcement</h1>
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

export default CreateAnnoucenment
