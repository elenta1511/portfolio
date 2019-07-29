<template lang="pug">
  .form-block
    h2.form-block__title Редактирование работы
    hr
    form.form.work-form.form-block__content.form-block__content--work
      .form__photo.form__photo--work(
        :class="{'photo_uploaded':this.renderedPhotoUrl.length}"
        :style="{'backgroundImage':`url(${this.renderedPhotoUrl})`}"
      )
        label.form__upload-photo-wrapper
          .form__upload-photo-container
            input(
              type="file"
              @change="appendPhoto"
            ).form__upload-photo-input
            .form__upload-photo-error
            .form__upload-photo-content
              span.form__upload-photo-desc Перетащите или загрузите для загрузки изображения
              .btn.btn--upload-work-photo Загрузить

      .form__text.form__text--work
        .form__row
          .form__col
            label.form__text-block(
              
            )
              span.form__label Название
              input.form__input.form__input--title#title(type="text" name="title" placeholder="Введите название работы" v-model="work.title")
              .form__text-block-error
                
        .form__row
          .form__col
            label.form__text-block
              
            
              span.form__label Ссылка
              input.form__input.form__input--link#link(type="text" name="link" placeholder="Вставьте ссылку" v-model="work.link")
              .form__text-block-error
          
        .form__row.form__row--textarea
          .form__col
            label.form__text-block.form__text-block--textarea(
            
              
            )
              span.form__label Описание
              textarea.form__textarea#description(name="description" rows="4" placeholder="Введите описание работы" v-model="work.description")
              .form__text-block-error
               
        .form__row.form__row--tags
          .form__col
            label.form__text-block(
            
              
            )
              span.form__label Добавление тега
              input.form__input.form__input--tags#tags(
                type="text"
                name="tags"
                placeholder="Если хотите, добавьте теги"
                v-model="work.techs"
                @change="ADD_TAGS(work.techs)"
              )
              .form__text-block-error
        .form__row
          .form__col(v-if="WorkForm.editMode")
            WorkTags

        .form__row.form__row--btns
          .form__col
            .form__btns
              button(
                type="button"
                @click.prevent="$emit('handleAddWork')"
              ).btn.btn--cancel-edit Отмена
              button(
                type="button"
                @click="saveEditedWork"
                @click.prevent="$emit('handleAddWork')"
              ).btn.btn--save-edit Сохранить
              
             
          
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
   components: {
    WorkTags: () => import("../works/work-tags.vue"),
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
    remotePhotoPath() {
      return `${"https://webdev-api.loftschool.com"}/${this.work.photo}`;
    },
  },
  methods: {
    ...mapActions("works", ["addWork", "editWork"]),
    ...mapMutations("works", ["CLOSE_FORM", "ADD_TAGS"]),
    

    appendPhoto(e) {
      const file = e.target.files[0];
      this.work.photo = file;
      const reader = new FileReader();
      try {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.renderedPhotoUrl = reader.result;
        };
      } catch (error) {}
    },
    async addNewWork() {
      
      try {
        const WorkData = this.WorkFormData();
        await this.addWork(WorkFormData);
      } catch (error) {
      }
    },
    WorkFormData() {
      const formData = new FormData();
      formData.append("title", this.work.title);
      formData.append("techs", this.work.techs);
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
      try {
        const newWorkData = 
         this.WorkFormData();
        await this.addWork(newWorkData);
      } catch (error) {}
    },

  created() {
    if (this.WorkForm.editMode) {
      this.setEditedWork();
      this.work.techs = "";
    }
  }
}
}
</script>

<style lang="postcss" scoped>

@import "../../../styles/mixins.pcss";
hr {
  height: .5px;
  background-color: #dedee0;
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
}
.form__text {
  width: 50%;
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
.form__upload-photo-desc {
  color: #414c63;
  opacity: .5;
  font-size: 16px;
  font-weight: 600;
  line-height: 2.5;
  width: 50%;
  margin-bottom: 22px;
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
</style>