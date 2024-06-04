import axios from "axios";

import {
  ANNOUNCEMENT_LIST_REQUEST,
  ANNOUNCEMENT_LIST_SUCCESS,
  ANNOUNCEMENT_LIST_FAIL,
  ANNOUNCEMENT_CREATE_REQUEST,
  ANNOUNCEMENT_CREATE_SUCCESS,
  ANNOUNCEMENT_CREATE_FAIL,
  ANNOUNCEMENT_ADMIN_REQUEST,
  ANNOUNCEMENT_ADMIN_SUCCESS,
  ANNOUNCEMENT_ADMIN_FAIL,
  ANNOUNCEMENT_UPDATE_FAIL,
  ANNOUNCEMENT_UPDATE_SUCCESS,
  ANNOUNCEMENT_UPDATE_REQUEST,
  ANNOUNCEMENT_DELETE_FAIL,
  ANNOUNCEMENT_DELETE_SUCCESS,
  ANNOUNCEMENT_DELETE_REQUEST,
} from "../constants/announcementContants";

export const listAnnounce = () => async (dispatch) => {
  try {
    dispatch({
      type: ANNOUNCEMENT_LIST_REQUEST,
    });
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/api/announcement`
    );
    dispatch({
      type: ANNOUNCEMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//create ANNOUNCEMENT admin
export const createdAnnouncement = (announce) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANNOUNCEMENT_CREATE_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/announcement`,
      { announce },
      config
    );

    dispatch({
      type: ANNOUNCEMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//get all announcement admin area
export const adminlistAnnounce =
  (keyword = "", pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ANNOUNCEMENT_ADMIN_REQUEST,
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
        `${process.env.REACT_APP_BACKEND_URI}/api/announcement/admin?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );
      dispatch({
        type: ANNOUNCEMENT_ADMIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ANNOUNCEMENT_ADMIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//delete course
export const deleteAnnouncement = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANNOUNCEMENT_DELETE_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/announcement/${id}`,
      config
    );

    dispatch({
      type: ANNOUNCEMENT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update announcement

export const updateAnnouncement = (announce) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANNOUNCEMENT_UPDATE_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/announcement/${announce._id}`,
      announce,
      config
    );

    dispatch({
      type: ANNOUNCEMENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
