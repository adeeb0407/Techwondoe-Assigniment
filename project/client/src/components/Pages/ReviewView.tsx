import React, {useEffect} from 'react'
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

function ReviewView() {

    const {id} = useParams();
    console.log(id);

    const cookies = new Cookies();

    const dispatch = useDispatch();
    const { ViewReview } = bindActionCreators(actionCreators, dispatch)

    useEffect(()=> {
      ViewReview(id)
    },[])
    const viewReview = useSelector((state: RootState) => state.myReviews)
    console.log(viewReview)

    if(!viewReview){
      return(<Empty />)
    }else{
  return (
    <>
<View viewReview = {viewReview} id = {id}/>
    </>
  )}
}

export default ReviewView