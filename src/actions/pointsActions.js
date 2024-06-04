import axios from "axios";
import {
  CREATE_POINTS_FAIL,
  CREATE_POINTS_REQUEST,
  CREATE_POINTS_SUCCESS,
  DELETE_POINTS_FAIL,
  DELETE_POINTS_REQUEST,
  DELETE_POINTS_SUCCESS,
  POINTS_LIST_FAIL,
  POINTS_LIST_REQUEST,
  POINTS_LIST_SUCCESS,
  STUDENT_POINTS_REQUEST,
  STUDENT_POINTS_SUCCESS,
  STUDENT_POINTS_FAIL,
} from "../constants/pointsContants";
//GET ALL POINTS ACTIONS
export const getAllPoints = (pageNumber) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POINTS_LIST_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/points?pageNumber=${pageNumber}`,
      config
    );
    dispatch({
      type: POINTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POINTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//CREATE NEW OR UPDATE POINTS
export const createorupdatepoints =
  (studentID, points, message, studentEmail, subject) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_POINTS_REQUEST,
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
        `${process.env.REACT_APP_BACKEND_URI}/api/points/${studentID}`,
        { points, message, studentEmail, subject },
        config
      );

      dispatch({
        type: CREATE_POINTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_POINTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//DELETE POINTS
export const deletepoints = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_POINTS_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/points/${id}`,
      config
    );

    dispatch({
      type: DELETE_POINTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_POINTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//GET STUDENT POINTS
export const studentpoints = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_POINTS_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/points/${id}`,
      config
    );

    dispatch({
      type: STUDENT_POINTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_POINTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
