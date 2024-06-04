import axios from "axios";
import {
  CREATE_VIDEO_FAIL,
  CREATE_VIDEO_REQUEST,
  CREATE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
  DELETE_VIDEO_REQUEST,
  DELETE_VIDEO_SUCCESS,
  VIDEOS_FAIL,
  VIDEOS_REQUEST,
  VIDEOS_SUCCESS,
} from "../constants/videoContants";

export const getallvideos = () => async (dispatch) => {
  try {
    dispatch({
      type: VIDEOS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/api/videos`,
      config
    );
    dispatch({
      type: VIDEOS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VIDEOS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//create video
export const createvideo = (videoId, title) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_VIDEO_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/videos`,
      { videoId, title },
      config
    );

    dispatch({
      type: CREATE_VIDEO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//DELETE VIDEO
export const deletevideo = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_VIDEO_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/videos/${id}`,
      config
    );

    dispatch({
      type: DELETE_VIDEO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
