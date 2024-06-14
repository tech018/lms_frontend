import axios from "axios";
import {
  CREATE_EXAM_FAIL,
  CREATE_EXAM_REQUEST,
  CREATE_EXAM_SUCCESS,
  DELETE_EXAM_FAIL,
  DELETE_EXAM_REQUEST,
  DELETE_EXAM_SUCCESS,
  EXAM_LIST_FAIL,
  EXAM_LIST_REQUEST,
  EXAM_LIST_SUCCESS,
  GET_SINGLE_EXAM_FAIL,
  GET_SINGLE_EXAM_REQUEST,
  GET_SINGLE_EXAM_SUCCESS,
  PUBLIC_EXAM_LIST_REQUEST,
  PUBLIC_EXAM_LIST_SUCCESS,
  PUBLIC_EXAM_LIST_FAIL,
  CREATE_EXAM_PUBLIC_REQUEST,
  CREATE_EXAM_PUBLIC_SUCCESS,
  CREATE_EXAM_PUBLIC_FAIL,
} from "../constants/examConstants";

export const examlist = (keyword, pageNumber) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXAM_LIST_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/exam?keyword=${keyword}&pageNumber=${pageNumber}`,
      config
    );
    dispatch({
      type: EXAM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXAM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//teacher list
export const teacherexamlist =
  (keyword, pageNumber, teacherEmail, pageSize) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PUBLIC_EXAM_LIST_REQUEST,
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
        `${process.env.REACT_APP_BACKEND_URI}/api/exam/public/teacher?keyword=${keyword}&pageNumber=${pageNumber}&teacherEmail=${teacherEmail}&pageSize=${pageSize}`,
        config
      );
      dispatch({
        type: PUBLIC_EXAM_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PUBLIC_EXAM_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//get single route
export const singleexam = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SINGLE_EXAM_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/exam/${id}`,
      config
    );
    dispatch({
      type: GET_SINGLE_EXAM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EXAM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const examdelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_EXAM_REQUEST,
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
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URI}/api/exam/${id}`,
      config
    );
    dispatch({
      type: DELETE_EXAM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EXAM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createexam = (exam) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_EXAM_REQUEST,
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
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/api/exam/${exam.email}`,
      { exam },
      config
    );
    dispatch({
      type: CREATE_EXAM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_EXAM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createteacherexam = (exam) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_EXAM_PUBLIC_REQUEST,
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
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/api/exam/public/${exam.email}`,
      { exam },
      config
    );
    dispatch({
      type: CREATE_EXAM_PUBLIC_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_EXAM_PUBLIC_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
