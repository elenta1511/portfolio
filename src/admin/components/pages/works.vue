<template lang="pug">
  .works-wrapper
    .container
      AdminTitle(
        headTitle='Блок «Работы»',
      )
      WorkForm(
        v-if="WorkForm.show"
      )
      WorkBlocks
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    AdminTitle: () => import('../admin-title.vue'),
    WorkForm: () => import('../works/work-form.vue'),
    WorkBlocks: () => import('../works/work-blocks.vue')
  },
  data() {
    return {
     showAddWork: false
    }
  },
  computed: {
    ...mapState('works', {
      WorkForm: state => state.WorkForm
    })
  },
  created() {
    this.WorkForm.show = false;
  }
}
</script>

<style lang="postcss">
.works-wrapper {
  background-image: linear-gradient(rgba(#fff, 0.9), rgba(#fff, 0.9)),
    url("~images/content/admin_back.png");
  background-position: center center, center center;
  background-repeat: repeat, no-repeat;
  background-size: cover, cover;
}
</style>