import { 
    ANNOUNCEMENT_LIST_REQUEST,
    ANNOUNCEMENT_LIST_SUCCESS,
    ANNOUNCEMENT_LIST_FAIL,
    ANNOUNCEMENT_CREATE_RESET,
    ANNOUNCEMENT_CREATE_FAIL,
    ANNOUNCEMENT_CREATE_SUCCESS,
    ANNOUNCEMENT_CREATE_REQUEST,
    ANNOUNCEMENT_ADMIN_REQUEST,
    ANNOUNCEMENT_ADMIN_SUCCESS,
    ANNOUNCEMENT_ADMIN_FAIL,
    ANNOUNCEMENT_UPDATE_RESET,
    ANNOUNCEMENT_UPDATE_FAIL,
    ANNOUNCEMENT_UPDATE_SUCCESS,
    ANNOUNCEMENT_UPDATE_REQUEST,
    ANNOUNCEMENT_DELETE_FAIL,
    ANNOUNCEMENT_DELETE_SUCCESS,
    ANNOUNCEMENT_DELETE_REQUEST,
 } from '../constants/announcementContants'

 export const announceListReducer = (state = {announcement: [] }, action ) => {
     switch(action.type){
        case ANNOUNCEMENT_LIST_REQUEST:
            return {
                loading: true,
                announcement: []
            }
        case ANNOUNCEMENT_LIST_SUCCESS:
            return {
                loading: false,
                announcement: action.payload.announcement,
            }
        case ANNOUNCEMENT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
     }
 }
 //create ANNOUNCEMENT

export const announcementCreateReducer = (state = { announcementCreated: {} }, action) => {
    switch(action.type){
        case ANNOUNCEMENT_CREATE_REQUEST:
            return {
                loading: true,
                announcementCreated: {}
            }
        case ANNOUNCEMENT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                announcementCreated: action.payload
            }
        case ANNOUNCEMENT_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ANNOUNCEMENT_CREATE_RESET:
            return {
                announcementCreated: {}
            }
        default:
            return state
    }
}
//admin
export const announceAdminReducer = (state = {adminAnnounce: [] }, action ) => {
    switch(action.type){
       case ANNOUNCEMENT_ADMIN_REQUEST:
           return {
               loading: true,
               adminAnnounce: []
           }
       case ANNOUNCEMENT_ADMIN_SUCCESS:
           return {
               loading: false,
               adminAnnounce: action.payload.announcements,
               pages: action.payload.pages,
               page: action.payload.page
           }
       case ANNOUNCEMENT_ADMIN_FAIL:
           return {
               loading: false,
               error: action.payload
           }
       default:
           return state
    }
}

//delete announcement
export const announcementDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case ANNOUNCEMENT_DELETE_REQUEST:
            return {
                loading: true
            }
        case ANNOUNCEMENT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ANNOUNCEMENT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

//update announcement
export const announcementUpdateReducer = (state = { announceupdate: {} }, action) => {
    switch(action.type){
        case ANNOUNCEMENT_UPDATE_REQUEST:
            return {
                loading: true
            }
        case ANNOUNCEMENT_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                announceupdate: action.payload
            }
        case ANNOUNCEMENT_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ANNOUNCEMENT_UPDATE_RESET:
            return { announceupdate: {} }
        default:
            return state
    }
}
