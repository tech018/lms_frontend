import axios from "axios";
import {
  COUNT_STUDENT_LESSON_FAIL,
  COUNT_STUDENT_LESSON_REQUEST,
  COUNT_STUDENT_LESSON_SUCCESS,
  CREATE_NOTES_FAIL,
  CREATE_NOTES_REQUEST,
  CREATE_NOTES_SUCCESS,
  FINISHED_LESSON_FAIL,
  FINISHED_LESSON_REQUEST,
  FINISHED_LESSON_SUCCESS,
  GETNEW_LESSON_FAIL,
  GETNEW_LESSON_REQUEST,
  GETNEW_LESSON_SUCCESS,
  LESSONS_CREATE_FAIL,
  LESSONS_CREATE_REQUEST,
  LESSONS_CREATE_SUCCESS,
  LESSONS_DETAILS_FAIL,
  LESSONS_DETAILS_REQUEST,
  LESSONS_DETAILS_SUCCESS,
  LESSON_DELETE_FAIL,
  LESSON_DELETE_REQUEST,
  LESSON_DELETE_SUCCESS,
  LESSON_DETAILS_FAIL,
  LESSON_DETAILS_REQUEST,
  LESSON_DETAILS_SUCCESS,
  LESSON_TIME_FAIL,
  LESSON_TIME_REQUEST,
  LESSON_TIME_SUCCESS,
  LESSON_UPDATE_FAIL,
  LESSON_UPDATE_NEW_FAIL,
  LESSON_UPDATE_NEW_REQUEST,
  LESSON_UPDATE_NEW_SUCCESS,
  LESSON_UPDATE_REQUEST,
  LESSON_UPDATE_SUCCESS,
  ONGOING_LESSON_FAIL,
  ONGOING_LESSON_REQUEST,
  ONGOING_LESSON_SUCCESS,
} from "../constants/lessonsConstants";

//create lesson teacher
export const createLesson = (lessons) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LESSONS_CREATE_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/lessons`,
      { lessons },
      config
    );

    dispatch({
      type: LESSONS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSONS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get lesson by id teacher/student
export const lessonsById =
  (classId, pageNumber) => async (dispatch, getState) => {
    try {
      dispatch({
        type: LESSONS_DETAILS_REQUEST,
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
        `${process.env.REACT_APP_BACKEND_URI}/api/lessons/${classId}?pageNumber=${pageNumber}`,
        config
      );
      dispatch({
        type: LESSONS_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LESSONS_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//get single details
export const lessonSingleDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LESSON_DETAILS_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/lessons/details/${id}`,
      config
    );
    dispatch({
      type: LESSON_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//delete lesson

export const lessonDeleteSingle = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LESSON_DELETE_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URI}/api/lessons/${id}`,
      config
    );

    dispatch({
      type: LESSON_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LESSON_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update status new
export const updateStatusNew = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LESSON_UPDATE_NEW_REQUEST,
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
      `https://learnandshare.zepnds.info/api/lessons/updatenew/${id}`,
      {},
      config
    );

    dispatch({
      type: LESSON_UPDATE_NEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_UPDATE_NEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update lesson

export const updateLessonById = (lesson) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LESSON_UPDATE_REQUEST,
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
      `https://learnandshare.zepnds.info/api/lessons/${lesson._id}`,
      { lesson },
      config
    );

    dispatch({
      type: LESSON_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//get time schedule

export const timeScheduleById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LESSON_TIME_REQUEST,
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
      `https://learnandshare.zepnds.info/api/lessons/timeschedule/${id}`,
      config
    );
    dispatch({
      type: LESSON_TIME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TIME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//finished class
export const finishlessons = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FINISHED_LESSON_REQUEST,
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
      `https://learnandshare.zepnds.info/api/lessons/finishedlessons/${id}`,
      config
    );
    dispatch({
      type: FINISHED_LESSON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FINISHED_LESSON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//on going class

export const ongoinglessons = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ONGOING_LESSON_REQUEST,
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
      `https://learnandshare.zepnds.info/api/lessons/ongoingclass/${id}`,
      config
    );
    dispatch({
      type: ONGOING_LESSON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ONGOING_LESSON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//count new lessons
export const countnewlessons = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GETNEW_LESSON_REQUEST,
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
      `https://learnandshare.zepnds.info/api/lessons/newlesson/${id}`,
      config
    );
    dispatch({
      type: GETNEW_LESSON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GETNEW_LESSON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//count student all lessons
export const countalllessons = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNT_STUDENT_LESSON_REQUEST,
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
      `https://learnandshare.zepnds.info/api/lessons/countall/${id}`,
      config
    );
    dispatch({
      type: COUNT_STUDENT_LESSON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNT_STUDENT_LESSON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//new notes

export const createnotes = (id, title, desc) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_NOTES_REQUEST,
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
      `https://learnandshare.zepnds.info/api/lessons/newnotes/${id}`,
      { title, desc },
      config
    );
    dispatch({
      type: CREATE_NOTES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NOTES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
