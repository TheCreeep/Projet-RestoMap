<template>
  <div>
    <IndexNavbar />
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import IndexNavbar from '../components/IndexNavbar.vue'
export default {
  name: 'LayoutLanding',
  components: {
    IndexNavbar,
  },
}
</script>

<style lang="scss"></style>
