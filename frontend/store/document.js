export const state = () => ({
  documents: []
});

export const mutations = {
  setDocuments(state, data) {
    state.documents = data
  }
};

export const actions = {
  setDocuments({commit}, data) {
    commit("setDocuments", data)
  }
};

export const getters = {
  getDocuments(state) {
    return state.documents
  }
};
  