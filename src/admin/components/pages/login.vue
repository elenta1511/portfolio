<template lang="pug">
  .login
    .login__content
      form.login__form(@submit.prevent="login")
        .login__form-title Авторизация
        .login__row
          app-input(
            title="Логин"
            v-model="user.name"
            class="input_user"
            placeholder="admin"
            :errorText="validation.firstError('user.name')"
          )
        .login__row
          app-input(
            title="Пароль"
            type="password"
            v-model="user.password"
            class="input_password"
            placeholder="******"
            :errorText="validation.firstError('user.password')"
          )
        .login__btn
          button(
            type="submit"
            :disabled="disableSubmit"
          ).login__send-data Отправить
          a(href="/").login__close
</template>

<script>

import { Validator } from "simple-vue-validator";
import $axios from "../../requests";
import { setToken } from "../../helpers/token";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "user.name": value => {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "user.password": value => {
      return Validator.value(value).required("Введите пароль");
    }
  },
  data() {
    return {
      disableSubmit: false,
      user: {
        name: "",
        password: ""
      }
    };
  },
  components: {
    appInput: () => import('../input.vue')
  },
  methods: {
    async login() {
      if ((await this.$validate()) === false) return;
      this.disableSubmit = true;
      try {
        const response = await $axios.post("/login", {
          name: this.user.name,
          password: this.user.password
        });
        setToken(response.data.token);
        $axios.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
        this.$router.replace("/");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>

@import "../../../styles/mixins.pcss";
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("~images/content/admin_back.png") center center / cover no-repeat;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.7;
    background: #424f5f;
  }
}
.login__form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login__form-title {
  font-size: 36px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 40px;
}
.login__content {
  position: relative;
  @include phones {
    height: 100%;
    width: 100%;
  }
}
.login__row {
  margin-bottom: 35px;
}
.login__btn {
  display: flex;
  width: 100%;
  padding: 0 8%;
  justify-content: center;
}
.login__send-data {
  width: 350px;
  padding: 30px;
  background-image: linear-gradient(to right, #ad00ed, #5500f2);
  border-radius: 40px 0 40px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;
  &[disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }
}
.login__form {
  width: 563px;
  padding: 50px 77px 60px;
  background: #fff;
  @include phones {
    width: 100%;
    padding-right: 7%;
    padding-left: 7%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.login__close {
  width: 20px;
  height: 20px;
  background: svg-load('remove.svg', fill=#414c63, width=100%, height=100%);
  position: absolute;
  right: 5%;
  top: 5%;
}
</style>