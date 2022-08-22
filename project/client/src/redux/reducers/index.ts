import { combineReducers } from "redux";
import fetchUser from "./fetchUsers"
import review from "./review"
import {createReview,myReviews,updateReview} from "./myReviews"


const reducers = combineReducers({
    fetchUser,
    createReview,
    updateReview,
    myReviews
})

export default reducers

export type RootState = ReturnType<typeof reducers>