import {
    COMPLETE_REG_REQUEST,
    USER_REGISTRATION_FAIL,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTRATION_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    USER_DETAILS_RESET,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_REQUEST,
    TEACHER_FAIL,
    TEACHER_SUCCESS,
    TEACHER_REQUEST,
    USER_REGISTRATION_SUCCESS,
    COMPLETE_REG_SUCCESS,
    COMPLETE_REG_FAIL,
    COMPLETE_REG_RESET,
    USER_REGISTRATION_REQUEST,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    FORGOT_PASSWORD_RESET,
    USER_LOGIN_RESET,
    CHECK_USER_DETAILS_REQUEST,
    CHECK_USER_DETAILS_FAIL,
    CHECK_USER_DETAILS_SUCCESS,
    CHECK_USER_DETAILS_RESET,
    UPDATE_USER_PHOTO_REQUEST,
    UPDATE_USER_PHOTO_SUCCESS,
    UPDATE_USER_PHOTO_FAIL,
    UPDATE_USER_PHOTO_RESET,
    UPDATE_USER_IMAGE_SUCCESS,
    UPDATE_USER_IMAGE_REQUEST,
    UPDATE_USER_IMAGE_FAIL
} from '../constants/userContants'

export const registerReducer = (state = { registration: {} }, action) => {
    switch(action.type){
        case USER_REGISTRATION_REQUEST:
            return {
                loading: true
            }
        case USER_REGISTRATION_SUCCESS:
            return {
                loading: false,
                registration: action.payload
            }
        case USER_REGISTRATION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_REGISTRATION_RESET:
            return {
                registration: {}
            }
        default:
            return state
    }
}

export const completeRegistrationReducer = (state = { }, action) => {
    switch(action.type){
        case COMPLETE_REG_REQUEST:
            return {
                loading: true
            }
        case COMPLETE_REG_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case COMPLETE_REG_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case COMPLETE_REG_RESET:
            return {
                state : {}
            }
        default:
            return state
    }
}


export const loginReducer = (state = {}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}
        case USER_LOGIN_RESET: {
            return {
               state: {}
            }
        }
        default:
            return state
    }
}

//admin
export const userListReducer = (state = {users: [] }, action ) => {
    switch(action.type){
       case USER_LIST_REQUEST:
           return {
               loading: true,
               users: [ ]
           }
       case USER_LIST_SUCCESS:
           return {
               loading: false,
               users: action.payload.users,
               pages: action.payload.pages,
               page: action.payload.page,
           }
       case USER_LIST_FAIL:
           return {
               loading: false,
               error: action.payload
           }
       default:
           return state
    }
}
//user delete
//delete announcement
export const userDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {
                loading: true
            }
        case USER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case USER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
//update user
//update announcement
export const userUpdateReducer = (state = { updateUser: {} }, action) => {
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {
                loading: true
            }
        case USER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                updateUser: action.payload
            }
        case USER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_UPDATE_RESET:
            return { updateUser: {} }
        default:
            return state
    }
}

//get course by id
 export const userDetailsReducer = (state = { user: {} }, action) => {
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {
                loading: true,
                user:{}
            }
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_DETAILS_RESET:
            return {
                user: {}
            }
        default:
            return state
    }
}

//get teacher
export const TeacherListReducer = (state = {teacher: [] }, action ) => {
    switch(action.type){
       case TEACHER_REQUEST:
           return {
               loading: true,
               ...state,
               teacher: []
           }
       case TEACHER_SUCCESS:
           return {
               loading: false,
               teacher: action.payload
              
           }
       case TEACHER_FAIL:
           return {
               loading: false,
               error: action.payload
           }
       default:
           return state
    }
}

//forgot password

export const forgorPasswordReducer = (state = { forgotPass : {} }, action) => {
    switch(action.type){
        case FORGOT_PASSWORD_REQUEST:
            return {
                loading: true,
                forgotPass : {}
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                loading: false,
                forgotPass : action.payload
            }
        case FORGOT_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case FORGOT_PASSWORD_RESET: 
            return {
                forgotPass: {}
            }
        default:
            return state
    }
}

//reset password

export const resetPasswordReducer = (state = { }, action) => {
    switch(action.type){
        case RESET_PASSWORD_REQUEST:
            return {
                loading: true,
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                success:true
            }
        case RESET_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

//check details

export const userInfoReducers = (state = { userdetails: {} }, action) => {
    switch(action.type){
        case CHECK_USER_DETAILS_REQUEST:
            return {
                loading: true,
                userdetails:{}
            }
        case CHECK_USER_DETAILS_SUCCESS:
            return {
                loading: false,
                userdetails: action.payload
            }
        case CHECK_USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CHECK_USER_DETAILS_RESET:
            return {
                userdetails: {}
            }
        default:
            return state
    }
}
//update photo
export const userUpdatePhotoReducer = (state = { userpicture: {} }, action) => {
    switch(action.type){
        case UPDATE_USER_PHOTO_REQUEST:
            return {
                loading: true,
                ...state,
                userpicture: {}
            }
        case UPDATE_USER_PHOTO_SUCCESS:
            return {
                loading: false,
                userpicture: action.payload
            }
        case UPDATE_USER_PHOTO_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_USER_PHOTO_RESET:
            return {
                state: {}
            }
        default:
            return state
    }
}

export const userUpdateImageReducer = (state = { }, action) => {
    switch(action.type){
        case UPDATE_USER_IMAGE_REQUEST:
            return {
                loading: true,
            }
        case UPDATE_USER_IMAGE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case UPDATE_USER_IMAGE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}