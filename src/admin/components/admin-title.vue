<template lang="pug">
  section.admin-head
    .admin-head__title
      h2.admin-title {{headTitle}}
    .admin-head__controls
      button.admin-add(
        v-if="showAddButton"
        @click="$emit('handleAddForm')"
        )
        .admin-add__icon
        | Добавить группу
</template>

<script>
export default {
  props:{
    headTitle: String,
    showAddButton: Boolean
  },
  data(){
    return{
    
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";
.admin-head {
  padding: 54px 0;
  display: flex;
  align-items: center;
  
  @include tablets {
    padding: 45px 20px;
  }
}
.admin-head__title{
  margin-right: 54px;
}
.admin-title {
  font-size: 21px;
  font-weight: 700;
}
section {
  display: block;
  height: auto;
}
.admin-add {
  font-size: 16px;
  font-weight: 600;
  color: #383bcf;
  display: flex;
  justify-content: baseline;
  background-color: transparent;
  align-items: center;

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
    &-icon {
  color: #006aed;
}
    }


</style>