import React, {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { login} from '../../redux/action-creators/index'
import { bindActionCreators } from 'redux';
import { useNavigate } from "react-router-dom";
import Card from '../organisms/Card'
import Cookies from 'universal-cookie';
import View from "../organisms/View"
import {Divider, Empty} from 'antd'
import {API} from '../../redux/api/index'

interface ReviewSingleViewer {
  banner_image: string;
  rating: number;
  review_id: number;
  review_description : string
  user_id: string;
  streaming_apps?: string | null;
  username: string;
}

function ViewCheck() {

    const {id} = useParams();
    console.log(id);
    const [review, SetReview] = useState<ReviewSingleViewer[]>([])

    useEffect(()=> {
      API.get("/viewcheck/"+id)
      .then((response:any): any => {
        console.log(response);
        SetReview(response?.data)
      })
      .catch((error:any): any => {
        console.log(error)
      });
    },[])

    if(review.length === 0){
      return(<Empty />)
    }else{
  return (
    <>
<View viewReview = {review} id = {id} justView = {true}/>
    </>
  )}
}

export default ViewCheck