<template lang="pug">
  ul.work-blocks__list
    li.work-blocks__item.work-blocks__item--new-blocks
      button(
        type="button"
        @click.prevent="$emit('handleAddWork')"
        
      ).btn.btn_add-blocks
        span.btn__blocks-icon +
        span.btn__blocks-title Добавить работу
    li.work-blocks__item(
      v-for="work in works"
      :key="work.id"
    )
      WorkBlock(
        :work="work"
      )
</template>

<script>

import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: {
    
  },
  components: {
    WorkBlock: () => import("../works/work-block.vue"),
  },
  data() {
    return {
     
    };
  },
  computed: {
    ...mapState("works", {
      works: state => state.works
    })
  },
  methods: {
    ...mapActions("works", ["fetchWorks"]),
    ...mapMutations("works", ["SHOW_FORM", "EDIT_MODE_OFF"])
  
   
  },
  async created() {
    try {
      this.fetchWorks();
     
    } catch (error) {
      
    }
  }
};
</script>

<style lang="postcss" scoped>

@import "../../../styles/mixins.pcss";
.btn_add-blocks {
  width: 340px;
  height: 555px;
  background-image: linear-gradient(to right, #006aed, #3f35cb);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.btn__blocks-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  width: 60%;
  line-height: 2;
}
.work-blocks__list {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.work-blocks__item--new-blocks {
  width: 340px;
  height: 555px;
}
.work-blocks__item {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  background-color: #ffffff;
  width: 340px;
  height: 555px;
  margin-right: 34px;
  margin-bottom: 30px;
}
.btn__blocks-icon {
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