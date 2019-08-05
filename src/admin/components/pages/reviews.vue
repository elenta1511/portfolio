<template lang="pug">
  .reviews-wrapper
    .container
      AdminTitle(
        headTitle='Блок «Отзывы»',
      )
      ReviewsForm(
        v-if="ReviewsForm.show"
      )
      ReviewBlocks(
         
      )
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {
    AdminTitle: () => import('../admin-title.vue'),
    ReviewsForm: () => import('../reviews/reviews-form.vue'),
    ReviewBlocks: () => import('../reviews/review-blocks.vue')
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState("reviews", {
      ReviewsForm: state => state.ReviewsForm,
      editedReview: state => state.editedReview
    })
  },
  created() {
    this.ReviewsForm.show = false;
  }
};
</script>

<style lang="postcss">
.reviews-wrapper {
  background-image: linear-gradient(rgba(#fff, 0.9), rgba(#fff, 0.9)),
    url("~images/content/admin_back.png");
  background-position: center center, center center;
  background-repeat: repeat, no-repeat;
  background-size: cover, cover;
  min-height: 100vh;
}
</style>