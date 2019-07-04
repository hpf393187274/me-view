<template>
  <div :class="classes" :style="styles">
    <div :style="stylesBtn" @mousedown="handlerMouseDown" class="slidebar-button" ref="button" />
  </div>
</template>
<script>
import Drag from '@components/mixins/drag'
export default {
  name: 'MeSlidebar',
  mixins: [Drag]
}
</script>
