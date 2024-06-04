import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Container, Row, Col, Card, Form, Pagination, FormControl } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getBooks } from '../actions/libraryActions'
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet'

const Library = ({history, match}) => {
    const pageNumber = match.params.pageNumber || 1
    const [category, setCategory] = useState('kids_english')

    const [keyword, setKeyword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const getLibrary = useSelector(state => state.getLibrary)
    const { loading, error, page, pages, books } = getLibrary

    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        }else{
            dispatch(getBooks(keyword, pageNumber, category))
        }
    }, [userInfo,history,pageNumber,dispatch,keyword,category])

    return (
        <div style={{marginTop:'75px'}}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Library | Learn and Share Online English Education</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={4} className="mb-5">
                       <Row>
                           <Col md={12}>
                           <Form.Label className="mt-5" as="h4">Search by Book Name</Form.Label>
                            <FormControl 
                            type="text"
                            placeholder="Type Book Name"
                            value={keyword}
                            onChange={(e)=>setKeyword(e.target.value)}
                            />
                           </Col>
                           <Col md={12}>
                       
                         <Form>
                             <Form.Label className="mt-5" as="h4">Select Category</Form.Label>
                            {[ 'radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="KID'S ENGLISH"
                                        name="group1"
                                        value="kids_english"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-1`}
                                    />
                                   <Form.Check
                                        inline
                                        label="TEEN'S ENGLISH"
                                        name="group1"
                                        value="teens_english"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-2`}
                                    />
                                    <Form.Check
                                        inline
                                        label="ADULT ENGLISH"
                                        name="group1"
                                        value="adult_english"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-3`}
                                    />
                                      <Form.Check
                                        inline
                                        label="PRACTICAL ENGLISH"
                                        name="group1"
                                        value="practical_english"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-4`}
                                    />
                                     <Form.Check
                                        inline
                                        label="BUSINESS LEVEL ONE"
                                        name="group1"
                                        value="business_level1"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-5`}
                                    />
                                     <Form.Check
                                        inline
                                        label="BUSINESS LEVEL TWO"
                                        name="group1"
                                        value="business_level2"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-6`}
                                    />
                                     <Form.Check
                                        inline
                                        label="BUSINESS LEVEL THREE"
                                        name="group1"
                                        value="business_level3"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-6`}
                                    />
                                    <Form.Check
                                        inline
                                        label="NEWS ARCTICLE LEVEL TWO"
                                        name="group1"
                                        value="newsarticleleveltwo"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-7`}
                                    />
                                     <Form.Check
                                        inline
                                        label="NEWS ARCTICLE LEVEL THREE"
                                        name="group1"
                                        value="newsarticlelevelthree"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-8`}
                                    />
                                     <Form.Check
                                        inline
                                        label="IELTS Speaking"
                                        name="group1"
                                        value="eilts"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        type={type}
                                        id={`inline-${type}-9`}
                                    />
                                </div>
                            ))}
                         </Form>
                                            
                           </Col>
                       </Row>
                    </Col>   
                    <Col md={8}>
                        <Row>
                            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                                
                                <>
                                {books.map(items=>(
                                    <Col md={4}  key={items._id}>
                                        <Card className="hvr-wobble-to-bottom-right mt-3" >
                                            <Card.Img variant="top" style={{ width:'100%',height:'250px'}} src={items.thumbnail} />
                                            <Card.Body>
                                                <Card.Title className="text-center">{items.bookName}</Card.Title>
                                            </Card.Body>
                                            <Link style={{width:'100%'}} to={`/book/${items.pdfName}`} className="btn btn-primary text-center">Open Book</Link>
                                        </Card>
                                    </Col>
                                ))}
                                </>
                            }
                        </Row>
                    </Col>
                   
                    <Col md={12}>
                        <Pagination style={{marginTop:"90px"}}>
                            {[...Array(pages).keys()].map(x => (
                                <Pagination.Item active={x+1 === page}> <Link className="text-light" key={x+1} to={`/library/page/${x +1 }`}>{x+1}</Link></Pagination.Item>
                            ))}
                        </Pagination>
                    </Col>                
                </Row>
            </Container>
        </div>
    )
}

export default Library;