import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { 
    testimonialListReducer,
    testimonialsDetailsReducer,
    updateTestimonialsReducer,
    testimonialsDeleteReducer,
    createTestimonyReducer
 } from './reducers/testimonialsReducer' 
import { 
    announceListReducer,
    announcementCreateReducer,
    announceAdminReducer,
    announcementDeleteReducer,
    announcementUpdateReducer
 } from './reducers/announcementReducer'
import { 
    registerReducer, 
    loginReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userDetailsReducer,
    TeacherListReducer,
    completeRegistrationReducer,
    forgorPasswordReducer,
    resetPasswordReducer,
    userInfoReducers,
    userUpdatePhotoReducer,
    userUpdateImageReducer,
 } from './reducers/userReducer'
import { 
    courseListReducer, 
    courseDetailsReducer,
    courseCreateReducer,
    courseDeleteReducer, 
    courseUpdateReducer,
} from './reducers/courseReducer'

import {
    applicationCreateReducer,
    applicationDetailsReducer,
    applicationByIdReducer,
    getAllApplicationReducers,
    updateAppReducer,
    applicationDeleteReducer,
    getTeacherAppReducers,
    ongoingClassReducers,
    finishedClassReducers,
    countEnrolledCourse,
} from './reducers/enrollReducers'

import { createNewLessonReducer, 
    getLessonByIdReducer,
    lessonDetailsReducer,
    lessonDeleteReducer,
    updateNewLessonReducer,
    updateLessonDetailsReducers,
    getTimeScheduleReducer,
    finishedLessonsReducers,
    onGoingLessonsReducers,
    countNewLessonsReducers,
    countAllStudentLessonsReducers,
    createNewNotesReducers
} from './reducers/lessonsReducer'

import { 
    getLibraryReducer,
    getLimitLibraryReducer
} from './reducers/libraryReducer'

import { 
    getPointsReducer,
    createPointsReducer,
    deletePointsReducer,
    getStudentPointsReducer
 } from './reducers/pointsReducers'

 import { youtubeVideosReducers,createVideoReducers,deleteVideoReducers } from './reducers/videosReducers'

 import { 
    getAllPurchasedClassReducer,
    createUpdatePurchaseClassReducer,
    deletePuchasedClassReducer,
    studentPurchasedClassReducer
 } from './reducers/purchasedClassReducer'

 import {
    examListReducers,
    deleteExamReducers,
    getOneExamReducers,
    createExamReducers,
    teachersExamListReducers,
    createTeacherExamReducers
 } from './reducers/examReducers'

const reducer = combineReducers({
    testimonialList: testimonialListReducer,
    userRegister: registerReducer,
    userLogin: loginReducer,
    userList:userListReducer,
    forgorPassword:forgorPasswordReducer,
    resetPassword:resetPasswordReducer,
    teacherList: TeacherListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    userDetails:userDetailsReducer,
    userInfoDetails:userInfoReducers,
    userUpdatePhoto:userUpdatePhotoReducer,
    userUpdateImage:userUpdateImageReducer,
    completeRegistration:completeRegistrationReducer,
    announceList: announceListReducer,
    announcementCreate:announcementCreateReducer,   
    announceAdmin:announceAdminReducer,
    announcementDelete:announcementDeleteReducer,
    announcementUpdate:announcementUpdateReducer,
    courseList: courseListReducer,
    courseDetail: courseDetailsReducer,
    createCourse: courseCreateReducer,
    courseDelete:courseDeleteReducer,
    courseUpdate:courseUpdateReducer,
    applicationCreate:applicationCreateReducer,
    applicationDetails:applicationDetailsReducer,
    applicationById:applicationByIdReducer,
    getAllApplication:getAllApplicationReducers,
    updateApp:updateAppReducer,
    applicationDelete:applicationDeleteReducer,
    ongoingClass:ongoingClassReducers,
    finishedClass:finishedClassReducers,
    getTeacherApp:getTeacherAppReducers,
    createNewLesson:createNewLessonReducer,
    getLessonById:getLessonByIdReducer,
    lessonDetails:lessonDetailsReducer,
    lessonDelete:lessonDeleteReducer,
    finishedLessons:finishedLessonsReducers,
    onGoingLessons:onGoingLessonsReducers,
    countNewLessons:countNewLessonsReducers,
    updateNewLesson:updateNewLessonReducer,
    updateLessonDetails:updateLessonDetailsReducers,
    getTimeSchedule:getTimeScheduleReducer,
    testimonialsDetails:testimonialsDetailsReducer,
    updateTestimonials:updateTestimonialsReducer,
    testimonialsDelete:testimonialsDeleteReducer,
    createTestimony:createTestimonyReducer,
    getLibrary:getLibraryReducer,
    getPoints:getPointsReducer,
    createPoints:createPointsReducer,
    deletePoints:deletePointsReducer,
    getStudentPoints:getStudentPointsReducer,
    youtubeVideos:youtubeVideosReducers,
    createVideo:createVideoReducers,
    deleteVideo:deleteVideoReducers,
    getLimitLibrary:getLimitLibraryReducer,
    countEnrolled:countEnrolledCourse,
    countAllStudentLessons:countAllStudentLessonsReducers,
    createNewNotes:createNewNotesReducers,
    getAllPurchased:getAllPurchasedClassReducer,
    createUpdatePurchaseClass:createUpdatePurchaseClassReducer,
    deletePuchasedClass:deletePuchasedClassReducer,
    studentPurchasedClass:studentPurchasedClassReducer,
    examList:examListReducers,
    deleteExam:deleteExamReducers,
    getOneExam:getOneExamReducers,
    createExam:createExamReducers,
    teachersExamList:teachersExamListReducers,
    createTeacherExam:createTeacherExamReducers,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))
)


export default store;