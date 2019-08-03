<template lang="pug">
  .container_skills-group
    .skills_group-header(v-if="editmode === false")
      h2 {{editedCategory.category}}
      button.edit_group(type="button" @click="editmode = true")

    .skills_group-header--edit(v-else)(:class="{'error' : validation.firstError('editedCategory.category')}") 
      td
        input.skill_edit__input(type="text" v-model="editedCategory.category")
        .errors.errors-category
          errorsTooltip(
          :errorText="validation.firstError('editedCategory.category')" 
          )
      td.cell_skill-icon
        button.skill_save(type="button" @click="editGroupCategory(editedCategory)")
        button.skill_cancel(type="button" @click="removeGroup")
    hr
    table.skills_table
      skills-item(
        v-for="skill in skills"
        :key="skill.id"
        :skill="skill"
      )
    .add-skill-footer
      .add-skill-wrapper.blocked(:class="{'error' : validation.firstError('skill.title')}")
        input.input_new-skill(type="text" v-model="skill.title" placeholder="Новый навык")
        .errors.errors-skill
          errorsTooltip(
            :errorText="validation.firstError('skill.title')"
          )
      .add-skill-wrapper(:class="{'error' : validation.firstError('skill.percent')}")
        input.input_new-percent(type="text" v-model="skill.percent" placeholder="100%")
        .errors.errors-percent
          errorsTooltip(
            :errorText="validation.firstError('skill.percent')"
          )
      button.add-skill_button(type="button" @click="addNewSkill") 
  
</template>

<script>

import { mapActions } from "vuex";
import { Validator } from "simple-vue-validator";

export default {

  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "editedCategory.category": value => {
      return Validator.value(value).required("Введите название группы");
    },
    "skill.title": value => {
      return Validator.value(value).required("Введите название навыка");
    },
    "skill.percent": value => {
      return Validator.value(value).required("Введите значение").digit("Введите число").between(0, 100, "Число от 0 до 100");
    },
  },
  props: {
    category: Object,
    skills: Array,
  },
  data() {
    return {
     editedCategory: {...this.category},
      skill: {
        category: this.category.id,
        title: "",
        percent: ""
      },
      editmode: false
    }
  },
  components: {
    skillsItem: () => import("../skills/skill_item.vue"),
    errorsTooltip: () => import("../errorTooltip.vue")
  },
  methods: {
    
    ...mapActions('skills', ['addSkill']),
    ...mapActions('categories', ['editSkillGroup', 'removeSkillGroup']),
    async addNewSkill() {
      try {
        await this.addSkill(this.skill);
        this.skill.title="";
        this.skill.percent="";
      } catch (error) {}
    },

    async editGroupCategory(editedCategory) {
      if ((await this.$validate("editedCategory.category")) === false) return;
      try {
        await this.editSkillGroup(this.editedCategory);
        editmode=false
      } catch (error) {
        console.log(error.message);
     
      }
    },

    async removeGroup() {
      try {
        await this.removeSkillGroup(this.category.id);
      } catch (error) {
      }
    }
  }
};
</script>

<style lang="postcss" scoped>

@import "../../../styles/mixins.pcss";
.skills_group-header--edit {
  display: grid;
  grid-template-columns: 1fr .2fr;
}
.cell_skill-icon {
  display: grid; 
  grid-template-columns: repeat(2, .5fr);
  justify-items: end;
}
.errors {
  position: relative;
}

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
  &:hover {
    background: svg-load('pencil.svg', fill=#3f35cb, width=100%, height=100%;);
    transition: background .3s;
  }
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
 .add-skill_button {
  height: 40px;
  width: 40px;
  background-image: linear-gradient(to right, #006aed, #3f35cb);
  border-radius: 50%;
  justify-self: end;

    &:before {
      content: "+";
      color: #fff;
      font-size: 18px;
      font-weight: 800;
      line-height: 1;
    }
    &:hover {
        background-image: linear-gradient(to right, #3f35cb, #006aed);
    }
  }
  .add-skill-wrapper {
  display: grid;
  grid-template-rows: 1fr 1fr;
}
.add-skill-footer {
  display: grid;
  grid-template-columns: 1fr .6fr .5fr;
}
.input_new-skill {
  width: 220px;
}
.input_new-percent {
  width: 70px;
  justify-self: end;
  text-align: center;
}
.skill_save {
  background: svg-load('tick.svg', fill=#00d70a, width=100%, height=100%;);
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
}
.skill_cancel {
  background: svg-load('remove.svg', fill=#bf2929, width=100%, height=100%;);
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;  
}
.errors {
  display: none;
}
.error {
  .errors {
    display: block;
  }
}
.errors-percent {
  .error-tooltip {
    top: 9px;
    left: 40%;
  }
}
.errors-skill,
.errors-category {
  .error-tooltip {
    top: 9px;
  }
}

  </style>