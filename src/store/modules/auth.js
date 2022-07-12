import axios from "axios"
export default {
    state: {
        token: null,
        auth: null
    },
    getters: {
        authenticated: (state) => { return state.token && state.auth }
    },
    mutations: {
        SET_TOKEN: (state, token) => state.token = token,
        SET_AUTH: (state, auth) => state.auth = auth
    },
    actions: {
        async submitScript({ dispatch }, credentials) {
            let response = await axios.post('user/login', credentials)
            if (response.data.token) {
                return dispatch('fetchAuthUser', response.data.token)
            } else  {
                return response
            }
        },
        async fetchAuthUser({ commit , state }, token) {
            if (token != 'null') {
            commit('SET_TOKEN', token)
            }
            if (!state.token) {
                return 
            }
            try {
                let response = await axios.post('user/auth', { data: '' })
                commit('SET_AUTH', response.data)
            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_AUTH', null)
            }
        },
        logout({commit}) {
            return axios.post('user/logout').then(()=>{
                commit('SET_TOKEN', null)
                commit('SET_AUTH', null)
            })
        }
    },
}