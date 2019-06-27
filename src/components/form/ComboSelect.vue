<template>
  <div :class="classes">
    <me-input :icon-suffix="iconSuffix" @click-suffix="handleSuffix"/>
  </div>
</template>

<script>
export default {
  name: 'MeComboSelect',
  data() {
    return {
      status: false
    }
  },
  computed: {
    iconSuffix() {
      return ""
    }
  },
  methods: {
    handleSuffix() {

    }
  }
}
</script>
