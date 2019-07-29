<template lang="pug">
  .container_skills-group
    .skills_group-header
      h2 {{category.category}}
      button.edit_group(type="button" @click="removeSkillsGroup")
    hr
    table.skills_table
      skills-item(
        v-for="skill in skills"
        :key="skill.id"
        :skill="skill"
      )
    .add-skill-wrapper.blocked
      input(type="text" v-model="skill.title" placeholder="Новый навык")
      input(type="text" v-model="skill.percent" placeholder="100%")
      button.add_skill(type="button" @click="addNewSkill") 
  
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    category: Object,
    skills: Array,
  },
  data() {
    return {
      skill: {
        category: this.category.id,
        title: "",
        percent: ""
      }
    }
  },
  components: {
    skillsItem: () => import("../skills/skill_item.vue")
  },
  methods: {
    
    ...mapActions('skills', ['addSkill']),
    async addNewSkill() {
      try {
        await this.addSkill(this.skill);
        this.skill.title="";
        this.skill.percent="";
      } catch (error) {}
    },
    ...mapActions('skillsCategories',['removeSkillGroup']),
    async removeSkillsGroup() {
      try {
        await this.removeSkillGroup(this.category.id);
      } catch (error) {}
    }
  }
};
</script>

<style lang="postcss" scoped>

@import "../../../styles/mixins.pcss";
input {
  border: none;
  border-bottom: 1px solid;
}
.container_skills-group {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr .1fr 1fr 1fr;
  align-items: center;
}

.skills_group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.edit_group {
  background: svg-load('pencil.svg', fill=#a0a5b1, width=100%, height=100%;);
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
}

  hr {
  height: .7px;
  background-color: #dedee0;
  border: none;
  width: 100%;
  }
  .skills_table {
    width: 100%
  }
  .add_skill {
  font-size: 16px;
  font-weight: 600;
  color: rgba(65, 76, 99, 0.5);
  background-color: transparent;

    &:before {
      content: "+";
      padding: 5px 8px;
      color: #fff;
      display: inline-block;
      background-image: linear-gradient(to right, #006aed, #3f35cb);
      border-radius: 50%;
      margin-right: 10px;
      flex-shrink: 0;
      font-size: 15px;
      font-weight: 600;
      line-height: 1;
      transition: background-image .3s;

    }

    &:hover {
      &:before {
        background-image: linear-gradient(to right, #3f35cb, #006aed);
      }
    }
  }
  </style>