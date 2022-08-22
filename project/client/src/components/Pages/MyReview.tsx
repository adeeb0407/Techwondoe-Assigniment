import React, {useEffect, useState} from 'react'
import Card from '../organisms/Card'
import Cookies from 'universal-cookie';
import axios from 'axios';
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { login} from '../../redux/action-creators/index'
import { bindActionCreators } from 'redux';
import { useNavigate } from "react-router-dom";
import {Divider, Empty} from 'antd'

function MyReview() {
  const cookies = new Cookies();
  const userId = cookies.get('user_info')?.user_id
  // const [myReviews, setMyReviews] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { MyReviewAction, deleteReviewHandel } = bindActionCreators(actionCreators, dispatch)
  const [deleteState, setDeleteState] = useState(false)

  useEffect(()=> {
    MyReviewAction(userId)
  },[deleteState])

  const handelConfirmDelete = (review_id : any) => {
    deleteReviewHandel(review_id)
    setDeleteState(!deleteState)
    window.location.reload()
  } 

  const myReviews = useSelector((state: RootState) => state.myReviews)
  console.log(myReviews)
  if(!myReviews){
    return(<Empty />)
  }else if (myReviews?.length === 0){
    return(<Empty />)
  }else{
    return (
      <div>
        <Divider orientation="left">My Reviews</Divider>
        <Card myReviews = {myReviews} handelConfirmDelete = {handelConfirmDelete}/>
      </div>
    )
  }
}

export default MyReview