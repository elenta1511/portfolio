<template lang="pug">
  ul.review-block__list
    li.review-block__item.review-block__item--new-block
      button(
        type="button"
        @click="showFormAndTurnEditModeOff"
        
      ).btn.btn_add-review-block
        span.btn__review-block-icon +
        span.btn__review-block-title Добавить отзыв
    li.review-blocks__item(
      v-for="review in reviews"
      :key="review.id"
    )
      ReviewBlock(
        :review="review"
      )
</template>

<script>

import { mapState, mapActions, mapMutations } from "vuex";

export default {
  
  components: {
    ReviewBlock: () => import("../reviews/review-block.vue"),
  },
  computed: {
    ...mapState("reviews", {
       reviews: state => state.reviews
    })
  },
 methods: {
    ...mapMutations("reviews", ["SHOW_FORM", "TURN_EDIT_MODE_OFF"]),
    ...mapActions("reviews", ["fetchReviews"]),
    
    showFormAndTurnEditModeOff() {
      this["TURN_EDIT_MODE_OFF"]();
      this["SHOW_FORM"]();
    }
  },

  async created() {
    try {
      this.fetchReviews();
     
    } catch (error) {
      
    }
  }
};
</script>

<style lang="postcss" scoped>

@import "../../../styles/mixins.pcss";
.btn_add-review-block {
  width: 340px;
  height: 380px;
  background-image: linear-gradient(to right, #006aed, #3f35cb);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.btn__review-block-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  width: 60%;
  line-height: 2;
}
.review-block__list {
    display: grid;
    max-width: 1100px;
    margin: 0 auto;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 30px;
    justify-items: center;
}
.review-block__item--new-block {
  width: 340px;
  height: 380px;
  
}
.review-blocks__item {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  background-color: #ffffff;
  width: 340px;
  height: 380px;
  
  margin-bottom: 30px;
}
.btn__review-block-icon {
  height: 150px;
  width: 150px;
  border: 3px solid #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  color: #fff;
  margin-bottom: 25px;
}

</style>
