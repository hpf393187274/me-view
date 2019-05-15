<template>
  <a href="javascript: void;" :class="addClass('link')" @click="$emit('click')">
    <me-icon v-if="boolean(icon)">{{icon}}</me-icon>
    <slot/>
  </a>
</template>

<script>
export default {
  name: 'Link',
  props: {
    color: {
      type: String,
      default: '#DDE9F6'
    }
  }
}
</script>
