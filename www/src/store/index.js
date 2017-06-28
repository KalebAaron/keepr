import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})
let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})

// REGISTER ALL DATA HERE
let state = {
  user: {},
  vaults: [],
  keeps: [],
  error: {}
}

let handleError = (err) => {
  state.error = err
}

export default new Vuex.Store({
  // ALL DATA LIVES IN THE STATE
  state,
  // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
  mutations: {
    setUser(state, user) {
      state.user = user
      //router.push('/start')
    },
    setLogin(state, user) {
      state.user = user
      //router.push('/start')
    },
    setError(state) {
      state.error = {}
    },
    setKeeps(state, keeps) { 
      //debugger
      state.keeps = keeps;
    },
    setVaults(state, vaults) { 
      debugger
      state.vaults = vaults;
    }

  },
  actions: {
    register({ commit, dispatch }, user) {
      auth.post('register', user)
        .then(res => {
          commit('setLogin', res.data.data)
          if (res.data.error) {
            return handleError(res.data.error)
          }
        })
        .catch(handleError)
    },
    login({ commit, dispatch }, user) {
      debugger
      auth.post('login', user)
        .then(res => {
          commit('setUser', res.data.data)
          router.push('/myKeeps/' + res.data.data._id)
        })
        .catch(handleError)
    },
    getAuth({ commit, dispatch }) {
      auth('authenticate')
        .then(res => {
          commit('setUser', res.data.data)
          //state.user = res.data.data
          if (state.user === null) {
            router.push('/')
          } else {
            router.push('/myKeeps/' + res.data.data._id)
          }
        }).catch(err => {
          router.push('/')
        })
    },
    clearError({ commit, dispatch }) {
      commit('setError')
    },
    createKeep({ commit, dispatch }, keep){
      api.post('keep', keep).then(res => {
          dispatch('getKeeps', keep.createdBy)
        })
        .catch(handleError)
    },
    createVault({ commit, dispatch }, vault){
      api.post('vault', vault).then(res => { 
        debugger
          dispatch('getVaults', vault.creatorId)
        })
        .catch(handleError)
    },
    getKeeps({ commit, dispatch }, userId ){
      //debugger
      api('getKeeps/' + userId)
      .then(res => {
        //debugger
          commit('setKeeps', res.data.data)
        })
        .catch(handleError)
    },
    getVaults({ commit, dispatch }, userId ){
      debugger
      api('getVaults/' + userId)
      .then(res => {
        debugger
          commit('setVaults', res.data.data)
        })
        .catch(handleError)
    },
    }

})

