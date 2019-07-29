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
          @click="correctWork"
        ).btn.btn-block_edit Править
        button(
          type="button"
          @click="removeThisWork"
        ).btn.btn-block_remove Удалить
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
    ...mapMutations("works", ['SHOW_FORM', 'EDIT_MODE_ON', 'SET_EDITED_WORK']),
    async removeThisWork() {
      try {
        await this.removeWork(this.work.id);
        
      } catch (error) {
        
      }
    },
     correctWork() {
      this['EDIT_MODE_ON'](this.work);
      this['SHOW_FORM']();
    },
  }
}
</script>

<style lang="postcss">

@import "../../../styles/mixins.pcss";

.work-block__header {
  position: relative;
}
.work-block__tags {
  position: absolute;
  bottom: 0;
  right: 0;
}
.work-block__content {
  padding: 0 30px;
}
.work-block__text-content {
  margin-top: 40px;
  margin-bottom: 45px;
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
}
.work-block__link {
  color: #383bcf;
  font-size: 16px;
  font-weight: 600;
  align-self: end;
  margin-bottom: 45px;
}
.work-block__btns {
  display: flex;
  justify-content: space-between;
}
.btn-block_edit, .btn-block_remove {
  background: transparent;
}
</style>