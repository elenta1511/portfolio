export default {
  namespaced: true,
  state: {
    categories: []
  },
    mutations: {
      SET_CATEGORIES: (state, categories) => {
        state.categories = categories;
      },
      ADD_CATEGORY: (state, category) => {
        state.categories.unshift(category);
      },
      REMOVE_CATEGORY: (state, CategoryId) => {
        state.categories = state.categories.filter(category =>
          category.id !== CategoryId
        );
      },
      EDIT_CATEGORY: (state, editedCategory) => {
        state.categories = state.categories.map(category =>
          category.id === editedCategory.id ? editedCategory : category
        );
      }
    },
  actions: {
    async addNewSkillGroup({ commit }, groupTitle) {
      try {
        const response = await this.$axios.post("/categories", {
          title: groupTitle
        });
        commit('ADD_CATEGORY', response.data);
        return response;
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async removeSkillGroup({ commit }, CategoryId) {
      try {
        const response = await this.$axios.delete(`/categories/${CategoryId}`);
        commit("REMOVE_CATEGORY", CategoryId);
        return response;
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async fetchCategories({ commit }) {
      try {
        const response = await this.$axios.get("/categories");
        commit("SET_CATEGORIES", response.data.reverse());
        return response;
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async editSkillGroup({ commit }, SkillsGroup) {
      try {
        const response = await this.$axios.post(`/categories/${SkillsGroup.id}`, {
          title: SkillsGroup.category
        });
        commit("EDIT_CATEGORY", response.data.SkillsGroup);
        return response;
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    }
  }
};