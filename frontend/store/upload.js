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
  }
};

export const actions = {
  setFile({commit}, data) {
    commit("setFile", data)
  },
  setTags({commit}, data) {
    console.log("IN STORE",data)
    commit("setTags", data)
  }
};

export const getters = {
  getState(state) {
    return state
  }
};
  