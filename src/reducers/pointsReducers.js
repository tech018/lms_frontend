import { 
    CREATE_POINTS_FAIL, 
    CREATE_POINTS_REQUEST, 
    CREATE_POINTS_SUCCESS, 
    CREATE_POINTS_RESET,
    POINTS_LIST_FAIL, 
    POINTS_LIST_REQUEST, 
    POINTS_LIST_SUCCESS,
    DELETE_POINTS_FAIL,
    DELETE_POINTS_SUCCESS,
    DELETE_POINTS_REQUEST,
    STUDENT_POINTS_REQUEST,
    STUDENT_POINTS_SUCCESS,
    STUDENT_POINTS_FAIL,
    STUDENT_POINTS_RESET,
} from "../constants/pointsContants"
//GET ALL POINTS
export const getPointsReducer = (state = { points: [] }, action) => {
    switch(action.type){
        case POINTS_LIST_REQUEST:
            return {
                loading: true,
                ...state,
                points: []
            }
        case POINTS_LIST_SUCCESS:
            return {
                loading: false,
                points: action.payload.points,
                page: action.payload.page,
                pages: action.payload.pages, 
            }
        case POINTS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
//CREATE NEW POINTS
export const createPointsReducer = (state = {}, action) => {
    switch(action.type){
        case CREATE_POINTS_REQUEST:
            return {
                loading: true,
            }
        case CREATE_POINTS_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case CREATE_POINTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_POINTS_RESET:
            return {
                state: {}
            }
        default:
            return state
    }
}

//DELETE POINTS
export const deletePointsReducer = (state = {}, action) => {
    switch(action.type){
        case DELETE_POINTS_REQUEST:
            return {
                loading: true
            }
        case DELETE_POINTS_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case DELETE_POINTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
//GET STUDENT POINTS
export const getStudentPointsReducer = (state = { studpoints: {} }, action) => {
    switch(action.type){
        case STUDENT_POINTS_REQUEST:
            return {
                loading: true,
                studpoints: {}
            }
        case STUDENT_POINTS_SUCCESS:
            return {
                loading: false,
                studpoints: action.payload
            }
        case STUDENT_POINTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case STUDENT_POINTS_RESET: 
            return {
                studpoints: {}
            }
        default:
            return state
    }
}