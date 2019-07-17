<template lang="pug">
nav.menu
  .container.menu__container
    ul.menu__list
      li.menu__item.menu__item_active
        a.menu__link(href="#") Обо мне 
      li.menu__item
        a.menu__link(href="#") Работы
      li.menu__item
        a.menu__link(href="#") Отзывы
</template>

<script>
</script>

<style lang = "postcss">
@import "../../styles/mixins.pcss";
.menu {
  background: #fff;
}
.menu__list {
  list-style-type: none;
  display: grid;
  grid-template-columns: .1fr .1fr .1fr;
  grid-template-rows: 1fr;

  @include phones {
    grid-template-columns: repeat(3, 1fr);
    width: 90%;
    margin: 0 auto;
  }
}
.menu__item {
  border-bottom: 3px solid transparent;
  text-align: center;
  transition: border-color .3s;

  &_active, 
  &:hover {
    border-color: #383bcf;
    transition: border-color .3s;
    .menu__link {
    color:  #383bcf;
    transition: color .3s;
    }
  }
}
.menu__link {
  display: inline-block;
  text-decoration: none;
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  padding: 30px 0;
  transition: color .3s;
}
</style>
