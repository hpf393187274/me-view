<template>
  <div :class="addClass('panel')">
    <div class="header" :class="headerClass">
      <me-icon v-if="icon">{{icon}}</me-icon>
      <slot name="header">
        <span class="title">{{ title }}</span>
      </slot>
    </div>
    <me-line-row/>
    <div :class="addClass('content')" :style="{'overflow':overflow}">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    line: Boolean
  }
}
</script>
