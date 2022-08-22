import { UserType, createType, updateType, MyReviewType} from "../action-types/index"
import { UserAction, CreateAction, MyReviews,UpdateAction } from "../actions/user"


export const myReviews = (myReview: null | {}[] = null, action: MyReviews): {}[] | any => {
    switch (action.type) {
        
        case MyReviewType.MYREVIEWS:
            return action.payload;

        default: // need this for default case
        return myReview 
    }
}

export const createReview = (review: null | {}[] = null, action: CreateAction): {}[] | any => {
    switch (action.type) {
        
        case createType.CREATE_REVIEW:
            return action.payload;

        default: // need this for default case
        return review 
    }
}
export const updateReview = (updatereview: null | {}[] = null, action: UpdateAction): {}[] | any => {
    switch (action.type) {
        
        case updateType.UPDATE_REVIEW:
            return action.payload;

        default: // need this for default case
        return updatereview 
    }
}