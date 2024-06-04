import axios from "axios";

import {
  TESTIMONIAL_LIST_REQUEST,
  TESTIMONIAL_LIST_SUCCESS,
  TESTIMONIAL_LIST_FAIL,
  TESTIMONIAL_DETAILS_REQUEST,
  TESTIMONIAL_DETAILS_SUCCESS,
  TESTIMONIAL_DETAILS_FAIL,
  TESTIMONIAL_UPDATE_SUCCESS,
  TESTIMONIAL_UPDATE_REQUEST,
  TESTIMONIAL_UPDATE_FAIL,
  TESTIMONIAL_DELETE_REQUEST,
  TESTIMONIAL_DELETE_SUCCESS,
  TESTIMONIAL_DELETE_FAIL,
  TESTIMONIAL_CREATE_REQUEST,
  TESTIMONIAL_CREATE_SUCCESS,
  TESTIMONIAL_CREATE_FAIL,
} from "../constants/testimonialConstants";

export const listTestimonial = () => async (dispatch) => {
  try {
    dispatch({
      type: TESTIMONIAL_LIST_REQUEST,
    });
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/api/testimonials`
    );
    dispatch({
      type: TESTIMONIAL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TESTIMONIAL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get details
export const TestimonyById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TESTIMONIAL_DETAILS_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/testimonials/${id}`,
      config
    );
    dispatch({
      type: TESTIMONIAL_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TESTIMONIAL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update now

export const updateTest = (testimonial) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TESTIMONIAL_UPDATE_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/testimonials/${testimonial._id}`,
      { testimonial },
      config
    );

    dispatch({
      type: TESTIMONIAL_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TESTIMONIAL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//delete testimonials

export const testimonialDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TESTIMONIAL_DELETE_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/testimonials/${id}`,
      config
    );

    dispatch({
      type: TESTIMONIAL_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TESTIMONIAL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//create testimony
export const createtestimony =
  (title, testimony) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TESTIMONIAL_CREATE_REQUEST,
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

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/api/testimonials`,
        { title, testimony },
        config
      );

      dispatch({
        type: TESTIMONIAL_CREATE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TESTIMONIAL_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
