<template>
  <div class="me-column me-panel">
    <div class="me-row header" :class="headerClass">
      <me-icon v-if="icon">{{icon}}</me-icon>
      <slot name="header">
        <span class="me-flex">{{ lable }}</span>
      </slot>
    </div>
    <me-line-row/>
    <div class="me-flex me-content" :class="`me-${layout}`" :style="{'overflow':overflow}">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MePanel',
  props: {
    line: Boolean
  }
}
</script>
