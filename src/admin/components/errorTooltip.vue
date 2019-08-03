<template lang="pug">
  .error-tooltip {{errorText}}
</template>


<script>
export default {
  props: {
    errorText: {
      type: String,
      default: "Ошибка"
    }
  }
};
</script>


<style lang="postcss" scoped>
.error-tooltip {
  z-index: 100;
  position: absolute;
  color: #fff;
  padding: 8px 20px;
  font-size: 12px;
  white-space: nowrap;
  background-color: blue;
  opacity: .85;
  border-radius: 5px;
  &:before {
    content: "";
    display: block;
    border: 10px solid transparent;	
    border-bottom: 10px solid blue;
    position: absolute;
    bottom: 95%;
    z-index: 1000;
    left: 0;
  }
}
</style>
