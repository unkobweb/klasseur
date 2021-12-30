export const state = () => ({
  config: {},
});

export const mutations = {
  setConfig(state, data) {
    for (const key of Object.keys(data)) {
      state.config[key] = data[key]
    }
  },
  deleteAttribute(state, data) {
    delete state.config[data]
  }
};

export const actions = {
  setConfig({commit}, data) {
    commit("setConfig", data)
  },
  deleteConfigAttribute({commit}, data) {
    commit("setConfig", data)
  }
};

export const getters = {
  getConfig(state) {
    return state.config
  }
};