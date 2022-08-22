import React, {useState, useEffect} from 'react'
import { Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { login} from '../../redux/action-creators/index'
import { bindActionCreators } from 'redux';
import { useNavigate } from "react-router-dom";
import * as api from '../../redux/api'
import {useParams} from 'react-router-dom'
import Form from '../organisms/Form';
import {API} from '../../redux/api'

function UpdateReview() {

    const {id} = useParams();
    console.log(id)

  const [reviewData, setreviewData] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updateReviewAction, ViewReview } = bindActionCreators(actionCreators, dispatch)

  useEffect( ()=> {
    // ViewReview(id)
     API.get(`reviewsingle/${id}`)
    .then((response:any): any => {
      console.log(response);
      setreviewData(response?.data)
    })
    .catch((error:any): any => {
      console.log(error)
    });
  },[])
  console.log(reviewData)

  const handelUpdation = async (user_id: Number, title: String, rating: any ,streamingApps : any, reviewDescription : String, banner: any) => {
  //  const {data} = await api.createReview(user_id, title, rating,streamingApps, reviewDescription)
  //  console.log(data)
  updateReviewAction(id, title, rating, streamingApps, reviewDescription, banner, navigate)
  }

  const viewReview = useSelector((state: RootState) => state.myReviews)
  
  return (
    <>
     <Divider orientation="left">My Reviews</Divider>
     <Form handelCreation = {handelUpdation} viewReview = {reviewData[0]}/>
    </>
  )
}

export default UpdateReview;