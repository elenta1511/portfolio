<template lang="pug">
  .review-block
    .review-block__header
      .review-block__avatar#avatar( :style="{'backgroundImage' : `url(${this.remotePhotoPath})`}")
      .review-block__content
        .review-block__text-content
          h3.review-block__name {{review.author}}
        .review-block__prof
          p {{review.occ}}
    hr
    .review-block__content-review
      .review-block__desc
        p {{review.text}}
      .review-block__btns
        button(
          type="button"
          @click="editReview"
        ).btn.btn-block_edit Править
          .btn__icon.icon-edit
        button(
          type="button"
          @click="remove"
        ).btn.btn-block_remove Удалить
          .btn__icon.icon-remove
</template>

<script>

import { mapActions, mapMutations } from 'vuex';
export default {
  props: {
    review: Object
  },
  computed: {
    remotePhotoPath() {
      return `${"https://webdev-api.loftschool.com"}/${this.review.photo}`;
    },
  },
  methods: {
    ...mapActions('reviews', ['removeReview']),
    ...mapMutations('reviews', ['SHOW_FORM', 'TURN_EDIT_MODE_ON', 'SET_EDITED_REVIEW']),
    ...mapMutations('tooltip', ['SHOW_TOOLTIP']),
    
    showFormAndTurnEditModeOn() {
      this['TURN_EDIT_MODE_ON']();
      this['SHOW_FORM']();
    },
    setEditedReview() {
      this['SET_EDITED_REVIEW'](this.review);
    },
    editReview() {
      this.setEditedReview();
      this.showFormAndTurnEditModeOn();
    },
    async remove() {
      try {
        await this.removeReview(this.review.id);
        this['SHOW_TOOLTIP']({
          type: 'success',
          text: 'Отзыв удален'
        });
      } catch (error) {
        this['SHOW_TOOLTIP']({
          type: 'error',
          text: 'Произошла ошибка'
        });
      }
    }
  }
};

</script>

<style lang="postcss" scoped>
#avatar {
  margin-right: 20px;
}
.review-block {
  height: 100%;
  padding: 30px 30px;
  position: relative;
}
.review-block__header {
  display: flex;
}
.review-block__avatar {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-position: top;
  background-size: 100%;
}
.review-block__name {
  font-size: 18px;
  color: #414c63;
  font-weight: 700;
}
.review-block__prof {
  color: #414c63;
  font-weight: 600;
  opacity: .5;
}
hr {
  margin: 30px 0;
  height: 1px;
  background-color: #dedee0;
  border: none;
}
.review-block__desc {
  color: #414c63;
  font-weight: 600;
  opacity: .7;
}
.review-block__btns {
  position: absolute;
  bottom: 10%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 75px;
  color: rgba(65, 76, 99, 0.502);
  font-weight: 600;
}
.btn-block_edit, 
.btn-block_remove {
  background-color: transparent;
  color: rgba(65, 76, 99, 0.502);
  display: flex;
  align-items: baseline;
}
.btn__icon {
  background-repeat: no-repeat;
  height: 14px;
  width: 14px; 
  margin-left: 10px;
  &:hover {
    height:16px;
    width: 16px;
    transition:  .3s;
  }
}
.icon-edit {
  background: svg-load('pencil.svg', fill=#3f35cb, width=100%, height=100%;);
}
.icon-remove {
  background: svg-load('remove.svg', fill=#bf2929, width=100%, height=100%;);
}
</style>

