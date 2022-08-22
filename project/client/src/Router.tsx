import React from 'react'
import {Routes , Route} from 'react-router-dom'
import MyReview from './components/Pages/MyReview';
import CreateReview from './components/Pages/CreateReview';
import Login from './components/Pages/Login';
import AllReviews from './components/Pages/AllReviews';
import ReviewView from './components/Pages/ReviewView';
import UpdateReview from './components/Pages/UpdateReview';
import ViewCheck from './components/Pages/ViewCheck';
import Cookies from 'universal-cookie';

export interface PaidModuleView {
  moduleViewTrial : {}[];
  enrollmentID : number;
  }
  // <TrialView moduleViewTrial={moduleView} enrollmentID = {courseView[0]?.enrollment_id} />
function Router() {
  const cookies = new Cookies();
  const userId = cookies.get('user_info')
  // props: PaidModuleView
    // const { moduleViewTrial, enrollmentID } = props;

  
  return (
    <>
    <Routes>
    {userId === undefined ?<Route path = '/' element = {<AllReviews />} />
    :<Route path = '/' element = {<MyReview />} />}
    <Route path = '/reviewform' element = {<CreateReview />} />
    <Route path = '/reviewscheck/:id' element = {<ReviewView />} />
    <Route path = '/viewcheck/:id' element = {<ViewCheck />} />
    <Route path = '/updatereview/:id' element = {<UpdateReview />} />
    <Route path = '/login' element = {<Login />} />
    </Routes>
    </>
  )
}

export default Router