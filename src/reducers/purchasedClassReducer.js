import { 
    PURCHASED_CLASS_BYID_FAIL,
    PURCHASED_CLASS_BYID_REQUEST,
    PURCHASED_CLASS_BYID_SUCCESS,
    PURCHASED_CLASS_FAIL, 
    PURCHASED_CLASS_REQUEST, 
    PURCHASED_CLASS_SUCCESS, 
    PURCHASED_CREATEUPDATE_FAIL, 
    PURCHASED_CREATEUPDATE_REQUEST, 
    PURCHASED_CREATEUPDATE_RESET, 
    PURCHASED_CREATEUPDATE_SUCCESS, 
    PURCHASED_DELETE_FAIL, 
    PURCHASED_DELETE_REQUEST, 
    PURCHASED_DELETE_SUCCESS 
} from "../constants/purchasedClassContants"

export const getAllPurchasedClassReducer = (state = { purchased: [] }, action) => {
    switch(action.type){
        case PURCHASED_CLASS_REQUEST:
            return {
                loading: true,
                ...state,
                purchased: []
            }
        case PURCHASED_CLASS_SUCCESS:
            return {
                loading: false,
                purchased: action.payload.allclass,
                page: action.payload.page,
                pages: action.payload.pages, 
            }
        case PURCHASED_CLASS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
//create or update
export const createUpdatePurchaseClassReducer = (state = { }, action) => {
    switch(action.type){
        case PURCHASED_CREATEUPDATE_REQUEST:
            return {
                loading: true,
            }
        case PURCHASED_CREATEUPDATE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case PURCHASED_CREATEUPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PURCHASED_CREATEUPDATE_RESET:
            return {
                state: {}
            }
        default:
            return state
    }
}

//delete purchased class
export const deletePuchasedClassReducer = (state = { }, action) => {
    switch(action.type){
        case PURCHASED_DELETE_REQUEST:
            return {
                loading: true,
            }
        case PURCHASED_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case PURCHASED_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
//find student purchased class
export const studentPurchasedClassReducer = (state = {  studentclass : {} }, action) => {
    switch(action.type){
        case PURCHASED_CLASS_BYID_REQUEST:
            return {
                loading: true,
                studentclass: {}
            }
        case PURCHASED_CLASS_BYID_SUCCESS:
            return {
                loading: false,
                studentclass: action.payload
            }
        case PURCHASED_CLASS_BYID_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}