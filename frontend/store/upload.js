export const state = () => ({
  file: null,
  tags: []
});

export const mutations = {
  setTags(state, data) {
    state.tags = data
  },
  setFile(state, data) {
    state.file = data
  }
};

export const actions = {
  setTags({commit}, data) {
    commit("setTags", data)
  },
  setFile({commit}, data) {
    commit("setFile", data)
  }
};

export const getters = {
  getState(state) {
    return state
  }
};
  