<template lang="pug">
  .skill-container
    input(type="text" v-model="skillTitle" placeholder="Название новой группы").skill-input
    button(type="button" @click="addSkillGroup") Добавить
    button(type="button" @click="addSkillGroup") Удалить
    hr
    br 
    br
    .add-skill-wrapper.blocked
      input(type="text" placeholder="Новый навык")
      input(type="text" placeholder="100%")
      button(type="button" @click="save") 
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      skillTitle: "",
      editedSkill: {...this.skill}
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
button {
  font-size: 16px;
  font-weight: 600;
  color: rgba(65, 76, 99, 0.5);
  

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