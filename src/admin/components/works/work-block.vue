<template lang="pug">
  .work-block
    .work-block__header
      img(:src="remotePhotoPath" alt="Превью работы").work-block__img
      .work-block__tags
        WorkTags(
          :tags="tagsArray"
        )
    .work-block__content
      .work-block__text-content
        h3.work-block__title {{work.title}}
        .work-block__desc
          p {{work.description}}
        a(:href="work.link").work-block__link {{work.link}}
      .work-block__btns
        button(
          type="button"
          @click="editWork"
        ).btn.btn-block_edit Править
          .icon-edit
        button(
          type="button"
          @click="remove"
        ).btn.btn-block_remove Удалить
          .icon-remove
</template>

<script>

import { mapActions, mapMutations } from "vuex";

export default {
  components: {
    WorkTags: () => import("../works/work-tags.vue"),
  },
  props: {
    work: Object
  },
  data() {
    return {
      
    }
  },
  computed: {
    remotePhotoPath() {
      return `${"https://webdev-api.loftschool.com"}/${this.work.photo}`;
    },
    tagsArray() {
      return this.work.techs.split(',');
    }
  },
  methods: {
    ...mapActions("works", ['removeWork']),
    ...mapMutations("works", ['SHOW_FORM', 'TURN_EDIT_MODE_ON', 'SET_EDITED_WORK']),
    ...mapMutations('tooltip', ['SHOW_TOOLTIP']),

    async remove() {
      try {
        await this.removeWork(this.work.id);
        this['SHOW_TOOLTIP']({
          type: 'success',
          text: 'Работа удалена'
        });
      } catch (error) {
        console.error(error.message);
        this['SHOW_TOOLTIP']({
          type: 'error',
          text: 'Произошла ошибка'
        });
      }
    },

    showFormAndTurnEditModeOn() {
      this['TURN_EDIT_MODE_ON'](this.work);
      this['SHOW_FORM']();
    },
    setEditedWork() {
      this['SET_EDITED_WORK'](this.work);
    },
    editWork() {
      this.setEditedWork();
      this.showFormAndTurnEditModeOn();
    },
  }
}
</script>

<style lang="postcss">

@import "../../../styles/mixins.pcss";

.work-block {
  display: grid;
  grid-template-rows: .65fr 1fr;
}
.work-block__img {
  height: 100%;
  width: 100%;
}
.work-block__header {
  position: relative;
  height: 200px;
}
.work-block__tags {
  position: absolute;
  bottom: 0;
  right: 0;
}
.work-block__content {
  padding: 0 30px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 0.1fr;
  
}
.work-block__text-content {
  margin-top: 40px;
  margin-bottom: 30px;
  @include phones {
    margin-top: 15px;
  }
}
.work-block__title {
  font-weight: 700;
  color: #414c63;
  font-size: 18px;
  margin-bottom: 25px;
}
.work-block__desc {
  color: #414c63;
  opacity: .7;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 25px;
  height: 130px;
}
.work-block__link {
  color: #383bcf;
  font-size: 16px;
  font-weight: 600;
  align-self: end;
  margin-bottom: 45px;
  &:hover {
    border-bottom: 3px solid #383bcf;
    transition: border-bottom .3s;
  }
  @include phones {
    margin-bottom: 25px;
  }
}
.work-block__btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 55px;
}
.btn-block_edit, .btn-block_remove {
  background: transparent;
  display: flex;
  align-items: flex-end;
  font-size: 16px;
  color: rgba(65, 76, 99, 0.502);
  font-weight: 600;
  padding: 0;
  justify-content: center;
}

.icon-edit,
.icon-remove {
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