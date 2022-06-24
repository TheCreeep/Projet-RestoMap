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
    selectedRestaurant: {},

})

const actions = {
    /* Get Restaurant by Name */
    async GET_RESTAURANTS_BY_NAME({ commit }, name) {
        name = name.replace("&", "%26");
        const response = await this.$axios.get(`/api/data/name_search?name=${name}`)
        commit('SET_RESULTS_BY_NAME', response.data)
    },
    async GET_RESTAURANTS_BY_ID({ commit }, id) {
        const response = await this.$axios.get(`/api/data/id_search?id=${id}`)
        commit('SET_SELECTED_RESTAURANT', response.data[0])
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

    ,
    async ADD_GRADE({ commit }, payload) {
        const { id, grade, score, date } = payload
        const response = await this.$axios.post(`/api/data/add_grade?id=${id}`, {
            date,
            grade,
            score,
        })
        commit('ADD_NEW_GRADE', {
            date,
            grade,
            score,
        })

    },
    async ADD_RESTAURANT({ commit }, payload) {
        const response = await this.$axios.post(`/api/data/add_restaurant`, payload)
            .then(response => {
                this.$router.push('/restaurant/' + response.data.restaurant_id)
                this._vm.vs.$notification.success({
                    title: 'Success',
                    message: 'Restaurant ajouté avec succès',
                    type: 'success',
                    duration: 3000
                })
            })
            .catch(error => {
                console.log(error)
                this._vm.vs.$notification.error({
                    title: 'Erreur',
                    message: 'Erreur lors de l\'ajout du restaurant',
                    type: 'error',
                    duration: 3000
                })
            })
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
    },
    SET_SELECTED_RESTAURANT: (state, payload) => {
        state.selectedRestaurant = payload
    },
    ADD_NEW_GRADE: (state, payload) => {
        state.selectedRestaurant.grades.push(payload)
    },
}


export default {
    state,
    actions,
    mutations,
}