import { CREATE_VIDEO_FAIL, CREATE_VIDEO_REQUEST, CREATE_VIDEO_RESET, CREATE_VIDEO_SUCCESS, DELETE_VIDEO_FAIL, DELETE_VIDEO_REQUEST, DELETE_VIDEO_SUCCESS, VIDEOS_FAIL, VIDEOS_REQUEST, VIDEOS_SUCCESS } from "../constants/videoContants"

export const youtubeVideosReducers = (state = { videos: [] }, action) => {
    switch(action.type){
        case VIDEOS_REQUEST:
            return {
                loading: true,
                ...state,
                videos: [],
            }
        case VIDEOS_SUCCESS:
            return {
                loading: false,
                videos: action.payload
            }
        case VIDEOS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

//CREATE VIDEO
export const createVideoReducers = (state = {}, action) => {
    switch(action.type){
        case CREATE_VIDEO_REQUEST:
            return {
                loading: true,
            }
        case CREATE_VIDEO_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case CREATE_VIDEO_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_VIDEO_RESET:
            return {
                state: {}
            }
        default:
            return state
    }
}

//delete video
export const deleteVideoReducers = (state = {}, action) => {
    switch(action.type){
        case DELETE_VIDEO_REQUEST:
            return {
                loading: true,
            }
        case DELETE_VIDEO_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case DELETE_VIDEO_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
