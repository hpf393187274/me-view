<template>
  <div :class="['me-panel', 'me-column', {'me-border': border} ]">
    <div class="me-row header">
      <me-icon v-if="icon">{{icon}}</me-icon>
      <slot name="header">
        <span class="me-flex">{{ title }}</span>
      </slot>
    </div>
    <me-line-h />
    <div :class="`me-${layout}`" :style="{'overflow':overflow}" class="me-flex content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MePanel',
  props: {
    title: String,
    border: Boolean,
    line: Boolean,
    icon: String,
    layout: { type: String, default: 'row' },
    overflow: String
  }
}
</script>
