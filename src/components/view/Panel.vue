<template>
  <div class="me-column me-panel">
    <div :class="headerClass" class="me-row header">
      <me-icon v-if="icon">{{icon}}</me-icon>
      <slot name="header">
        <span class="me-flex">{{ label }}</span>
      </slot>
    </div>
    <me-line-h />
    <div :class="`me-${layout}`" :style="{'overflow':overflow}" class="me-flex me-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MePanel',
  props: {
    line: Boolean,
    icon: String,
    overflow: String
  }
}
</script>
