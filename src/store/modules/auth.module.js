import axios from 'axios';
import requestAxios from "@/axios/request";
import {error} from "@/utils/error";

const TOKEN_KEY = 'jwt-token';
const UID_KEY = 'uid';

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      uid: localStorage.getItem(UID_KEY),
    }
  },
  getters: {
    token(s) {
      return s.token;
    },
    uid(s) {
      return s.uid;
    },
    isAuthenticated(s) {
      return !!s.token;
    },
  },
  actions: {
    async login({commit, dispatch}, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`;

        const {data} = await axios.post(url, {...payload, returnSecureToken: true});

        commit('setToken', data.idToken);
        commit('setUid', data.localId);

        commit('clearMessage', null, {root: true});
      } catch (e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger',
        }, {root: true});
        throw new Error(e);
      }

    },
    async signUp({commit, dispatch}, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`;

        const {data} = await axios.post(url, {...payload, returnSecureToken: true});
        commit('setToken', data.idToken);
        commit('setUid', data.localId);

        await requestAxios.post(`users/${data.localId}/info.json?auth=${data.idToken}`, {id: data.localId});

        commit('clearMessage', null, {root: true});
      } catch (e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger',
        }, {root: true});
        throw new Error(e);
      }

    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    },
    setUid(state, id) {
      state.uid = id;
      localStorage.setItem(UID_KEY, id);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    }
  }
}
