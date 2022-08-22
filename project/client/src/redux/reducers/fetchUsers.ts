import { UserType } from "../action-types/index"
import { UserAction } from "../actions/user"


export default (users: null | {}[] = null, action: UserAction): {}[] | any => {
    switch (action.type) {
        
        case UserType.FETCH_USERS:
            return action.payload;

        default: // need this for default case
        return users 
    }
}