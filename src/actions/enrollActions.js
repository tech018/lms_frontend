import axios from "axios";
//cart codes
import {
  APPLICATION_ORDER_REQUEST,
  APPLICATION_ORDER_SUCCESS,
  APPLICATION_ORDER_FAIL,
  APPLICATION_DETAILS_REQUEST,
  APPLICATION_DETAILS_SUCCESS,
  APPLICATION_DETAILS_FAIL,
  APPLICATION_BYID_REQUEST,
  APPLICATION_BYID_SUCCESS,
  APPLICATION_BYID_FAIL,
  ALL_APPLICATION_REQUEST,
  ALL_APPLICATION_SUCCESS,
  ALL_APPLICATION_FAIL,
  APPLICATION_UPDATE_REQUEST,
  APPLICATION_UPDATE_SUCCESS,
  APPLICATION_UPDATE_FAIL,
  APPLICATION_DELETE_REQUEST,
  APPLICATION_DELETE_SUCCESS,
  APPLICATION_DELETE_FAIL,
  APPLICATION_TEACHER_REQUEST,
  APPLICATION_TEACHER_SUCCESS,
  APPLICATION_TEACHER_FAIL,
  COUNT_ONGOING_REQUEST,
  COUNT_ONGOING_SUCCESS,
  COUNT_ONGOING_FAIL,
  COUNT_FINISHED_REQUEST,
  COUNT_FINISHED_SUCCESS,
  COUNT_FINISHED_FAIL,
  COUNT_ENROLL_STUDENT_REQUEST,
  COUNT_ENROLL_STUDENT_SUCCESS,
  COUNT_ENROLL_STUDENT_FAIL,
} from "../constants/enrollConstants";

//create application
export const createApplication =
  (courseId, payment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPLICATION_ORDER_REQUEST,
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
        `${process.env.REACT_APP_BACKEND_URI}/api/enroll/${courseId}`,
        { payment },
        config
      );

      dispatch({
        type: APPLICATION_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPLICATION_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//get all details

export const detailsapplication =
  (id, pageNumber) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPLICATION_DETAILS_REQUEST,
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
        `${process.env.REACT_APP_BACKEND_URI}/api/enroll/${id}?pageNumber=${pageNumber}`,
        config
      );
      dispatch({
        type: APPLICATION_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPLICATION_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//get by id details
export const detailsById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPLICATION_BYID_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/enroll/details/${id}`,
      config
    );
    dispatch({
      type: APPLICATION_BYID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPLICATION_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//get all applications admin area
export const getAllApplicationsAdmin =
  (keyword, pageNumber) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ALL_APPLICATION_REQUEST,
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
        `${process.env.REACT_APP_BACKEND_URI}/api/enroll?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );
      dispatch({
        type: ALL_APPLICATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_APPLICATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//update application
export const updateApplicant =
  (courseId, teacherId, isApproved, isPaid, isFinished) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: APPLICATION_UPDATE_REQUEST,
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

      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URI}/api/enroll/${courseId}`,
        { teacherId, isApproved, isPaid, isFinished },
        config
      );

      dispatch({
        type: APPLICATION_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPLICATION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//delete application

export const deleteApplicationAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPLICATION_DELETE_REQUEST,
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

    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URI}/api/enroll/${id}`,
      config
    );

    dispatch({
      type: APPLICATION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: APPLICATION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get teacher application details

export const getAllTeacherApp =
  (teacherId, pageNumber) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPLICATION_TEACHER_REQUEST,
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
        `${process.env.REACT_APP_BACKEND_URI}/api/enroll/teacher/${teacherId}?pageNumber=${pageNumber}`,
        config
      );
      dispatch({
        type: APPLICATION_TEACHER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPLICATION_TEACHER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const countAllOngoingClass = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNT_ONGOING_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/enroll/ongoing/${id}`,
      config
    );
    dispatch({
      type: COUNT_ONGOING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNT_ONGOING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const countAllFinishedClass = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNT_FINISHED_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/enroll/finished/${id}`,
      config
    );
    dispatch({
      type: COUNT_FINISHED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNT_FINISHED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const countCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNT_ENROLL_STUDENT_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/enroll/studentcourse/${id}`,
      config
    );
    dispatch({
      type: COUNT_ENROLL_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNT_ENROLL_STUDENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
