<template>
  <button class="me-button" :disabled="disabled" :margin="margin" @click="click">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'MeButton',
  methods: {
    click() {
      console.log('click button 了一次')
      this.$emit('click')
    }
  }
}
</script>
