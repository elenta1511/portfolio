<template lang="pug">
  .form-block
    h2.form-block__title {{WorkTitle}}
    hr
    form.form.work-form.form-block__content.form-block__content--work
      .form__photo.form__photo--work(
        :class="{'photo_uploaded':this.renderedPhotoUrl.length, 'error' : validation.firstError('renderedPhotoUrl')}"
        :style="{'backgroundImage':`url(${this.renderedPhotoUrl})`}"
      )
        label.form__upload-photo-wrapper
          .form__upload-photo-container
            input(
              type="file"
              @change="appendPhoto"
            ).form__upload-photo-input
            .form__upload-photo-error
              errorsTooltip(
                :errorText="validation.firstError('renderedPhotoUrl')"
              )
            .form__upload-photo-content
              span.form__upload-photo-desc Перетащите или загрузите для загрузки изображения
              .btn--upload-work-photo Загрузить
              .form__upload-photo-content-tablets Изменить превью

      .form__text.form__text--work
        .form__row
          .form__col
            label.form__text-block(
              :class="{'error' : validation.firstError('work.title')}"
            )
              span.form__label Название
              input.form__input.form__input--title#title(type="text" name="title" placeholder="Введите название работы" v-model="work.title")
              .form__text-block-error
                errorsTooltip(
                  :errorText="validation.firstError('work.title')"
              )

        .form__row
          .form__col
            label.form__text-block(
               :class="{'error' : validation.firstError('work.link')}"
            )
              span.form__label Ссылка
              input.form__input.form__input--link#link(type="text" name="link" placeholder="Вставьте ссылку" v-model="work.link")
              .form__text-block-error
                errorsTooltip(
                  :errorText="validation.firstError('work.link')"
              )           

        .form__row.form__row--textarea
          .form__col
            label.form__text-block.form__text-block--textarea(
              :class="{'error' : validation.firstError('work.description')}" 
            )
              span.form__label Описание
              textarea.form__textarea#description(name="description" rows="4" placeholder="Введите описание работы" v-model="work.description")
              .form__text-block-error.form__text-block-error--textarea
                errorsTooltip(
                  :errorText="validation.firstError('work.description')"
                )       

        .form__row.form__row--tags
          .form__col
            label.form__text-block(
              for="tags"
              :class="{'error' : validation.firstError('editedTagsAsString')}"            
            )
              span.form__label Добавление тега
              input.form__input.form__input--tags#tags(
                type="text"
                name="tags"
                placeholder="Добавьте теги"
                v-model="work.techs"
                @change="ADD_TAGS(work.techs)"
              )
              .form__text-block-error
                errorsTooltip(
                  :errorText="validation.firstError('editedTagsAsString')"
                )          
        .form__row
          .form__col(v-if="WorkForm.editMode")
            formTags

        .form__row.form__row--btns
          .form__col
            .form__btns
              button(
                type="button"
                @click="CLOSE_FORM"
              ).btn.btn--cancel-edit Отмена
              button(
                type="button"
                @click="addNewWork"
                v-if="!WorkForm.editMode"
              ).btn.btn--save-edit Сохранить
              button(
                type="button"
                v-if="WorkForm.editMode"
                @click="saveEditedWork"
              ).btn.btn--save-edit Сохранить
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { Validator } from "simple-vue-validator";

export default {
    mixins: [require("simple-vue-validator").mixin],
  validators: {
    renderedPhotoUrl: value => {
      return Validator.value(value).required("Загрузите фото");
    },
    "work.title": value => {
      return Validator.value(value).required("Введите название");
    },
    "work.link": value => {
      return Validator.value(value).required("Вставьте ссылку");
    },
    "work.description": value => {
      return Validator.value(value).required("Введите описание");
    },
    editedTagsAsString: value => {
      return Validator.value(value).required("Укажите хотя бы один тег");
    }
  },
  components: {
    formTags: () => import("../works/form-tags.vue"),
    errorsTooltip: () => import("../errorTooltip.vue")
  },
   data() {
    return {
      renderedPhotoUrl: "",
      work: {
        title: "",
        techs: "",
        photo: "",
        link: "",
        description: ""
      }
    };
  },
  computed: {
    ...mapState("works", {
      WorkForm: state => state.WorkForm,
      editedWork: state => state.editedWork,
      editedTags: state => state.editedTags
    }),
    WorkTitle() {
      switch (this.WorkForm.editMode) {
        case true:
          return "Редактирование работы";
          break;
        case false:
          return "Добавление работы";
          break;
      }
    },
    remotePhotoPath() {
      return `${"https://webdev-api.loftschool.com"}/${this.work.photo}`;
    },
     editedTagsAsString() {
      return this.editedTags.join(",");
    }
  },  
   methods: {
    ...mapActions("works", ["addWork", "editWork"]),
    ...mapMutations("works", ["CLOSE_FORM", "ADD_TAGS"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),
    appendPhoto(e) {
      if ((this.$validate()) === false) return;
      const file = e.target.files[0];
      this.work.photo = file;
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
    async addNewWork() {
      if ((await this.$validate()) === false) return;
      try {
        const workFormData = this.createWorkFormData();
        await this.addWork(workFormData);
        this["SHOW_TOOLTIP"]({
          type: "success",
          text: "Работа добавлена"
        });
        this["CLOSE_FORM"]();
      } catch (error) {
        console.error(error.message);
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: "Произошла ошибка"
        });
      }
    },
    createWorkFormData() {
      const formData = new FormData();
      formData.append("title", this.work.title);
      if (this.WorkForm.editMode) {
        formData.append("techs", this.editedTagsAsString);
      } else {
        formData.append("techs", this.work.techs);
      }
      formData.append("photo", this.work.photo);
      formData.append("link", this.work.link);
      formData.append("description", this.work.description);
      return formData;
    },
    setEditedWork() {
      this.work = { ...this.editedWork };
      this.renderedPhotoUrl = this.remotePhotoPath;
    },
    async saveEditedWork() {
      if ((await this.$validate()) === false) return;
      try {
        const workData = {
          id: this.work.id,
          data: this.createWorkFormData()
        };
        await this.editWork(workData);
        this['SHOW_TOOLTIP']({
          type: 'success',
          text: 'Работа обновлена'
        });
        this["CLOSE_FORM"]();
      } catch (error) {
        console.error(error.message);
        this['SHOW_TOOLTIP']({
          type: 'error',
          text: 'Произошла ошибка'
        });
      }
    }
  },
  created() {
    if (this.WorkForm.editMode) {
      this.setEditedWork();
      this.work.techs = "";
    }
  }
};
</script>

<style lang="postcss" scoped>

@import "../../../styles/mixins.pcss";

hr {
  margin-bottom: 45px;
}
.form-block {
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  padding: 0 18px;
  padding-top: 23px;
  padding-bottom: 27px;
  height: 778px;
  width: 1090px;
  margin: 0 auto;
  @include tablets {
    width: 720px;
    height: 1100px;
  }
  @include phones {
    width: 320px;
    height: 1040px;
  }
}
.form-block__title {
  margin-bottom: 25px;
}
.form__photo {
  width: 493px;
  height: 277px;
  border: 0.5px dashed;
  background-color: #dee4ed;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
  width: 50%;
  @include tablets {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 30px;
    position: relative;
  }
  @include phones {
    height: 160px;
    width: 280px;
  }
}
.form__text {
  width: 50%;
  @include tablets {
    width: 80%;
  }
  @include phones {
    width: 100%;
  }
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
.form__upload-photo-input {
  display: none;
}
.form__upload-photo-content {
 display: flex;
 flex-direction: column;
 align-items: center;  
}
.btn--upload-work-photo {
  width: 165px;
  height: 50px;
  background-image: linear-gradient(to right, #006aed, #3f35cb);
  transition: background-image .3s;
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
    transition: background-image .3s;
  }
  @include tablets {
    display: none;
  }
}
.form__upload-photo-content-tablets {
  color: #3f35cb;
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  bottom: -23px;
  cursor: pointer;
  display: none;
  @include tablets {
    display: block;
  }
}
.form__upload-photo-desc {
  color: #414c63;
  opacity: .5;
  font-size: 16px;
  font-weight: 600;
  line-height: 2.5;
  width: 50%;
  margin-bottom: 22px;
  @include tablets {
    display: none;
  }
}
.btn {
  width: 165px;
  height: 50px;
  background-image: linear-gradient(to right, #006aed, #3f35cb);
  transition: background-image .3s;
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
    transition: background-image .3s;
  }
}

.form-block__content {
  display: flex;
  width: 100%;
  @include tablets {
    flex-direction: column;
    align-items: center;
  }
}
.form__input {
  border: none;
  border-bottom: 1px solid;
  height: 35px;
  margin-bottom: 27px;
}
.form__textarea {
  height: 176px;
  resize: none;
}
.form__btns {
  display: flex;
}
.form__row--btns {
  display: flex;
  justify-content: flex-end;
}
.btn--cancel-edit {
  background-image: none;
  background-color: transparent;
  color: #3f35cb;
  text-transform: none;
  &:hover {
    background-image: none;
  }
}
.photo_uploaded {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .form__upload-photo-desc {
    opacity: 0;
  }
}
.form__text-block-error,
.form__upload-photo-error {
  display: none;
}
.error {
  .form__text-block-error,
  .form__upload-photo-error {
    display: block;
    position: relative;
  }
}
.error-tooltip {
  bottom: -4px;
}
.form__text-block-error--textarea {
  .error-tooltip {
  bottom: 0;
  }
}
.form__upload-photo-error {
  .error-tooltip {
    bottom: -230px;
    left: -31px; 
  }
}
.tags__list {
  display: flex;
}
</style>