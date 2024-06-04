import axios from "axios";
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTRATION_FAIL,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  TEACHER_FAIL,
  TEACHER_SUCCESS,
  TEACHER_REQUEST,
  COMPLETE_REG_REQUEST,
  COMPLETE_REG_SUCCESS,
  COMPLETE_REG_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  USER_LOGIN_RESET,
  CHECK_USER_DETAILS_REQUEST,
  CHECK_USER_DETAILS_SUCCESS,
  CHECK_USER_DETAILS_FAIL,
  UPDATE_USER_PHOTO_REQUEST,
  UPDATE_USER_PHOTO_FAIL,
  UPDATE_USER_PHOTO_SUCCESS,
  UPDATE_USER_IMAGE_REQUEST,
  UPDATE_USER_IMAGE_SUCCESS,
  UPDATE_USER_IMAGE_FAIL,
} from "../constants/userContants";
import {
  COURSE_DETAILS_RESET,
  COURSE_LIST_RESET,
} from "../constants/courseContants";
import { APPLICATION_DETAILS_RESET } from "../constants/enrollConstants";

export const register = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTRATION_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/api/users/register`,
      { email },
      config
    );

    dispatch({
      type: USER_REGISTRATION_SUCCESS,
      payload: data,
    });

    const emaillocal = () =>
      localStorage.setItem("emailForRegistration", email);
    emaillocal();
  } catch (error) {
    dispatch({
      type: USER_REGISTRATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const completeRegister =
  (userEmail, name, address, contactNo, password) => async (dispatch) => {
    try {
      dispatch({
        type: COMPLETE_REG_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/api/users`,
        { userEmail, name, address, contactNo, password },
        config
      );

      dispatch({
        type: COMPLETE_REG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMPLETE_REG_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/api/users/login`,
      {
        email,
        password,
      }
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get all users admin

export const getAllUsers =
  (keyword = "", pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
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
        `${process.env.REACT_APP_BACKEND_URI}/api/users?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//delete DELETE
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/users/${id}`,
      config
    );

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get USER DETAILS
export const userDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/users/${id}`,
      config
    );
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//update announcement

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/users/${user._id}`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get all users admin

export const getAllTeachers = (role) => async (dispatch) => {
  try {
    dispatch({
      type: TEACHER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/api/users/teacher/${role}`,
      config
    );
    dispatch({
      type: TEACHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEACHER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//forgot password
export const forgot = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/api/users/${email}`
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//reset password
export const reset = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/api/users/reset/${email}`,
      { password }
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: USER_REGISTRATION_RESET,
  });
  dispatch({
    type: COURSE_LIST_RESET,
  });
  dispatch({
    type: COURSE_DETAILS_RESET,
  });
  dispatch({
    type: APPLICATION_DETAILS_RESET,
  });
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_LOGIN_RESET,
  });
};
//userinfo
export const userinfodetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHECK_USER_DETAILS_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/users/details/${id}`,
      config
    );
    dispatch({
      type: CHECK_USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHECK_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update photo
export const updatepicture = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_USER_PHOTO_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/api/avatar/uploadphoto`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_USER_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PHOTO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//update image

export const updatephoto = (id, imageUrl) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_USER_IMAGE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URI}/api/users/updateImage/${id}`,
      { imageUrl },
      config
    );

    dispatch({
      type: UPDATE_USER_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
