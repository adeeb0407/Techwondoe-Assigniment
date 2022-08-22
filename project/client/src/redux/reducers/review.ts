import { UserType, createType } from "../action-types/index"
import { UserAction, CreateAction } from "../actions/user"


export default (review: null | {}[] = null, action: CreateAction): {}[] | any => {
    switch (action.type) {
        
        case createType.CREATE_REVIEW:
            return action.payload;

        default: // need this for default case
        return review 
    }
}