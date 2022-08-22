import React, {useState} from 'react'
import { Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Form from '../organisms/Form'
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { login} from '../../redux/action-creators/index'
import { bindActionCreators } from 'redux';
import { useNavigate } from "react-router-dom";
import * as api from '../../redux/api'

function CreateReview() {

  const [reviewData, setreviewData] = useState('YO')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createReviewAction } = bindActionCreators(actionCreators, dispatch)


  const handelCreation = async (user_id: Number, title: String, rating: any ,streamingApps : any, reviewDescription : String, banner: any) => {
  //  const {data} = await api.createReview(user_id, title, rating,streamingApps, reviewDescription)
  //  console.log(data)
     createReviewAction(user_id, title, rating, streamingApps, reviewDescription, banner, navigate)
  }
  
  return (
    <>
     <Divider orientation="left">My Reviews</Divider>
      <Form handelCreation = {handelCreation}/>
    </>
  )
}

export default CreateReview;