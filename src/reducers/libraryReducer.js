import { LIBRARY_LIMIT_FAIL, LIBRARY_LIMIT_REQUEST, LIBRARY_LIMIT_SUCCESS, LIBRARY_LIST_FAIL, LIBRARY_LIST_REQUEST, LIBRARY_LIST_SUCCESS } from "../constants/libraryContants"

export const getLibraryReducer = (state = { books: [] }, action) => {
    switch(action.type){
        case LIBRARY_LIST_REQUEST:
            return {
                loading: true,
                ...state,
                books: []
            }
        case LIBRARY_LIST_SUCCESS:
            return {
                loading: false,
                books: action.payload.allBooks,
                page: action.payload.page,
                pages: action.payload.pages, 
            }
        case LIBRARY_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const getLimitLibraryReducer = (state = { books: [] }, action) => {
    switch(action.type){
        case LIBRARY_LIMIT_REQUEST:
            return {
                loading: true,
                ...state,
                books: []
            }
        case LIBRARY_LIMIT_SUCCESS:
            return {
                loading: false,
                books: action.payload,
            }
        case LIBRARY_LIMIT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}