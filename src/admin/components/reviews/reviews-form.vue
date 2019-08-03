<template lang="pug">
  .reviews-block
    h2.review-block__title {{FormTitle}}
    hr
    form.review-block__content
      .avatar
        .review-block__avatar(
        :class="{'photo_upload':this.renderedPhotoUrl.length}",
        :style="{'backgroundImage' : `url(${this.renderedPhotoUrl})`}"
        )
          .review-block__avatar--icon  
        label.review-block__upload-photo
          .review-block__upload-photo-container
            input(
              type="file"
              @change="appendPhoto"
            ).review-block__upload-photo-input
            .review-block__upload-photo-error
          .review-block__upload-photo-content
            .btn.review-block__upload-review-photo Добавить фото

      .form__text.form__text--review
        .form__text--flex
          .form__row
            .form__col
              label.form__text-block(
              
              )
                span.form__label Имя автора
                input.form__input.form__input--name(name="author" placeholder="Введите ваше имя" v-model="review.author")
                .form__text-block-error
                
          .form__row
            .form__col
              label.form__text-block
              
            
                span.form__label Титул автора
                input.form__input.form__input--prof(name="occ" placeholder="Введите ваш титул" v-model="review.occ")
                .form__text-block-error
          
        .form__row.form__row--textarea
          .form__col
            .form__col--textarea
              label.form__text-block.form__text-block--textarea(
            
              
              )
                span.form__label Отзыв
                textarea.form__textarea(name="text" rows="4" placeholder="Напишите ваш отзыв" v-model="review.text")
                .form__text-block-error
               
        .form__row.form__row--btns
          .form__col
            .form__btns
              button(
                type="button"
                @click="CLOSE_FORM"
              ).btn.btn--cancel-edit Отмена

              button(
               type="button"
                v-if="!ReviewsForm.editMode"
                @click="addNewReview"
              ).btn.btn--save-edit.addnew Сохранить
            
              button(
                type="button"
                v-if="ReviewsForm.editMode"
                @click="saveEditedReview"
              ).btn.btn--save-edit Сохранить
              
</template>

<script>

import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  
   data() {
    return {
      renderedPhotoUrl: "",
      review: {
        photo: "",
        author: "",
        occ: "",
        text: ""
      }
    };
  },
  computed: {
    ...mapState("reviews", {
      ReviewsForm: state => state.ReviewsForm,
      editedReview: state => state.editedReview
    }),

    FormTitle() {
      switch (this.ReviewsForm.editMode) {
        case true:
          return "Редактирование отзыва";
          break;
        case false:
          return "Новый отзыв";
          break;
      }
    },
    
    remotePhotoPath() {
      return `${"https://webdev-api.loftschool.com"}/${this.review.photo}`;
    }
  },
  methods: {
    ...mapMutations('reviews', ['CLOSE_FORM']),
    ...mapActions('reviews', ['addReview', 'editReview']),
    
    appendPhoto(e) {
      const file = e.target.files[0];
      this.review.photo = file;
      const reader = new FileReader();
      try {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.renderedPhotoUrl = reader.result;
        };
      } catch (error) {
        console.error(error.message);
      }
    },
    createReviewFormData() {
      const formData = new FormData();
      formData.append("author", this.review.author);
      formData.append("occ", this.review.occ);
      formData.append("text", this.review.text);
      formData.append("photo", this.review.photo);
      return formData;
    },
    async addNewReview() {
      
      try {
        const reviewFormData = this.createReviewFormData();
        await this.addReview(reviewFormData);
        this['CLOSE_FORM']();
      } catch (error) {
        
      }
    },
    setEditedReview() {
      this.review = { ...this.editedReview };
      this.renderedPhotoUrl = this.remotePhotoPath;
    },
    async saveEditedReview() {
      try {
        const reviewData = {
          id: this.review.id,
          data: this.createReviewFormData()
        };
        await this.editReview(reviewData);
        this["CLOSE_FORM"]();
      } catch (error) {
        console.error(error.message);
        
      }
    }
  },
  created() {
    if (this.ReviewsForm.editMode) {
      this.setEditedReview();
    }
  }
};
</script>

<style lang="postcss" scoped>

@import "../../../styles/mixins.pcss";

hr {
  height: 1px;
  background-color: #dedee0;
  margin-bottom: 45px;
  border: none;
}
.reviews-block {
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  padding: 0 18px;
  padding-top: 23px;
  padding-bottom: 27px;
  height: 513px;
  width: 1082px;
  margin: 0 auto;
}
.review-block__content {
  display: flex;
}
.review-block__title {
  margin-bottom: 25px;
}
.review-block__avatar {
  width: 204px;
  height: 204px;
  border-radius: 50%;
  background-color: #dee4ed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.review-block__avatar--icon {
  width: 204px;
  height: 204px;
  background-image: url("~images/content/user.png");
  background-position: center;
  background-repeat: no-repeat;
}
.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 30px;
}
.review-block__upload-review-photo {
  color: #4548d2;
  cursor: pointer;
  margin-top: 25px;
  font-weight: 600;
}
.form__text {
  width: 610px;
}

.form__text--flex {
  display: flex;
  justify-content: space-between;
}

.form__label {
  color: #414c63;
  opacity: .5;
  font-weight: 600;
  margin-bottom: 10px;
}
.form__text-block {
  display: flex;
  flex-direction: column;
}
.review-block__upload-photo-input {
  display: none;
}
.form__upload-photo-content {
 display: flex;
 flex-direction: column;
 align-items: center;  
}
.form__upload-photo-desc {
  color: #414c63;
  opacity: .5;
  font-size: 16px;
  font-weight: 600;
  line-height: 2.5;
  width: 50%;
  margin-bottom: 22px;
}

.form-block__content {
  display: flex;
  width: 100%;
}
.form__input {
  border: none;
  border-bottom: 1px solid;
  height: 35px;
  margin-bottom: 27px;
  width: 290px;
}
.form__textarea {
  height: 120px;
  resize: none;
}
.form__btns {
  display: flex;
}
.form__row--btns {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
.btn--save-edit {
  width: 165px;
  height: 50px;
  background-image: linear-gradient(to right, #006aed, #3f35cb);
  transition: linear-gradient .3s;
  border-radius: 30px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(to right, #3f35cb, #006aed);
    transition: linear-gradient .3s;
  }
}
.btn--cancel-edit {
  background-image: none;
  background-color: transparent;
  color: #3f35cb;
  text-transform: none;
  font-weight: 600;
  margin-right: 60px;
  &:hover {
    background-image: none;
  }
}
.photo_upload {
  background-repeat: no-repeat;
  background-size: cover;
  .review-block__avatar--icon {
    background-image: none;
  }
}
</style>