import { Dispatch } from "redux"
import { UserType, createType, MyReviewType, DeleteReviewType,  updateType} from "../action-types"
// import { Action } from "../actions/index"
import { UserAction, CreateAction, MyReviews, DeleteReview, UpdateAction} from "../actions/user"
import { Button, message, Space } from 'antd';
import * as api from '../api'
import {API} from '../api'


export const login = (username: String, password: String, navigate?: any) => async(dispatch: Dispatch<UserAction>) => {
    let now = new Date();
    let time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);
    try {
        const {data} = await api.loginUser(username, password)
        if(typeof data === 'object'){
             document.cookie = `user_info=${JSON.stringify(data)};expires=${now.toUTCString()}`;
            navigate('/')
            message.success('Logged in Succesfully');
            window.location.reload();
        }else{
            message.error(data); 
        }
        dispatch({
            type : UserType.FETCH_USERS,
            payload : data
        }) // dispatch is coming form redux-thunk also the aysn (dispatch)
    } catch (error: any) {
        console.log(error)
        message.error(error);
    }
  }

export const createReviewAction = (user_id: Number, title: String, rating :any,streamingApps : any, reviewDescription : String, formData: any,navigate ?: any) => async(dispatch: Dispatch<CreateAction>) => {
    try {
        const {data} = await api.createReview(user_id, title, rating,streamingApps, reviewDescription, "")
        message.success('Review Created!'); 
        navigate('/')
        dispatch({
            type : createType.CREATE_REVIEW,
            payload : data
        }) // dispatch is coming form redux-thunk also the aysn (dispatch)
    } catch (error) {
        console.log(error)
    }
  }

export const updateReviewAction = (review_id: any, title: String, rating :any,streamingApps : any, reviewDescription : String, banner: any,navigate ?: any) => async(dispatch: Dispatch<UpdateAction>) => {
    try {
        const {data} = await api.updateReview(parseInt(review_id), title, rating,streamingApps, reviewDescription, banner)
        message.success('Review Updated!');
        navigate('/')
        dispatch({
            type : updateType.UPDATE_REVIEW,
            payload : data
        }) // dispatch is coming form redux-thunk also the aysn (dispatch)
    } catch (error) {
        console.log(error)
    }
  }

export const MyReviewAction = (user_id: Number) => async(dispatch: Dispatch<MyReviews>) => {
    try {
        const {data} = await api.myReviews(user_id)

        dispatch({
            type : MyReviewType.MYREVIEWS,
            payload : data
        }) // dispatch is coming form redux-thunk also the aysn (dispatch)
    } catch (error) {
        console.log(error)
    }
  }

export const ViewReview = (review_id: any) => async(dispatch: Dispatch<MyReviews>) => {
    try {
        const {data} = await api.viewReview(parseInt(review_id))

        dispatch({
            type : MyReviewType.MYREVIEWS,
            payload : data
        }) // dispatch is coming form redux-thunk also the aysn (dispatch)
    } catch (error) {
        console.log(error)
    }
  }

export const deleteReviewHandel = (review_id: any) => async(dispatch: Dispatch<DeleteReview>) => {
    try {
        const {data} = await api.deleteReview(parseInt(review_id))

        dispatch({
            type : DeleteReviewType.DELETE_REVIEW,
            payload : data
        }) // dispatch is coming form redux-thunk also the aysn (dispatch)
    } catch (error) {
        console.log(error)
    }
  }