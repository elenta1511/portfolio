<template lang="pug">
  label.input(
    :class="{'error': errorText}"
  )
    .input__title {{title}} 
    input(
      v-bind="$attrs"
      :value="value" 
      @input="$emit('input', $event.target.value)"
    ).input__elem.field__elem
    .input__error-tooltip
      errorsTooltip(
        :errorText="errorText"
      )
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    title: String,
    errorText: {
      type: String,
      default: ""
    },
    noSidePaddings: Boolean,
    fieldType: {
      type: String,
      default: "input"
    },
    value: String | Number 
  },
  components: {
    errorsTooltip: () => import("./errorTooltip.vue")
  }
};
</script>

<style lang="postcss" scoped>

.input__elem {
  width: 410px;
  border: none;
  border-bottom: 1px solid;
}
.input__title {
  color: #414c63;
  opacity: .3;
  font-weight: 600;
  margin-bottom: 20px;
}
.error {
  .input__error-tooltip {
    display: block;
  }
  .input__elem {
    border-color: #5500f2;
  }
}
.input__error-tooltip {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateX(-50%);
  z-index: 100;
}
.input {
  display: block;
  position: relative;
}
.input_user {
  .input__elem {
    background: svg-load("user.svg", fill=rgba(#13254b, 0.3),width=20px,height=20px) 0 0 no-repeat;
    padding-left: 40px;
    padding-bottom: 10px;
  }
}
.input_password {
  .input__elem {
    background: svg-load("key.svg", fill=rgba(#13254b),width=20px,height=20px) 0 0 no-repeat;
    padding-left: 40px;
    padding-bottom: 10px;
  }
}
</style>

