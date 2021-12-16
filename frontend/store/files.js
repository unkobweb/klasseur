export const state = () => ({
  files: [],
  selectedFile: null
});

export const mutations = {
  setFiles(state, data) {
    state.files = data
  },
  setSelectedFile(state, data) {
    state.selectedFile = data
  },
  addFile(state, data) {
    state.files.push(data)
  },
  removeFile(state, data) {
    state.files = state.files.filter(file => file !== data)
  },
};

export const actions = {
  setFiles({commit}, data) {
    commit("setFiles", data)
  },
  setSelectedFile({commit}, data) {
    commit("setSelectedFile", data)
  },
  addFile({commit}, data) {
    commit("addFile", data)
  },
  removeFile({commit}, data) {
    commit("removeFile", data)
  }
};

export const getters = {
  getFiles(state) {
    return state.files
  },
  getSelectedFile(state) {
    return state.selectedFile
  }
};
  