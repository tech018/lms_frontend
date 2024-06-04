import { 
    CREATE_EXAM_FAIL,
    CREATE_EXAM_REQUEST,
    CREATE_EXAM_RESET,
    CREATE_EXAM_SUCCESS,
    DELETE_EXAM_FAIL,
    DELETE_EXAM_REQUEST,
    DELETE_EXAM_RESET,
    DELETE_EXAM_SUCCESS,
    EXAM_LIST_FAIL,
    EXAM_LIST_REQUEST, 
    EXAM_LIST_SUCCESS, 
    GET_SINGLE_EXAM_FAIL, 
    GET_SINGLE_EXAM_REQUEST,
    GET_SINGLE_EXAM_RESET,
    GET_SINGLE_EXAM_SUCCESS,
    PUBLIC_EXAM_LIST_FAIL,
    PUBLIC_EXAM_LIST_REQUEST,
    PUBLIC_EXAM_LIST_SUCCESS,
    CREATE_EXAM_PUBLIC_REQUEST,
    CREATE_EXAM_PUBLIC_SUCCESS,
    CREATE_EXAM_PUBLIC_RESET,
    CREATE_EXAM_PUBLIC_FAIL,
} from "../constants/examConstants"

export const examListReducers = (state = {exams: [] }, action ) => {
    switch(action.type){
       case EXAM_LIST_REQUEST:
           return {
               loading: true,
               ...state,
               exams: [],
           }
       case EXAM_LIST_SUCCESS:
           return {
               loading: false,
               exams: action.payload.allexams,
               pages: action.payload.pages,
               page:action.payload.page,
           }
       case EXAM_LIST_FAIL:
           return {
               loading: false,
               error: action.payload
           }
       default:
           return state
    }
}

export const deleteExamReducers = (state = {examDelete: {} }, action ) => {
    switch(action.type){
       case DELETE_EXAM_REQUEST:
           return {
               loading: true,
               examDelete: {},
           }
       case DELETE_EXAM_SUCCESS:
           return {
               loading: false,
               examDelete: action.payload,
           }
       case DELETE_EXAM_FAIL:
           return {
               loading: false,
               error: action.payload
           }
       case DELETE_EXAM_RESET:
           return {
            examDelete: {}
           }
       default:
           return state
    }
}

export const getOneExamReducers = (state = {examsingle: {} }, action ) => {
    switch(action.type){
       case GET_SINGLE_EXAM_REQUEST:
           return {
               loading: true,
               examsingle: {},
           }
       case GET_SINGLE_EXAM_SUCCESS:
           return {
               loading: false,
               examsingle: action.payload,
           }
       case GET_SINGLE_EXAM_FAIL:
           return {
               loading: false,
               error: action.payload
           }
       case GET_SINGLE_EXAM_RESET:
           return {
            state: {}
           }
       default:
           return state
    }
}

export const createExamReducers = (state = {exam: {} }, action ) => {
    switch(action.type){
       case CREATE_EXAM_REQUEST:
           return {
               loading: true,
               success:false,
               exam: {},
           }
       case CREATE_EXAM_SUCCESS:
           return {
               loading: false,
               success: true,
               exam: action.payload,
           }
       case CREATE_EXAM_FAIL:
           return {
               loading: false,
               error: action.payload
           }
       case CREATE_EXAM_RESET:
           return {
               exam: {}
           }
       default:
           return state
    }
}

export const teachersExamListReducers = (state = {exams: [] }, action ) => {
    switch(action.type){
       case PUBLIC_EXAM_LIST_REQUEST:
           return {
               loading: true,
               ...state,
               exams: [],
           }
       case PUBLIC_EXAM_LIST_SUCCESS:
           return {
               loading: false,
               exams: action.payload.allexams,
               pages: action.payload.pages,
               page:action.payload.page,
           }
       case PUBLIC_EXAM_LIST_FAIL:
           return {
               loading: false,
               error: action.payload
           }
       default:
           return state
    }
}


export const createTeacherExamReducers = (state = {exam: {} }, action ) => {
    switch(action.type){
       case CREATE_EXAM_PUBLIC_REQUEST:
           return {
               loading: true,
               success:false,
               exam: {},
           }
       case CREATE_EXAM_PUBLIC_SUCCESS:
           return {
               loading: false,
               success: true,
               exam: action.payload,
           }
       case CREATE_EXAM_PUBLIC_FAIL:
           return {
               loading: false,
               error: action.payload
           }
       case CREATE_EXAM_PUBLIC_RESET:
           return {
               exam: {}
           }
       default:
           return state
    }
}