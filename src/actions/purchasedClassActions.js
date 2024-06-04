import {
  PURCHASED_CLASS_BYID_FAIL,
  PURCHASED_CLASS_BYID_REQUEST,
  PURCHASED_CLASS_BYID_SUCCESS,
  PURCHASED_CLASS_FAIL,
  PURCHASED_CLASS_REQUEST,
  PURCHASED_CLASS_SUCCESS,
  PURCHASED_CREATEUPDATE_FAIL,
  PURCHASED_CREATEUPDATE_REQUEST,
  PURCHASED_CREATEUPDATE_SUCCESS,
  PURCHASED_DELETE_FAIL,
  PURCHASED_DELETE_REQUEST,
  PURCHASED_DELETE_SUCCESS,
} from "../constants/purchasedClassContants";
import axios from "axios";
export const purchasedclass = (pageNumber) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PURCHASED_CLASS_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/purchasedclass?pageNumber=${pageNumber}`,
      config
    );
    dispatch({
      type: PURCHASED_CLASS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PURCHASED_CLASS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//create or update

export const createorupdate =
  (userId, addclass) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PURCHASED_CREATEUPDATE_REQUEST,
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
        `${process.env.REACT_APP_BACKEND_URI}/api/purchasedclass/${userId}`,
        { addclass },
        config
      );
      dispatch({
        type: PURCHASED_CREATEUPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PURCHASED_CREATEUPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//delete

export const deletepurchasedclass = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PURCHASED_DELETE_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/purchasedclass/${id}`,
      config
    );
    dispatch({
      type: PURCHASED_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PURCHASED_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get student purchased class

export const studentpurchasedclass = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PURCHASED_CLASS_BYID_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/purchasedclass/${id}`,
      config
    );
    dispatch({
      type: PURCHASED_CLASS_BYID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PURCHASED_CLASS_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
