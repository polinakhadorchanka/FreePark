let setUser = function (user) {
    return {
        type: "SET_USER",
        user: user,
    }
};

let addAuto = function (auto) {
    return {
        type: "ADD_AUTO",
        auto: auto,
    }
};

let setParkXY = function (xy) {
    return {
        type: "SET_PARK_XY",
        xy: xy,
    }
};

let setParkSchema = function (schema, ratio) {
    return {
        type: "SET_PARK_SCHEMA",
        schema: schema,
        ratio: ratio
    }
};

let setReservation = function (reservation) {
    return {
        type: "SET_RESERVATION",
        reservation: reservation,
    }
};

let setFocus = function (focus) {
    return {
        type: "SET_FOCUS",
        focus: focus,
    }
};

let setPrice = function (price) {
    return {
        type: "SET_PRICE",
        price: price,
    }
};

let setFreeAutos = function (autos) {
    return {
        type: "SET_FREE_AUTOS",
        autos: autos,
    }
};

module.exports = {setUser, addAuto, setParkXY, setParkSchema, setReservation, setFocus, setPrice, setFreeAutos};