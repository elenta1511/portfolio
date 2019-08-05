<template lang="pug">
.tags
  ul.tags__list
    li.tags__item(
      v-for="(tag, index) in editedTags"
      :key="index"
    ) 
      span.tag__name {{tag}}
      button(
        type="button"
        @click="REMOVE_TAG(tag)"
      ).btn.btn--remove-tag
</template>


<script>

import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('works', {
      editedTags: state => state.editedTags
    })
  },
  methods: {
    ...mapMutations('works', ['REMOVE_TAG'])
  }
}

</script>

<style lang="postcss" scoped>

@import "../../../styles/mixins.pcss";
.tags__list {
  display: flex;
}
.tags__item {
  font-size: 13px;
  font-weight: 600;
  color: rgba(40, 51, 64, 0.7);
  border-radius: 14.9px;
  background-color: #f4f4f4;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  margin-right: 9px;
}
.tag__name {
  margin-right: 10px;
}
.btn--remove-tag {
  background: svg-load('remove.svg', fill=#414c63, width=100%, height=100%;) no-repeat;
  height: 10px;
  width: 10px;
  &:hover {
    background: svg-load('remove.svg', fill=#bf2929, width=100%, height=100%;) no-repeat;
  }
}
</style>