<template lang="pug">
.wrapper.admin_wrapper
  Header
  Navigation
  .content
    router-view
  .tooltip
    queryTooltip
</template>


<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  components: {
    Header: () => import("./components/admin-header"),
    Navigation: () => import("./components/navigation"),
    queryTooltip: () => import("./components/queryTooltip")
  }
};
</script>

<style lang="postcss">
@import "https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700,800&subset=cyrillic";
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
</style>