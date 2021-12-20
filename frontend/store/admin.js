export const state = () => ({
  menu: 0,
});

export const mutations = {
  setMenu(state, data) {
    state.menu = data
  }
};

export const actions = {
  setMenu({commit}, data) {
    commit("setMenu", data)
  }
};

export const getters = {
  getMenu(state) {
    return state.menu
  }
};
    