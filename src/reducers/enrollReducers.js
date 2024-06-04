import { 
    APPLICATION_ORDER_REQUEST,
    APPLICATION_ORDER_SUCCESS,
    APPLICATION_ORDER_FAIL,
    APPLICATION_ORDER_RESET,
    APPLICATION_DETAILS_REQUEST,
    APPLICATION_DETAILS_SUCCESS,
    APPLICATION_DETAILS_FAIL,
    APPLICATION_BYID_RESET,
    APPLICATION_BYID_FAIL,
    APPLICATION_BYID_SUCCESS,
    APPLICATION_DETAILS_RESET,
    ALL_APPLICATION_REQUEST,
    ALL_APPLICATION_SUCCESS,
    ALL_APPLICATION_FAIL,
    APPLICATION_UPDATE_SUCCESS,
    APPLICATION_UPDATE_REQUEST,
    APPLICATION_UPDATE_FAIL,
    APPLICATION_UPDATE_RESET,
    APPLICATION_DELETE_REQUEST,
    APPLICATION_DELETE_SUCCESS,
    APPLICATION_DELETE_FAIL,
    APPLICATION_DELETE_RESET,
    APPLICATION_TEACHER_FAIL,
    APPLICATION_TEACHER_SUCCESS,
    APPLICATION_TEACHER_REQUEST,
    COUNT_ONGOING_REQUEST,
    COUNT_ONGOING_SUCCESS,
    COUNT_ONGOING_FAIL,
    COUNT_FINISHED_REQUEST,
    COUNT_FINISHED_SUCCESS,
    COUNT_FINISHED_FAIL,
    COUNT_ENROLL_STUDENT_REQUEST,
    COUNT_ENROLL_STUDENT_SUCCESS,
    COUNT_ENROLL_STUDENT_FAIL
 } from '../constants/enrollConstants'

 //create course

export const applicationCreateReducer = (state = { }, action) => {
    switch(action.type){
        case APPLICATION_ORDER_REQUEST:
            return {
                loading: true,
                createEnrollItems: { }
            }
        case APPLICATION_ORDER_SUCCESS:
            return {
                success: true,
                loading: false,
            }
        case APPLICATION_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case APPLICATION_ORDER_RESET:
            return {
                createEnrollItems: {}
            }
        default:
            return state
    }
}


//get student application

export const applicationDetailsReducer = (state = { applications: [],page:{},pages:{} }, action) => {
    switch(action.type){
        case APPLICATION_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
                page:{},
                pages:{},
                applications: []
            }
        case APPLICATION_DETAILS_SUCCESS:
            return {
                loading: false,
                applications: action.payload.studentapps,
                page:action.payload.page,
                pages:action.payload.pages,
            }
        case APPLICATION_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case APPLICATION_DETAILS_RESET:
            return {
                applications: [],
                page:{},
                pages:{},
            }
        default:
            return state
    }
}

//get details app by id

export const applicationByIdReducer = (state = { applicant: { user: {}, course: {} } }, action) => {
    switch(action.type){
        case APPLICATION_DETAILS_REQUEST:
            return {
                loading: true,
                applicant: {}
            }
        case APPLICATION_BYID_SUCCESS:
            return {
                loading: false,
                applicant: action.payload
            }
        case APPLICATION_BYID_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case APPLICATION_BYID_RESET:
            return {
                applicant: {}
            }
        default:
            return state
    }
}

//get student application

export const getAllApplicationReducers = (state = { allapplication: [] }, action) => {
    switch(action.type){
        case ALL_APPLICATION_REQUEST:
            return {
                loading: true,
                ...state,
                allapplication: []
            }
        case ALL_APPLICATION_SUCCESS:
            return {
                loading: false,
                allapplication: action.payload.allapp,
                pages: action.payload.pages,
                page: action.payload.page,
            }
        case ALL_APPLICATION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

//update application admin area

export const updateAppReducer = (state = { }, action) => {
    switch(action.type){
        case APPLICATION_UPDATE_REQUEST:
            return {
                loading: true
            }
        case APPLICATION_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case APPLICATION_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case APPLICATION_UPDATE_RESET:
            return { state: {} }
        default:
            return state
    }
}
//DELETE APPLICATION
export const applicationDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case APPLICATION_DELETE_REQUEST:
            return {
                loading: true
            }
        case APPLICATION_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case APPLICATION_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case APPLICATION_DELETE_RESET: 
            return {
                state: {}
            }
        default:
            return state
    }
}

//get teacher application details


export const getTeacherAppReducers = (state = { teacherapp: [] }, action) => {
    switch(action.type){
        case APPLICATION_TEACHER_REQUEST:
            return {
                loading: true,
                ...state,
                teacherapp: []
            }
        case APPLICATION_TEACHER_SUCCESS:
            return {
                loading: false,
                teacherapp: action.payload.teachersAp,
                pages: action.payload.pages,
                page: action.payload.page,
            }
        case APPLICATION_TEACHER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

//count on going class
export const ongoingClassReducers = (state = { ongoingclass: {} }, action) => {
    switch(action.type){
        case COUNT_ONGOING_REQUEST:
            return {
                loading: true,
                ongoingclass: { }
            }
        case COUNT_ONGOING_SUCCESS:
            return {
                ongoingclass: action.payload,
                loading: false,
            }
        case COUNT_ONGOING_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

//count on FINISHED class
export const finishedClassReducers = (state = { finishedclass: {} }, action) => {
    switch(action.type){
        case COUNT_FINISHED_REQUEST:
            return {
                loading: true,
                finishedclass: {}
            }
        case COUNT_FINISHED_SUCCESS:
            return {
                finishedclass: action.payload,
                loading: false,
            }
        case COUNT_FINISHED_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

//count enrolled course
export const countEnrolledCourse = (state = { countenroll: {} }, action) => {
    switch(action.type){
        case COUNT_ENROLL_STUDENT_REQUEST:
            return {
                loading: true,
                countenroll: {}
            }
        case COUNT_ENROLL_STUDENT_SUCCESS:
            return {
                countenroll: action.payload,
                loading: false,
            }
        case COUNT_ENROLL_STUDENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
