import React, {useEffect, useState} from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createnotes } from '../actions/lessonsActions'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap'
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import {Helmet} from "react-helmet";
import { CREATE_NOTES_RESET } from '../constants/lessonsConstants'

const CreateNotes = ({history, match}) => {
    const id = match.params.id
    const [title, setTitle] = useState("")
    const [description, setDesc] = useState(EditorState.createEmpty())

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const createNewNotes = useSelector(state => state.createNewNotes)
    const { loading, error, success } = createNewNotes


    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
        if(userInfo && userInfo.role !== 1){
            history.push(`/dashboard/${userInfo._id}`)
        }
        dispatch({type:CREATE_NOTES_RESET})
        if(success){
            toast.success('Successfully created notes')
        }
    }, [userInfo,history,success,dispatch])

    const editorState = description
    const desc = (draftToHtml(convertToRaw(editorState.getCurrentContent())))



    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title){
            toast.error('Please enter notes title')
        }else if(!desc){
            toast.error('Please enter yout notes')
        }else{
            dispatch(createnotes(
                id,
                title,
                desc
            ))
        }
    }
    return (
        <div style={{marginTop:'82px'}}>
                <Helmet>
                <meta charSet="utf-8" />
                <title>Create new notes | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                         <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Label className="mt-4">Title</Form.Label>
                                    <FormControl 
                                    value={title}
                                    placeholder="Notes Title"
                                    onChange={(e)=>setTitle(e.target.value)}
                                    type="text"
                                    className="mb-2"
                                    />
                                </Col>
                                <Col md={12}>
                                <Form.Label className="mt-4">Class Notes</Form.Label>
                                <Editor editorState={description}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                wrapperStyle={{ border: "1px solid white", marginBottom: "20px" }}
                                editorStyle={{ height: "300px", padding: "0px"}}
                                onEditorStateChange={editorState => setDesc(editorState)} />
                                </Col>
                            </Row>
                            <Button type="submit" className="mb-3" variant="primary">Submit</Button>
                        </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateNotes