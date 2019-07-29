<template lang="pug">
.content-wrapper
  header.admin-header
    .container.admin-header__container
      .admin-header__col.admin-header__col--first
        .user-info.admin-header__col-content
          .user-info__avatar-wrapper
            img(src="../../images/content/me.jpg" alt="Аватар пользователя").avatar
          .user-info__name Елена Тарабукина
        .window-desc Панель администрирования
      .admin-header__col.admin-header__col--last
        a(href="#").exit-btn Выйти
</template>

<style lang="postcss">

@import "../../styles/mixins.pcss"; 

.admin-header {
  grid-area: header;
  background-image: linear-gradient(to right, #3e3e59, #454573);
  padding: 20px 0;
}

.admin-header__container {
  display: grid;
  grid-template: "first last" 1fr / 1fr 1fr;

  @include phones {
    grid-template: "first last" 1fr / 2fr 1fr;
  }  
}

.admin-header__col {
  display: flex;
  align-items: center;


  &--first {
    grid-area: first;
    align-self: center;
  }



  &--last {
    grid-area: last;
    justify-self: end;
  }
}

.admin-header__col-content {
  margin-right: 25px;

  @include phones {
    margin-right: 0;
  }
}
.avatar {
  border-radius: 50%;
}
.user-info {
  display: flex;
  align-items: center;
}

.user-info__avatar-wrapper {
  width: 44px;
  height: 44px;
  margin-right: 20px;
  flex-shrink: 0;
}

.user-info__name {
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
}
.window-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);

  @include phones {
    display: none;
  }
}
.exit-btn {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: underline;
  transition: color .3s;

  &:hover {
    color: #fff;
  }
}
</style>