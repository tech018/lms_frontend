import { 
    TESTIMONIAL_LIST_REQUEST,
    TESTIMONIAL_LIST_SUCCESS,
    TESTIMONIAL_LIST_FAIL,
    TESTIMONIAL_DETAILS_REQUEST,
    TESTIMONIAL_DETAILS_SUCCESS,
    TESTIMONIAL_DETAILS_FAIL,
    TESTIMONIAL_DETAILS_RESET,
    TESTIMONIAL_UPDATE_FAIL,
    TESTIMONIAL_UPDATE_SUCCESS,
    TESTIMONIAL_UPDATE_REQUEST,
    TESTIMONIAL_UPDATE_RESET,
    TESTIMONIAL_DELETE_SUCCESS,
    TESTIMONIAL_DELETE_REQUEST,
    TESTIMONIAL_DELETE_FAIL,
    TESTIMONIAL_CREATE_REQUEST,
    TESTIMONIAL_CREATE_SUCCESS,
    TESTIMONIAL_CREATE_FAIL,
    TESTIMONIAL_CREATE_RESET
 } from '../constants/testimonialConstants'

 export const testimonialListReducer = (state = {testimonials: [] }, action ) => {
     switch(action.type){
        case TESTIMONIAL_LIST_REQUEST:
            return {
                loading: true,
                testimonials: []
            }
        case TESTIMONIAL_LIST_SUCCESS:
            return {
                loading: false,
                testimonials: action.payload.testimonials,
            }
        case TESTIMONIAL_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
     }
 }

 //get details

 export const testimonialsDetailsReducer = (state = { testimony: {} }, action) => {
    switch(action.type){
        case TESTIMONIAL_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case TESTIMONIAL_DETAILS_SUCCESS:
            return {
                loading: false,
                testimony: action.payload
            }
        case TESTIMONIAL_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case TESTIMONIAL_DETAILS_RESET:
            return {
                testimony: {}
            }
        default:
            return state
    }
}

//update details
export const updateTestimonialsReducer = (state = { }, action) => {
    switch(action.type){
        case TESTIMONIAL_UPDATE_REQUEST:
            return {
                loading: true
            }
        case TESTIMONIAL_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case TESTIMONIAL_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case TESTIMONIAL_UPDATE_RESET:
            return {
                state: {}
            }
        default:
            return state
    }
}

//delete testimonials
export const testimonialsDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case TESTIMONIAL_DELETE_REQUEST:
            return {
                loading: true
            }
        case TESTIMONIAL_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case TESTIMONIAL_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
//create testimony
export const createTestimonyReducer = (state = { }, action ) => {
    switch(action.type){
       case TESTIMONIAL_CREATE_REQUEST:
           return {
               loading: true,
           }
       case TESTIMONIAL_CREATE_SUCCESS:
           return {
               loading: false,
               success:true,
           }
       case TESTIMONIAL_CREATE_FAIL:
           return {
               loading: false,
               error: action.payload
           }
        case TESTIMONIAL_CREATE_RESET:
            return {
                state : {}
            }
       default:
           return state
    }
}