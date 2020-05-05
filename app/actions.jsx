let addVacancy = function (vacancy, filter) {
    return {
        type: "ADD_VACANCY",
        filter: filter,
        vacancy
    }
};