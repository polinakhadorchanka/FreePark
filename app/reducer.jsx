const initialUserState = {
    user: JSON.parse(localStorage.getItem('user')),
    autos: []
};

const reducer = function(state = initialUserState, action) {
    switch(action.type) {
        case 'SET_USER':
            if(action.user) localStorage.setItem('user', JSON.stringify(action.user));
            else localStorage.removeItem('user');
            return Object.assign({}, state, { user: action.user });
        case 'ADD_AUTO':
            return Object.assign({}, state, { autos: action.auto });
        default: return state;
    }
};

export default reducer;
