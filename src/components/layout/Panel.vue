<template>
  <div :class="addClass('panel')">
    <div class="header" :class="headerClass">
      <vv-icon v-if="iconClass">{{iconClass}}</vv-icon>
      <slot name="header">
        <span class="title">{{ title }}</span>
      </slot>
    </div>
    <vv-line-row/>
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
