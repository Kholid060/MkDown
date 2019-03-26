<template>
  <v-snackbar v-model="snack" top right :timeout="3000">
    {{ text }}
  </v-snackbar>
</template>
<script>
export default {
  props: ['active', 'color', 'text'],
  data: () => ({
    snack: false
  }),
  mounted () {
    this.snack = this.$props.active
  }
}

</script>
