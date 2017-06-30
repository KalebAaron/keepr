import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let api = axios.create({
  baseURL: 'https://mykeeps.herokuapp.com/api',
  timeout: 2000,
  withCredentials: true
})
let auth = axios.create({
  baseURL: 'https://mykeeps.herokuapp.com/',
  timeout: 2000,
  withCredentials: true
})

// REGISTER ALL DATA HERE
let state = {
  user: {},
  vaults: [],
  keeps: [],
  activeVault: {name: "My Keeps"},
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
      state.vaults = vaults;
    },
    setActiveVault(state, vault) {
      state.activeVault = vault
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
          dispatch('getKeeps', res.data.data.creatorId)
        })
        .catch(handleError)
    },
    createVault({ commit, dispatch }, vault){
      api.post('vault', vault).then(res => { 
          dispatch('getVaults', vault.creatorId)
        })
        .catch(handleError)
    },
    getKeeps({ commit, dispatch }, userId ){
      api('getKeeps/' + userId)
      .then(res => {
          commit('setKeeps', res.data.data)
        })
        .catch(handleError)
    },
    getVaults({ commit, dispatch }, userId ){
      api('getVaults/' + userId)
      .then(res => {
        debugger
          commit('setVaults', res.data.data)
        })
        .catch(handleError)
    },
    addToVault({ commit, dispatch }, data){
      //debugger
      api.put("addKeepToVault/" + data.vaultId, data.keep)
      .then(res => {
        debugger
          dispatch('getVaults', res.data.data.creatorId)
        })
        .catch(handleError)
    },
    showVaultKeeps({ commit, dispatch }, vault){
      debugger
      api("getVaultKeeps/" + vault._id, vault)
            .then(res => {
              debugger
          commit('setKeeps', res.data.data)
          commit('setActiveVault', vault)
        })
        .catch(handleError)
    },
    addVaultIdToKeep({ commit, dispatch }, data){
      api.put("addVaultIdToKeep/" + data.vaultId, data.keep)
            .then(res => {
          commit()
        })
        .catch(handleError)      
    },
    getMyKeeps({ commit, dispatch }, userId){
      commit("setActiveVault", {name: "My Keeps"})
      dispatch("getKeeps", userId)
    }
    }

})

