export const state = () => ({
  file: null,
  tags: []
});

export const mutations = {
  setFile(state, data) {
    state.file = data
  },
  setTags(state, data) {
    state.tags = data
  },
  addTag(state, data) {
    state.tags.push(data)
  },
  removeTag(state, data) {
    state.tags = state.tags.filter(tag => tag !== data)
  }
};

export const actions = {
  setFile({commit}, data) {
    commit("setFile", data)
  },
  setTags({commit}, data) {
    commit("setTags", data)
  },
  addTag({commit}, data) {
    commit("addTag", data)
  },
  removeTag({commit}, data) {
    commit("removeTag", data)
  }
};

export const getters = {
  getState(state) {
    return state
  }
};
  