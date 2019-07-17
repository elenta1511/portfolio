<template lang="pug">
  .wrapper.admin-wrapper
    Header
    Navigation
    About
</template>

<script>
import Header from './components/Header';
import Navigation from './components/Navigation';
import About from './components/pages/About';

export default {
  name: 'app',
  components:{
    Header,
    Navigation,
    About
  },
  data() {
    return {
    }
  }
}
</script>

<style lang=postcss>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";  
</style>