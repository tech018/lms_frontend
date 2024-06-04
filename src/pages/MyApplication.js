import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApplicationDetails, updateBankTransfer, applicationPayPal } from '../actions/enrollActions'
import { Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import dateFormat from 'dateformat';
import {Helmet} from 'react-helmet'
import axios from 'axios'
import { toast } from 'react-toastify'
import { PayPalButton } from 'react-paypal-button-v2'
import { APPLICATION_PAY_RESET } from '../constants/enrollConstants'



const MyApplication = ({ match, history }) => {
    const applicationId = match.params.id
    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const applicationPay = useSelector(state => state.applicationPay)
    const { loading:loadingPay, success:successPay } = applicationPay

    const bankTransfer = useSelector(state => state.bankTransfer)
    const { success, error: errorTransfer } = bankTransfer

    const applicationDetails = useSelector(state => state.applicationDetails)
    const { loading:loadingApplication, error, application } = applicationDetails

    useEffect(()=> {
        if(userInfo){
            
            dispatch(getApplicationDetails(match.params.id))
        }else{
            history.push('/login')
        }
            const addPayPalScript = async () => {
            const { data:clientId } = await axios.get('http://localhost:5000/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src= `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }   
            document.body.appendChild(script)
        }
        if(!applicationPay || successPay){
            dispatch(getApplicationDetails(match.params.id))
            dispatch({type: APPLICATION_PAY_RESET})
        }else if(!application.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
       
        
    }, [dispatch, match, history, userInfo, successPay, application.isPaid, applicationPay])

    const uploadFileHandler = async (e) => {
        const file  = e.target.files[0]
        if(!file){
            toast.error('Please select a file')
        }
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                   
                }
            }
            const { data } = await axios.post('http://localhost:5000/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }
    

    const submitHandler = (e) => {
        e.preventDefault()
       
        dispatch(updateBankTransfer(applicationId, image))
        if(success){
            toast.success('Successfully send the proof of payment wait for LSO admin response')
        }else if(errorTransfer){
            toast.error(errorTransfer)
        }
    }
    
    const successPaymentHandler = (paymentResult) => {
        dispatch(applicationPayPal(applicationId, paymentResult))
    }   

    return (
        loadingApplication ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
        <div style={{marginTop:"75px"}}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Application No. {application._id}</title>
            </Helmet>
            <Container>
                <Row>
                    <Col md={12}>
                    <h1 className="mt-3 mb-2">Application No. {application._id}</h1>
                    </Col>
                    <Col md={12}>
                    <h3>Name: {application.user.name}</h3>
                    <h3>Email: {application.user.email}</h3>
                      <Table>
                          <thead>
                              <tr>
                                  <th>Course Name</th>
                                  <th>Details</th>
                                  <th>Price</th>
                                  <th>Minutes per session</th>
                                  <th>Package</th>
                                  <th>Number of Class</th>
                                  <th>Payment Method</th>
                                  <th></th>
                              </tr>
                          </thead>
                          <tbody>
                              {application.enrollItems.map(enroll=>(
                                  
                                <tr key={enroll._id}>
                                  <td>{enroll.name}</td>
                                  <td>{enroll.details}</td>
                                  <td>{enroll.price}</td>
                                  <td>{enroll.minutes}</td>
                                  <td>{enroll.package}</td>
                                  <td>{enroll.numofclass}</td>
                                  <td>{enroll.paymentMethod}</td>
                                  <td>
                                      {enroll.paymentMethod ==="Bank Transfer" && 
                                        <Card>
                                            <Form style={{margin:'20px 20px 20px 20px'}} onSubmit={submitHandler}>
                                            <Form.Group controlId='image'>
                                                <Form.Label>Upload a picture of Proof of payment</Form.Label>
                                                <Form.Control type="text" placeholder="Enter image url" value={image}
                                                onChange={(e)=>setImage(e.target.value)}>
                                                </Form.Control>
                                                <p className="text-center"> OR </p>
                                                <input className="form-control" type="file"id='image-file' label='Choose file'
                                                 onChange={uploadFileHandler} />
                                                {uploading && <Loader />}
                                            </Form.Group>
                                            <Button type="submit" className="mt-2 mb-1" variant="primary">Submit</Button>
                                            </Form>
                                        </Card> 
                                      }
                                   {!application.isPaid &&
                                   
                                   <Card>
                                        <div style={{margin:'30px 30px 30px 30px'}}>
                                            <p>Your bill is: ${enroll.price}</p>
                                            <p>Pay with paypal</p>
                                            {enroll.paymentMethod ==="paypal" && 
                                                    <>
                                                        {loadingPay && <Loader />}
                                                        {!sdkReady ? <Loader /> : (
                                                        <PayPalButton amount={enroll.price} onSuccess={successPaymentHandler} />
                                                        )} 
                                                    </>
                                            }
                                        </div>
                                   </Card>
                                   
                                   }
                                      
                                  </td>
                                </tr>

                              ))}
                          </tbody>
                          <tfoot>
                              <tr>
                                  <th>Payment Status: {application.isPaid ? <><span className="badge bg-success">Paid</span> paid at {dateFormat(application.paidAt)}</> : <span class="badge bg-danger">Not Paid</span> }</th>
                                  <th>is it Approved? {application.isApproved ? <span className="badge bg-success">Approved</span> : <span class="badge bg-warning">Not yet approved</span> }</th>
                              </tr>
                          </tfoot>
                      </Table>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MyApplication
