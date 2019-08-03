<template lang="pug">
  tr(v-if="editmode === false")
    td {{skill.title}}
    td {{skill.percent}} %
    td.cell_skill-icon
      button.skill_edit(type="button" @click="editmode = true")
      button.skill_delete(type="button" @click="removeExistedSkill") 
      
  
  tr(v-else)
    td 
      input.skill_edit__input(type="text" v-model="editedSkill.title")
    td 
      input.skill_edit__input(type="text" v-model="editedSkill.percent")
    td.cell_skill-icon
      button.skill_save(type="button" @click="save") 
      button.skill_cancel(type="button" @click="editmode = false")

</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    skill: Object
  },
  data() {
    return {
      editmode: false,
      editedSkill: {...this.skill}
    }
  },
  methods: {
    ...mapActions("skills", ["removeSkill", "editSkill"]),
    async removeExistedSkill() {
      try {
        await this.removeSkill(this.skill.id);
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

@import "../../../styles/mixins.pcss";

button {
  background-color: transparent;
}
.skill_edit {
  background: svg-load('pencil.svg', fill=#a0a5b1, width=100%, height=100%;);
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
  &:hover {
    background: svg-load('pencil.svg', fill=#3f35cb, width=100%, height=100%;);
    transition: background .3s;
  }
}
.skill_delete {
  background: svg-load('trash.svg', fill=#a0a5b1, width=100%, height=100%;);
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
  &:hover {
    background: svg-load('trash.svg', fill=#bf2929, width=100%, height=100%;);
    transition: background .3s;
  }
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
.skill_edit__input {
  border: none;
  border-bottom: 1px solid;
}
.cell_skill-icon {
  display: flex;
  justify-content: space-around;
}
</style>