import Vue from "vue";
import Vuex from "vuex";

import user from './modules/user'
import categories from './modules/categories'
import skills from './modules/skills'
import skillsCategories from './modules/skillsCategories'
import works from './modules/works'
import reviews from './modules/reviews'
import tooltip from './modules/tooltip'


Vue.use(Vuex);



export default new Vuex.Store({
  modules: {
    user,
    categories,
    skills,
    skillsCategories,
    works,
    reviews,
    tooltip
  }
});