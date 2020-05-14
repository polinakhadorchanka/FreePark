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

let setParkSchema = function (schema) {
    return {
        type: "SET_PARK_SCHEMA",
        schema: schema,
    }
};

let setReservation = function (reservation) {
    return {
        type: "SET_RESERVATION",
        reservation: reservation,
    }
};

module.exports = {setUser, addAuto, setParkXY, setParkSchema, setReservation};