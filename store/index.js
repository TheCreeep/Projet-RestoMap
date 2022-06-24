/* eslint-disable no-unused-vars */
const state = () => ({
    nameInput: '',
    sexInput: '',
    ageInput: '',
    classInput: '',
    restaurantByName: [],
})

const actions = {
    /* Get Restaurant by Name */
    async GET_RESTAURANTS_BY_NAME({ commit }, name) {
        name = name.replace("&", "%26");
        const response = await this.$axios.get(`/api/data/name_search?name=${name}`)
        commit('SET_RESULTS_BY_NAME', response.data)
    }
}

const mutations = {
    SET_RESULTS_BY_NAME: (state, payload) => {
        state.restaurantByName = payload
    }
}

export default {
    state,
    actions,
    mutations,
}