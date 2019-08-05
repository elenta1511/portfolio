<template lang="pug">
  .skill-container
    .skill-container__input(
      :class="{'error' : validation.firstError('groupTitle')}"
    )
      .skill-container_new
        input(type="text" v-model="groupTitle" placeholder="Название новой группы").skill-input
        .errors.errors_new-category
          errorsTooltip(
            :errorText="validation.firstError('groupTitle')"
          )
      .skill-container__btn
        button.skill_save(type="button" @click="addSkillGroup") 
        button.skill_cancel(type="button" @click="$emit('handleAddForm')") 
    hr
    br
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

import { mapActions, mapMutations } from "vuex";
import { Validator } from "simple-vue-validator";

export default {

  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "groupTitle": value => {
      return Validator.value(value).required("Введите название группы");
    },
    "skill.title": value => {
      return Validator.value(value).required("Введите название навыка");
    },
    "skill.percent": value => {
      return Validator.value(value).required("Введите значение").digit("Введите число").between(0, 100, "Число от 0 до 100");
    }
  },
  components: {
    errorsTooltip: () => import("../errorTooltip.vue")
  },
  data() {
    return {
      groupTitle: "",
      editedSkill: {...this.skill},
       skill: {
        title: "",
        percent: ""
      },
    };
  },
  methods: {
    ...mapActions("categories", ["addNewSkillGroup"]),
    ...mapActions("skills", ["editSkill","addSkill"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    async addSkillGroup() {
      try {
        await this.addNewSkillGroup(this.groupTitle);
        this.groupTitle = "";
        this["SHOW_TOOLTIP"]({
          type: "success",
          text: "Группа добавлена"
        });
      } catch (error) {
        console.error(error.message);
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: "Произошла ошибка"
        });
      }
    },
        async addNewSkill() {
      try {
        await this.addSkill(this.skill);
        this.skill.title="";
        this.skill.percent="";
      } catch (error) {}
    },
    
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
  grid-template-columns: 1fr .2fr;
  grid-template-rows: auto;
  width: 100%;
}
.skill-container__btn {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  grid-template-rows: 1fr 1fr;
}
.input_new-skill {
  width: 220px;
}
.input_new-percent {
  width: 70px;
  justify-self: end;
  text-align: center;
}
.errors {
  display: none;
  position: relative;
}
.error {
  .errors {
    display: block;
  }
}
.errors_new-category,
.errors-skill {
  .error-tooltip {
    top: 9px;
  }
}
.errors-percent {
  .error-tooltip {
    top: 9px;
    left: 40%;
  }
}
.add-skill-footer {
  display: grid;
  grid-template-columns: 1fr .6fr .5fr;
}
  </style>