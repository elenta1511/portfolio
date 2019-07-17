<template lang="pug">
transition(name="fade" mode="out-in")
  div
    HeadTitle(
      headTitle='Блок «Обо мне»',
      :showAddButton = "!showAddForm",
      @handleAddForm="showAddForm = !showAddForm"
    )
</template>

<script>
export default {
  components: {
    headTitle: () => import ("../headTitle.vue")
  },
  data() {
    return {
      showAddForm: false
    }
  }
}
</script>