


const FormStateReducer = ( state = false, action) => {
    switch (action.type) {
        case 'MAKE_TRUE':
            return !state;
        default:
            return state;
    }
};

export default FormStateReducer;