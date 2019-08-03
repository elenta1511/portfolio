<template lang="pug">
  .skill-container
    .skill-container__input(
      :class="{'error' : validation.firstError('skillTitle')}"
    )
      input(type="text" v-model="skillTitle" placeholder="Название новой группы").skill-input
      .errors.errors_new-category
        errorsTooltip(
          :errorText="validation.firstError('skillTitle')"
        )
    .skill-container__btn
      button.skill_save(type="button" @click="addSkillGroup") 
      button.skill_cancel(type="button" @click.prevent="$emit('handleAddForm')") 
    hr
    br
    .add-skill-wrapper.blocked
      input.input_new-skill(type="text" placeholder="Новый навык")
      input.input_new-percent(type="text" placeholder="100%")
      button.add-skill_button(type="button" @click="save") 
</template>

<script>

import { mapActions } from "vuex";
import { Validator } from "simple-vue-validator";

export default {

  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "skillTitle": value => {
      return Validator.value(value).required("Введите название группы");
    }
  },
  components: {
    errorsTooltip: () => import("../errorTooltip.vue")
  },
  data() {
    return {
      skillTitle: "",
      editedSkill: {...this.skill},
      
    };
  },
  methods: {
    ...mapActions("categories", ["addNewSkillGroup"]),
    async addSkillGroup() {
      try {
        await this.addNewSkillGroup(this.skillTitle);
        this.skillTitle = "";
      } catch (error) {
        alert(error.message)
      }
    },
    ...mapActions("skills", ["editSkill"]),
    async save() {
      try {
        await this.editSkill(this.editedSkill);
        this.editmode = false;
      } catch (error) {
        
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.skill-input {
  height: 38px;
}
.skill-container__input {
  display: grid;
  grid-template-columns: 1fr .9fr .2fr;
  justify-items: end;
}
input {
  border: none;
  border-bottom: 1px solid;
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
  .skill-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
  }
  .skill_save {
  background: svg-load('tick.svg', fill=#00d70a, width=100%, height=100%;);
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
  align-self: center;
}
.skill_cancel {
  background: svg-load('remove.svg', fill=#bf2929, width=100%, height=100%;);
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
  align-self: center;
}
.add-skill-wrapper {
  display: grid;
  grid-template-columns: 1fr .5fr .3fr;
  grid-template-rows: 1fr;
}
.input_new-skill {
  width: 220px;
}
.input_new-percent {
  width: 70px;
  justify-self: end;
  text-align: center;
}
  </style>