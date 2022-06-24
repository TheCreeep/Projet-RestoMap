/* eslint-disable no-unused-vars */
const state = () => ({
    nameInput: '',
    sexInput: '',
    ageInput: '',
    classInput: '',
    restaurantByName: [],
    restaurantByFilters: [],
    allCuisines: [],
    allBoroughs: [],

})

const actions = {
    /* Get Restaurant by Name */
    async GET_RESTAURANTS_BY_NAME({ commit }, name) {
        name = name.replace("&", "%26");
        const response = await this.$axios.get(`/api/data/name_search?name=${name}`)
        commit('SET_RESULTS_BY_NAME', response.data)
    }
    ,
    async GET_RESTAURANTS_BY_FILTERS({ commit }, payload) {
        const { cuisine, borough } = payload

        let link = ['/api/data/search?']
        if (cuisine !== '') {
            link.push('cuisine=' + cuisine)
        }
        if (borough !== '') {
            link.push('borough=' + borough)
        }
        link = link.join('&')

        const response = await this.$axios.get(link)
        commit('SET_RESULTS_BY_FILTERS', response.data)
    }
    ,
    async GET_ALL_CUISINES({ commit }) {
        const response = await this.$axios.get('/api/data/cuisines')
        commit('SET_ALL_CUISINES', response.data)
    }
    ,
    async GET_ALL_BOROUGHS({ commit }) {
        const response = await this.$axios.get('/api/data/boroughs')
        commit('SET_ALL_BOROUGHS', response.data)
    }

}

const mutations = {
    SET_RESULTS_BY_NAME: (state, payload) => {
        state.restaurantByName = payload
    },
    SET_RESULTS_BY_FILTERS: (state, payload) => {
        state.restaurantByFilters = payload
    },
    SET_ALL_CUISINES: (state, payload) => {
        state.allCuisines = payload
    },
    SET_ALL_BOROUGHS: (state, payload) => {
        state.allBoroughs = payload
    }
}


export default {
    state,
    actions,
    mutations,
}