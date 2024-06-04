import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components//Footer'
import About from './pages/About'
import Login from './pages/Login'
import Courses from './pages/Courses'
import CompleteRegistration from './pages/auth/RegistrationComplete'
import GeneralEnglish from './pages/GeneralEnglish'
import Testpreparation from './pages/Testpreparation'
import Dashboard from './pages/Dashboard'
import CourseOffer from './pages/CourseOffer'
import Enroll from './pages/Enroll'
import ForgotPassword from './pages/ForgotPassword'
import CreateCourse from './pages/CreateCourse'
import UpdateCourse from './pages/UpdateCourse'
import AllApplications from './pages/AllApplications'
import CreateAnnoucenment from './pages/CreateAnnoucenment'
import AdminAnnouncement from './pages/AdminAnnouncement'
import UpdateAnnouncement from './pages/UpdateAnnouncement'
import UserList from './pages/UserList'
import ApplicationDetails from './pages/ApplicationDetails'
import { ToastContainer } from 'react-toastify'
import UpdateUser from './pages/UpdateUser'
import PayNow from './pages/ApplicationById'
import ResetPassword from './pages/ResetPassword'
import ApplicationUpdate from './pages/ApplicationUpdate'
import MayClass from './pages/MayClass'
import Lessons from './pages/Lessons'
import CreateLesson from './pages/CreateLesson'
import GetLessonDetails from './pages/GetLessonDetails'
import UpdateLessonDetails from './pages/UpdateLessonDetails'
import Scheduler from './pages/Scheduler'
import AdminTestimonials from './pages/AdminTestimonials'
import TestimonailsUpdate from './pages/TestimonialsUpdate'
import Library from './pages/Library'
import BookReader from './pages/utilsPdfLoader/BookReader'
import AccountSettings from './pages/AccountSettings'
import Founder from './pages/Founder'
import Points from './pages/Points'
import CreatePoints from './pages/CreatePoints'
import AddTestimony from './pages/AddTestimony'
import Teachers from './pages/Teachers'
import YouTubeVideos from './pages/YouTubeVideos'
import CreateVideo from './pages/CreateVideo'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import PublicLibrary from './pages/PublicLibrary'
import CreateNotes from './pages/CreateNotes'
import PurchasedClass from './pages/PurchasedClass'
import CreatePurchasedClass from './pages/CreatePurchasedClass'
import Exam from './pages/Exam'
import CreateExam from './pages/CreateExam'
import ExamSingle from './pages/ExamSingle'
import TeacherExamList from './pages/TeacherExamList'
import CreateExamTeacher from './pages/CreateExamTeacher'


const App = () => {
  return (
    <div>
      <MessengerCustomerChat
        pageId="2666393460041849"
        appId="5254652717941489"
      />  
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/coursesoffer/page/:pageNumber" component={CourseOffer} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/activate/:email" component={CompleteRegistration} />
          <Route exact path="/ourcourses" component={Courses} />
          <Route exact path="/generalenglish" component={GeneralEnglish} />
          <Route exact path="/testpreparation" component={Testpreparation} />
          <Route exact path="/dashboard/:id" component={Dashboard} />
          <Route exact path="/dashboard/page/:pageNumber" component={Dashboard} />
          <Route exact path="/coursesoffer" component={CourseOffer} />
          <Route exact path="/enroll/:id" component={Enroll} />
          <Route exact path="/myapplications/:id" component={ApplicationDetails} />
          <Route exact path="/paynow/:id" component={PayNow} />
          <Route exact path="/createcourse" component={CreateCourse} />
          <Route exact path="/updatecourse/:id" component={UpdateCourse} />
          <Route exact path="/resetpassword/:email" component={ResetPassword} />
          <Route exact path="/allapplications" component={AllApplications} />
          <Route exact path="/allapplications/page/:pageNumber" component={AllApplications} />
          <Route exact path="/allapplications/search/:keyword/page/:pageNumber" component={AllApplications} />
          <Route exact path="/allapplications/search/:keyword" component={AllApplications} />
          <Route exact path="/createAnnoucement" component={CreateAnnoucenment} />
          <Route exact path="/announcements" component={AdminAnnouncement} />
          <Route exact path="/announcements/page/:pageNumber" component={AdminAnnouncement} />
          <Route exact path="/announcements/search/:keyword/page/:pageNumber" component={AdminAnnouncement} />
          <Route exact path="/announcements/search/:keyword" component={AdminAnnouncement} />
          <Route exact path="/updateannoucement/:id" component={UpdateAnnouncement} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/page/:pageNumber" component={UserList} />
          <Route exact path="/users/search/:keyword/page/:pageNumber" component={UserList} />
          <Route exact path="/users/search/:keyword" component={UserList} />
          <Route exact path="/users/:id"component={UpdateUser} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/updateapplication/:id" component={ApplicationUpdate} />
          <Route exact path="/myclassdetails/:id" component={MayClass} />
          <Route exact path="/lessons/:id" component={Lessons} />
          <Route exact path="/lessons/:id/page/:pageNumber" component={Lessons} />
          <Route exact path="/createlesson/:id" component={CreateLesson} />
          <Route exact path="/lessonDetails/:id" component={GetLessonDetails} />
          <Route exact path="/updatelesson/:id" component={UpdateLessonDetails} />
          <Route exact path="/scheduler/:id" component={Scheduler} />
          <Route exact path="/admin/testimonials" component={AdminTestimonials} />
          <Route exact path="/admin/testimonials/update/:id" component={TestimonailsUpdate} />
          <Route exact path="/library" component={Library} />
          <Route exact path="/library/page/:pageNumber" component={Library} />
          <Route exact path="/book/:pdfName" component={BookReader} />
          <Route exact path="/details/:id" component={AccountSettings} />
          <Route exact path="/founder" component={Founder} />
          <Route exact path="/admin/rewards" component={Points} />
          <Route exact path="/admin/rewards/page/:pageNumber" component={Points} />
          <Route exact path="/admin/rewards/create" component={CreatePoints} />
          <Route exact path="/addtestimony" component={AddTestimony} />
          <Route exact path="/about/teachers" component={Teachers} />
          <Route exact path="/admin/videos" component={YouTubeVideos} />
          <Route exact path="/admin/video/create" component={CreateVideo} />
          <Route exact path="/publiclibrary" component={PublicLibrary} />
          <Route exact path="/createnotes/:id" component={CreateNotes} />
          <Route exact path="/admin/pruchasedclass" component={PurchasedClass} />
          <Route exact path="/admin/create/purchasedclass" component={CreatePurchasedClass} />
          <Route exact path="/admin/pruchasedclass/page/:pageNumber" component={PurchasedClass} />
          <Route exact path="/admin/speakingassesment/:id" component={ExamSingle} />
          <Route exact path="/admin/speakingassestment/create/:id" component={CreateExam} />
          <Route exact path="/admin/speakingassesment" component={Exam} />
          <Route exact path="/admin/speakingassesment/page/:pageNumber" component={Exam} />
          <Route exact path="/dashboard/teacher/examlist" component={TeacherExamList} />
          <Route exact path="/dashboard/teacher/examlist/create" component={CreateExamTeacher} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
