import React, {useEffect} from 'react'
import {  
    Container,
    Row,
    Col,
    Table,
    Spinner
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    useSelector, useDispatch
} from 'react-redux'
import { GET_SINGLE_EXAM_RESET } from '../constants/examConstants'
import { singleexam } from '../actions/examActions'

const ExamSingle = ({history, match}) => {
    const appId = match.params.id
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const getOneExam = useSelector(state => state.getOneExam)
    const { loading, error, examsingle } = getOneExam

    useEffect(()=> {
        if(!userInfo){
            history.push('/')
        }else{
          
            dispatch(singleexam(appId))
            dispatch({type:GET_SINGLE_EXAM_RESET})
        }
        if(error){
            toast.error(error)
           dispatch({type:GET_SINGLE_EXAM_RESET})
        }
    }, [userInfo,history,dispatch,error, appId])

    return (
        <div style={{marginTop:'8rem'}}>
            <Container>
                <Row>
                    <Col md={12}>
                        { userInfo && userInfo.role === 1 &&
                            <Link  to={`/admin/speakingassestment/create/${appId}`} className="btn btn-primary" >Create Assessment Test</Link>
                            }
                    </Col>
                    <Col md={12}>
                       
                        {examsingle  && 
                          <>
                          {loading ?  <Spinner animation="grow" /> :
                          <>
                          <h1 className="text-center">Your Assessment Test Result</h1>
                          <Table className="mt-3"  striped bordered hover>
                              <thead>
                                  <tr>
                                      <th>Exam</th>
                                      <th>Score</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>Fluency and coherence</td>
                                      <td>{examsingle.fluandcoh}</td>
                                  </tr>
                                  <tr>
                                      <td>Lexical Resource</td>
                                      <td>{examsingle && examsingle.lexires}</td>
                                  </tr>
                                  <tr>
                                      <td>Grammar range and accuracy</td>
                                      <td>{examsingle && examsingle.gramandaccu}</td>
                                  </tr>
                                  <tr>
                                      <td> Pronunciation</td>
                                      <td>{examsingle && examsingle.pronun}</td>
                                  </tr>
                              </tbody>
                              <tfoot>
                                  <tr>
                                      <td style={{fontWeight:'bold'}}>Final Score</td>
                                      <td style={{fontWeight:'bold'}}>{examsingle && examsingle.finalScore}</td>
                                  </tr>
                              </tfoot>
                          </Table>
                          </>
                          } </> }
                    </Col>
                    <hr className="mt-3" />
                    <Col md={12}>
                        <h5 className="mt-3">The IELTS 9-band scale</h5>
                        <p>Each band corresponds to a level of English competence. All parts of the test and the Overall Band Score can be reported in whole and half bands, e.g 6.5, 7.0, 7.5, 8.0.</p>
                        <p><span style={{fontWeight:'bold'}}>Band 9: </span>Expert user: has fully operational command of the language: appropriate, accurate and fluent with complete understanding.</p>  
                        <p><span style={{fontWeight:'bold'}}>Band 8: </span>Very good user: has fully operational command of the language with only occasional unsystematic inaccuracies and inappropriacies. Misunderstandings may occur in unfamiliar situations. Handles complex detailed argumentation well.</p>
                        <p><span style={{fontWeight:'bold'}}>Band 7: </span>Good user: has operational command of the language, though with occasional inaccuracies, inappropriacies and misunderstandings in some situations. Generally handles complex language well and understands detailed reasoning.</p>
                        <p><span style={{fontWeight:'bold'}}>Band 6: </span>Competent user: has generally effective command of the language despite some inaccuracies, inappropriacies and misunderstandings. Can use and understand fairly complex language, particularly in familiar situations.</p>
                        <p><span style={{fontWeight:'bold'}}>Band 5: </span>Modest user: has partial command of the language, coping with overall meaning in most situations, though is likely to make many mistakes. Should be able to handle basic communication in own field.</p>
                        <p><span style={{fontWeight:'bold'}}>Band 4: </span>Limited user: basic competence is limited to familiar situations. Has frequent problems in understanding and expression. Is not able to use complex language.</p>
                        <p><span style={{fontWeight:'bold'}}>Band 3: </span>Extremely limited user: conveys and understands only general meaning in very familiar situations. Frequent breakdowns in communication occur.</p>
                        <p><span style={{fontWeight:'bold'}}>Band 2: </span>Intermittent user: no real communication is possible except for the most basic information using isolated words or short formulae in familiar situations and to meet immediate needs. Has great difficulty understanding spoken and written English.</p>
                        <p><span style={{fontWeight:'bold'}}>Band 1: </span>Non-user: essentially has no ability to use the language beyond possibly a few isolated words.</p>
                        <p><span style={{fontWeight:'bold'}}>Band 0: </span>Did not attempt the test: No assessable information provided</p>
                    </Col>
                    <Col md={12}>
                        <h5>Interpretation of Score in other Test</h5>
                        <Table bordered style={{color:'black', marginTop:'2rem'}}>
                            <thead>
                                <tr>
                                    <th style={{backgroundColor:'#a5a5a5'}}>IELTS BAND</th>
                                    <th style={{backgroundColor:'#ffc000'}}>CEFR LEVEL</th>
                                    <th style={{backgroundColor:'#fbe4d5'}}>TOEIC SCORE</th>
                                    <th style={{backgroundColor:'#4472c4'}}>LSO LEVEL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{backgroundColor:'#a5a5a5'}}>8.5- 9-0</td>
                                    <td style={{backgroundColor:'#ffc000'}}>C2</td>
                                    <td style={{backgroundColor:'#fbe4d5'}}>935-990</td>
                                    <td style={{backgroundColor:'#4472c4'}}>Expert</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:'#a5a5a5'}}>7.5 – 8.0</td>
                                    <td style={{backgroundColor:'#ffc000'}}>C1</td>
                                    <td style={{backgroundColor:'#fbe4d5'}}>855-930</td>
                                    <td style={{backgroundColor:'#4472c4'}}>Advance</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:'#a5a5a5'}}>6.5 – 7.0</td>
                                    <td style={{backgroundColor:'#ffc000'}}>B2</td>
                                    <td style={{backgroundColor:'#fbe4d5'}}>785-850</td>
                                    <td style={{backgroundColor:'#4472c4'}}>High Intermediate</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:'#a5a5a5'}}>5.5 - 6.0</td>
                                    <td style={{backgroundColor:'#ffc000'}}>B1</td>
                                    <td style={{backgroundColor:'#fbe4d5'}}>550 - 780</td>
                                    <td style={{backgroundColor:'#4472c4'}}>Intermediate</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:'#a5a5a5'}}>4.5- 5.0</td>
                                    <td style={{backgroundColor:'#ffc000'}}>A2</td>
                                    <td style={{backgroundColor:'#fbe4d5'}}>225-545</td>
                                    <td style={{backgroundColor:'#4472c4'}}>Pre-Intermediate</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:'#a5a5a5'}}>3.5 – 4.0</td>
                                    <td style={{backgroundColor:'#ffc000'}}>A1</td>
                                    <td style={{backgroundColor:'#fbe4d5'}}>120-220</td>
                                    <td style={{backgroundColor:'#4472c4'}}>Elementary</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:'#a5a5a5'}}>2.5 – 3.0</td>
                                    <td style={{backgroundColor:'#ffc000'}}></td>
                                    <td style={{backgroundColor:'#fbe4d5'}}></td>
                                    <td style={{backgroundColor:'#4472c4'}}>Low Beginner</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:'#a5a5a5'}}>1.0 – 2.0</td>
                                    <td style={{backgroundColor:'#ffc000'}}></td>
                                    <td style={{backgroundColor:'#fbe4d5'}}></td>
                                    <td style={{backgroundColor:'#4472c4'}}></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ExamSingle
