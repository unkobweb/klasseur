export const state = () => ({
  files: [],
  researchTags: [],
  selectedFile: null
});

export const mutations = {
  setFiles(state, data) {
    state.files = data
  },
  setSelectedFile(state, data) {
    state.selectedFile = data
  },
  setTagsOfAFile(state, data) {
    // find in files the file with the uuid of data.uuid
    // and set the tags of that file to data.tags
    state.files.find(file => file.uuid === data.uuid).tags = data.tags
  },
  addFile(state, data) {
    state.files.push(data)
  },
  removeFile(state, data) {
    state.files = state.files.filter(file => file !== data)
  },
  setResearchTags(state, data) {
    state.researchTags = data
  }
};

export const actions = {
  setFiles({commit}, data) {
    commit("setFiles", data)
  },
  setSelectedFile({commit}, data) {
    commit("setSelectedFile", data)
  },
  setTagsOfAFile({commit}, data) {
    commit("setTagsOfAFile", data)
  },
  addFile({commit}, data) {
    commit("addFile", data)
  },
  removeFile({commit}, data) {
    commit("removeFile", data)
  },
  setResearchTags({commit}, data) {
    commit("setResearchTags", data)
  }
};

export const getters = {
  getFiles(state) {
    return state.files
  },
  getSelectedFile(state) {
    return state.selectedFile
  },
  getResearchTags(state) {
    return state.researchTags
  }
};
  