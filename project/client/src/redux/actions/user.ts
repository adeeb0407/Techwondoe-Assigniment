import { UserType, createType,updateType, MyReviewType, DeleteReviewType} from "../action-types/index"

interface FetchUsers {
    type: UserType.FETCH_USERS,
    payload: {}[] | any
}
interface FetchUsers {
    type: UserType.FETCH_USERS,
    payload: {}[] | any
}
interface CreateReview {
    type: createType.CREATE_REVIEW,
    payload: {}[] | any
}
interface UpdateReview {
    type: updateType.UPDATE_REVIEW,
    payload: {}[] | any
}

interface MyReviewAction {
    type: MyReviewType.MYREVIEWS,
    payload: {}[] | any
}
interface DeleteReviewAction {
    type: DeleteReviewType.DELETE_REVIEW,
    payload: {}[] | any
}

export type UserAction = FetchUsers ;
export type CreateAction = CreateReview ;
export type UpdateAction = UpdateReview ;
export type MyReviews = MyReviewAction ;
export type DeleteReview = DeleteReviewAction ;