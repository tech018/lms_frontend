import axios from "axios";
import {
  LIBRARY_LIMIT_FAIL,
  LIBRARY_LIMIT_REQUEST,
  LIBRARY_LIMIT_SUCCESS,
  LIBRARY_LIST_FAIL,
  LIBRARY_LIST_REQUEST,
  LIBRARY_LIST_SUCCESS,
} from "../constants/libraryContants";
export const getBooks =
  (keyword, pageNumber, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: LIBRARY_LIST_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/api/library?keyword=${keyword}&pageNumber=${pageNumber}&bookcat=${category}`,
        config
      );
      dispatch({
        type: LIBRARY_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LIBRARY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getlimitbooks = (limit) => async (dispatch) => {
  try {
    dispatch({
      type: LIBRARY_LIMIT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/api/library/getbooks/${limit}`,
      config
    );
    dispatch({
      type: LIBRARY_LIMIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIBRARY_LIMIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
