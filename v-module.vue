// HelloWorld.vue
<template>
<div>
<input type="text" :value="msg" @input="up">
  <input type="text" :value="d" @input="change">
  {{ d }}
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['msg'],
  data() {
    return {
      d: 'ss'
    }
  },
  methods: {
    up(e) {
      this.$emit('c', e.target.value)
    },
    change(e) {
      this.d = e.target.value;
    }
  }
}
</script>

// App.vue
<template>
<div id="app">
  {{ val }}
<HelloWorld :msg="val" @c="handle"/>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data() {
    return {
      val: '开课吧-购物车'
    }
  },
  methods: {
    handle(v) {
      this.val = v;
    }
  }
}
</script>

