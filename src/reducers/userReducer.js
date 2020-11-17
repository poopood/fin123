// const usersReducerDefaultState = {
//     users: [],
//     userAuthState: undefined
// }

const UserReducer = (state = {}, action) => {
    switch(action.type) {
        case 'USER_AUTH_SIGN_IN':
            return {
                userID : action.uid
            }
        case 'USER_AUTH_SIGN_OUT':
            return {}
        default:
            return state;

    }
}

export default UserReducer;
