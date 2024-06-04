import { 
    COUNT_STUDENT_LESSON_FAIL,
    COUNT_STUDENT_LESSON_REQUEST,
    COUNT_STUDENT_LESSON_SUCCESS,
    CREATE_NOTES_FAIL,
    CREATE_NOTES_REQUEST,
    CREATE_NOTES_RESET,
    CREATE_NOTES_SUCCESS,
    FINISHED_LESSON_FAIL,
    FINISHED_LESSON_REQUEST,
    FINISHED_LESSON_SUCCESS,
    GETNEW_LESSON_FAIL,
    GETNEW_LESSON_REQUEST,
    GETNEW_LESSON_SUCCESS,
    LESSONS_CREATE_FAIL, 
    LESSONS_CREATE_REQUEST, 
    LESSONS_CREATE_RESET, 
    LESSONS_CREATE_SUCCESS, 
    LESSONS_DETAILS_FAIL, 
    LESSONS_DETAILS_REQUEST, 
    LESSONS_DETAILS_RESET, 
    LESSONS_DETAILS_SUCCESS, 
    LESSON_DELETE_FAIL, 
    LESSON_DELETE_REQUEST, 
    LESSON_DELETE_SUCCESS, 
    LESSON_DETAILS_FAIL, 
    LESSON_DETAILS_REQUEST,
    LESSON_DETAILS_RESET,
    LESSON_DETAILS_SUCCESS,
    LESSON_TIME_FAIL,
    LESSON_TIME_REQUEST,
    LESSON_TIME_RESET,
    LESSON_TIME_SUCCESS,
    LESSON_UPDATE_FAIL,
    LESSON_UPDATE_NEW_FAIL,
    LESSON_UPDATE_NEW_REQUEST,
    LESSON_UPDATE_NEW_RESET,
    LESSON_UPDATE_NEW_SUCCESS,
    LESSON_UPDATE_REQUEST,
    LESSON_UPDATE_RESET,
    LESSON_UPDATE_SUCCESS,
    ONGOING_LESSON_FAIL,
    ONGOING_LESSON_REQUEST,
    ONGOING_LESSON_SUCCESS
} from '../constants/lessonsConstants'

export const getLessonByIdReducer = (state = { lessons: [], page: {},pages: {} }, action) => {
    switch(action.type){
        case LESSONS_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
                lessons: [],
                page: {},
                pages: {},
            }
        case LESSONS_DETAILS_SUCCESS:
            return {
                loading: false,
                lessons: action.payload.allLessons,
                page: action.payload.page,
                pages: action.payload.pages, 
            }
        case LESSONS_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case LESSONS_DETAILS_RESET:
            return {
                lessons: [],
                page: {},
                pages: {}, 
            }
        default:
            return state
    }
}

export const createNewLessonReducer = (state = { }, action) => {
    switch(action.type){
        case LESSONS_CREATE_REQUEST:
            return {
                loading: true,
            }
        case LESSONS_CREATE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case LESSONS_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case LESSONS_CREATE_RESET:
            return {
               state: {}
            }
        default:
            return state
    }
}

//get lessons by details

export const lessonDetailsReducer = (state = { lesson: {} }, action) => {
    switch(action.type){
        case LESSON_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case LESSON_DETAILS_SUCCESS:
            return {
                loading: false,
                lesson: action.payload
            }
        case LESSON_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case LESSON_DETAILS_RESET:
            return {
                lesson: {}
            }
        default:
            return state
    }
}
//delete lesson
export const lessonDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case LESSON_DELETE_REQUEST:
            return {
                loading: true
            }
        case LESSON_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case LESSON_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const updateNewLessonReducer = (state = { }, action) => {
    switch(action.type){
        case LESSON_UPDATE_NEW_REQUEST:
            return {
                loading: true
            }
        case LESSON_UPDATE_NEW_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case LESSON_UPDATE_NEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case LESSON_UPDATE_NEW_RESET:
            return { state: {} }
        default:
            return state
    }
}

//update lesson

export const updateLessonDetailsReducers = (state = { }, action) => {
    switch(action.type){
        case LESSON_UPDATE_REQUEST:
            return {
                loading: true
            }
        case LESSON_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case LESSON_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case LESSON_UPDATE_RESET:
            return { state: {} }
        default:
            return state
    }
}

export const getTimeScheduleReducer = (state = { timeschedule: [] }, action) => {
    switch(action.type){
        case LESSON_TIME_REQUEST:
            return {
                loading: true,
                ...state,
                timeschedule: []
            }
        case LESSON_TIME_SUCCESS:
            return {
                loading: false,
                timeschedule: action.payload
            }
        case LESSON_TIME_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case LESSON_TIME_RESET:
            return {
                timeschedule: []
            }
        default:
            return state
    }
}

//finished lessons
export const finishedLessonsReducers = (state = { finishedclass: {} }, action) => {
    switch(action.type){
        case FINISHED_LESSON_REQUEST:
            return {
                loading: true,
                finishedclass: {}
            }
        case FINISHED_LESSON_SUCCESS:
            return {
                loading: false,
                finishedclass: action.payload
            }
        case FINISHED_LESSON_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
//on going lessons
export const onGoingLessonsReducers = (state = { ongoingclass: {} }, action) => {
    switch(action.type){
        case ONGOING_LESSON_REQUEST:
            return {
                loading: true,
                ongoingclass: {}
            }
        case ONGOING_LESSON_SUCCESS:
            return {
                loading: false,
                ongoingclass: action.payload
            }
        case ONGOING_LESSON_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

//get new lessons
export const countNewLessonsReducers = (state = { newlesson: {} }, action) => {
    switch(action.type){
        case GETNEW_LESSON_REQUEST:
            return {
                loading: true,
                newlesson: {}
            }
        case GETNEW_LESSON_SUCCESS:
            return {
                loading: false,
                newlesson: action.payload
            }
        case GETNEW_LESSON_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
//count all lessons
export const countAllStudentLessonsReducers = (state = { alllessons: {} }, action) => {
    switch(action.type){
        case COUNT_STUDENT_LESSON_REQUEST:
            return {
                loading: true,
                alllessons: {}
            }
        case COUNT_STUDENT_LESSON_SUCCESS:
            return {
                loading: false,
                alllessons: action.payload
            }
        case COUNT_STUDENT_LESSON_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

//create mew lessons

export const createNewNotesReducers = (state = { }, action) => {
    switch(action.type){
        case CREATE_NOTES_REQUEST:
            return {
                loading: true
            }
        case CREATE_NOTES_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case CREATE_NOTES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_NOTES_RESET:
            return {
                state: {}
            }
        default:
            return state
    }
}