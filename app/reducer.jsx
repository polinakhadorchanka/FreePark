const initialUserState = {
    user: JSON.parse(localStorage.getItem('user')),
    autos: [],
    parkXY: '55.533952 28.653222',
    parkSchema: {
        w: 500,
        h: 500,
        arrays: [[7,9,64,134],
            [76,15,63,138],
            [150,17,65,136],
            [222,17,68,136],
            [296,15,70,141],
            [373,15,71,137],
            [8,192,60,134],
            [71,194,71,139],
            [144,195,73,123],
            [219,194,69,137],
            [299,199,72,133],
            [377,197,68,141]]
    },
    reservation: [
        {
            id: '454',
            auto: { mark: 'mark', model: 'model', number: 'AA1123dfzv' },
            date1: '2020-01-01, 12:00',
            date2: '2020-01-01, 15:00',
            parkId: '111',
            placeId: '222',
            placeNumber: '5',
            path: '2123 123121'
        },
    ]
};

const reducer = function(state = initialUserState, action) {
    switch(action.type) {
        case 'SET_USER':
            if(action.user) localStorage.setItem('user', JSON.stringify(action.user));
            else localStorage.removeItem('user');
            return Object.assign({}, state, { user: action.user });
        case 'ADD_AUTO':
            return Object.assign({}, state, { autos: action.auto });
        case 'SET_PARK_XY':
            return Object.assign({}, state, { parkXY: action.xy });
        case 'SET_PARK_SCHEMA':
            return Object.assign({}, state, { parkSchema: action.schema });
        case 'SET_RESERVATION':
            return Object.assign({}, state, { reservation: action.reservation });
        default: return state;
    }
};

export default reducer;
