<template lang="pug">
.admin-nav__wrapper
  .container.nav__container
    nav.admin-nav
      ul.admin-nav__list
        router-link.admin-nav__item(
            v-for="(route, index) in routes"
            :key="index"
            tag="li"
            :to="route.path"
            )
            a(href="path").admin-nav__link {{route.title}}
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          title: "Обо мне",
          path: "/"
        },
        {
          title: "Работы",
          path: "/works"
        },
        {
          title: "Отзывы",
          path: "/reviews"
        }
      ]
    };
  }
};
</script>

<style lang="postcss">

@import "../../styles/mixins.pcss";  

.admin-nav__wrapper {
  grid-area: nav;
}

.admin-nav__list {
  display: flex;
  align-items: center;
  color: $text-color;

  @include phones {
    justify-content: center;
  }
}

.admin-nav__item {
  padding: 30px;
  cursor: pointer;
  border-bottom: 3px solid transparent;

  &:not(&--active):hover {
    font-weight: 600;
    color: #383bcf;
  }

  @include phones {
    padding: 30px 20px;
  }
}
.router-link-exact-active {
    font-weight: 600;
    color: #383bcf;
    border-bottom: 3px solid #383bcf;
}
</style>