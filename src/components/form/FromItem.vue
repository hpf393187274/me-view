<template>
  <div :class="classes">
    <label :style="labelStyle" class="label" v-if="boolean(label)">
      {{label}}：
      <span style="color:red;" v-if="required">*</span>
    </label>
    <slot>
      <div style="color:red;">请在插巢填充元素</div>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'MeFormItem',
  props: {
    required: { type: Boolean },
    label: String,
    flex: Boolean,
    labelStyle: { type: Object, default() { return {} } },
    readonly: Boolean
  },
  data() {
    return {
    }
  },
  computed: {
    classes() {
      return [
        'me-row me-form-item me-cross-center',
        {
          'me-flex': this.flex
        }
      ]
    }
  }
}
</script>
