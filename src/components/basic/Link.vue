<template>
  <a class="me-link" @click="$emit('click')">
    <me-icon v-if="boolean(icon)">{{icon}}</me-icon>
    <slot/>
  </a>
</template>

<script>
export default {
  name: 'MeLink'
}
</script>
