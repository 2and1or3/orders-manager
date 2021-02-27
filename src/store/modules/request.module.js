import axios from '../../axios/request';
import store from '../index';

export default {
  namespaced: true,
  state() {

    return {
      requests: [],
    }
  },
  getters: {
    requests(state) {
      return state.requests;
    }
  },
  mutations: {
    setRequests(state, requests) {
      state.requests = requests;
    },
    addRequest(state, request) {
      state.requests.push(request);
    }
  },
  actions: {
    async create({commit, dispatch}, payload) {
      try {
        const token = store.getters['auth/token'];
        const uid = store.getters['auth/uid'];
        const {data} = await axios.post(`users/${uid}/requests.json?auth=${token}`, payload);

        commit('addRequest', {...payload, id: data.name});

        dispatch('setMessage', {
          value: 'Заявка успешно создана',
          type: 'primary',
        }, {root: true});

      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger',
        }, {root: true});
      }
    },

    async load({commit, dispatch}) {
      try {
        const token = store.getters['auth/token'];
        const uid = store.getters['auth/uid'];
        const {data} = await axios.get(`users/${uid}/requests.json?auth=${token}`);

        const requests = data ? Object.keys(data).map((id) => ({...data[id], id})) : [];

        commit('setRequests', requests);

      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger',
        }, {root: true});
      }
    },

    async loadOne({commit, dispatch}, id) {
      try {
        const token = store.getters['auth/token'];
        const uid = store.getters['auth/uid'];
        const {data} = await axios.get(`users/${uid}/requests/${id}.json?auth=${token}`);

        return data
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger',
        }, {root: true});
      }
    },

    async remove({dispatch}, id) {
      try {
        const token = store.getters['auth/token'];
        const uid = store.getters['auth/uid'];
        await axios.delete(`users/${uid}/requests/${id}.json?auth=${token}`);

        dispatch('setMessage', {
          value: 'Заявка удалена',
          type: 'primary',
        }, {root: true});
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger',
        }, {root: true});
      }
    },

    async update({dispatch}, request) {
      try {
        const token = store.getters['auth/token'];
        const uid = store.getters['auth/uid'];
        await axios.put(`users/${uid}/requests/${request.id}.json?auth=${token}`, request);

        dispatch('setMessage', {
          value: 'Заявка обновлена',
          type: 'primary',
        }, {root: true});
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger',
        }, {root: true});
      }
    },

  }
}
