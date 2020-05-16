const initialUserState = {
    user: JSON.parse(localStorage.getItem('user')),
    autos: undefined,
    parkXY: undefined,
    parkSchema: undefined,
    reservation: [],
    focus: undefined,
    price: undefined,
    freeAutos: undefined
};

const reducer = function(state = initialUserState, action) {
    switch(action.type) {
        case 'SET_USER':
            if(action.user) localStorage.setItem('user', JSON.stringify(action.user));
            else localStorage.removeItem('user');
            return Object.assign({}, state, { user: action.user });
        case 'ADD_AUTO':
            return Object.assign({}, state, { autos: action.auto });
        case 'SET_FREE_AUTOS':
            return Object.assign({}, state, { freeAutos: action.autos });
        case 'SET_PARK_XY':
            return Object.assign({}, state, { parkXY: action.xy });
        case 'SET_PARK_SCHEMA':
            let schema = action.schema;
            schema.ratio = action.ratio;
            return Object.assign({}, state, { parkSchema: schema });
        case 'SET_RESERVATION':
            return Object.assign({}, state, { reservation: action.reservation });
        case 'SET_FOCUS':
            return Object.assign({}, state, { focus: action.focus });
        case 'SET_PRICE':
            return Object.assign({}, state, { price: action.price });
        default: return state;
    }
};

export default reducer;
