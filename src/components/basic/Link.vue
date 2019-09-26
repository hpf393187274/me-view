<template>
  <a :class="class__" @click="disabled === false && $emit('click')" href="javascript:void(0)">
    <me-icon v-if="boolean(icon)">{{icon}}</me-icon>
    <slot />
  </a>
</template>

<script>
export default {
  name: 'MeLink',
  props: {
    icon: String
  },
  computed: {
    class__() {
      return ['me-link', { 'link-border': this.border }]
    }
  }
}
</script>
