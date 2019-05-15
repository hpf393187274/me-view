<template>
  <div :class="addClass('row','flex')">
    <div :class="addClass('column','border')" style="width:200px;">
      <div style="height:30px;margin:10px;" v-for="(item,index) in list" :key="index">
        <router-link :to="{ path: item.router}">{{item.text}}</router-link>
      </div>
    </div>
    <div :class="addClass('row','border','flex')" style="overflow: auto;">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { text: 'Tree', router: '/tree' },
        { text: 'Transfer', router: '/transfer' }
      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>