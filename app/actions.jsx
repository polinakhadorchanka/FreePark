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

module.exports = {setUser, addAuto};