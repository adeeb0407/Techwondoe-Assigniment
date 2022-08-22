import React, {useEffect, useState} from 'react'
import Card from '../organisms/Card'
import Cookies from 'universal-cookie';
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { login} from '../../redux/action-creators/index'
import { bindActionCreators } from 'redux';
import { useNavigate } from "react-router-dom";
import {Divider, Empty} from 'antd'
import {API} from '../../redux/api/index'

interface ReviewViewer {
  banner_image: string;
  rating: number;
  review_id: number;
  user_id: string;
  streaming_apps?: string | null;
  username: string;
}

function AllReviews() {
  // const [myReviews, setMyReviews] = useState('')

  const navigate = useNavigate();
  const [reviewAll, SetreviewAll] = useState<ReviewViewer[]>([])

  useEffect(()=> {
    // MyReviewAction(userId)
    API.get("/reviewall")
    .then((response:any): any => {
      console.log(response);
      SetreviewAll(response?.data)
    })
    .catch((error:any): any => {
      console.log(error)
    });
  },[])

  console.log(reviewAll)

  if(!reviewAll){
    return(<Empty />)
  }else if (reviewAll?.length === 0){
    return(<Empty />)
  }else{
    return (
      <div>
        <Divider orientation="left">All Reviews</Divider>
        <Card myReviews = {reviewAll} viewAll = {true}/>
      </div>
    )
  }
}

export default AllReviews