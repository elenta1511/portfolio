<template lang="pug">
  .about-wrapper
    .container
      AdminTitle(
        headTitle='Блок «Обо мне»',
        :showAddButton = "!showAddForm",
        @handleAddForm="showAddForm = !showAddForm"
      )

    .container
      ul.skill-list
        li.skill-list__item(
            v-if="showAddForm"
            @handleAddForm="showAddForm = !showAddForm"
          )
          SkillsAdd(
            @handleAddForm="showAddForm = !showAddForm"
          )
        li.skill-list__item(
          v-for="category in categories"
          :key="category.id"
        )
          SkillsGroup(
            :category="category"
            :skills="filterSkillsByCategoryId(category.id)"
          )
</template>

<script>
import { mapActions, mapState } from 'vuex';


export default {
  components: {
  AdminTitle: () => import("../admin-title.vue"), 
  SkillsAdd: () => import("../skills/skills-add.vue"),
  SkillsGroup: () => import("../skills/skillsGroup.vue"),
  },
  data() {
    return {
      showAddForm: false
    };
  },
  computed: {
    ...mapState('categories', {
      categories: state => state.categories
    }),
    ...mapState('skills', {
      skills: state => state.skills
    })
  },
  methods: {
    ...mapActions('categories', ['fetchCategories']),
    ...mapActions('skills', ['fetchSkills']),
    filterSkillsByCategoryId(categoryId) {
      return this.skills.filter(skill => skill.category === categoryId);
    }
  },
  async created() {
    try {
      await this.fetchCategories(); 
    } catch (error) {
      alert('Произошла ошибка при загрузке категорий') 
    }
    try {
      await this.fetchSkills(); 
    } catch (error) {
      alert('Произошла ошибка при загрузке скиллов') 
    }
  }
};

</script>

<style lang="postcss" scoped>
@import "../../../styles/mixins.pcss";

.about-wrapper {
  background-image: linear-gradient(rgba(#fff, 0.9), rgba(#fff, 0.9)),
    url("~images/content/admin_back.png");
  background-position: center center, center center;
  background-repeat: repeat, no-repeat;
  background-size: cover, cover;
  min-height: 100vh;
}
.skill-list {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
}
.skill-list__item {
    margin-bottom: 1.875rem;
    width: 530px;
    height: 395px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
</style>