<template>
  <div id="navbar">
    <vs-navbar v-model="active" color="primary" center-collapsed text-white>
      <template #left>
        <img
          src="https://3wa.fr/wp-content/uploads/2020/01/cropped-big.png"
          alt=""
          class="logo-3wa"
          @click="$router.push('/')"
        />
        <vs-navbar-item
          id="accueil"
          :active="active == 'accueil'"
          @click="$router.push('/')"
        >
          Accueil
        </vs-navbar-item>
        <vs-navbar-item
          id="restos"
          :active="active == 'restos'"
          @click="$router.push('/restos')"
        >
          Restos
        </vs-navbar-item>
        <vs-navbar-item
          id="explore"
          :active="active == 'explore'"
          @click="$router.push('/explore')"
        >
          Explore
        </vs-navbar-item>
        <vs-navbar-item
          id="addresto"
          :active="active == 'addresto'"
          @click="$router.push('/addresto')"
        >
          Ajouter un restaurant
        </vs-navbar-item>
      </template>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  name: 'IndexNavbar',
  data() {
    return {
      active:
        this.$route.path.split('/')[1] === ''
          ? 'accueil'
          : this.$route.path.split('/')[1],
    }
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style lang="scss">
#navbar {
  z-index: 99;
  .logo-3wa {
    padding: 0.5em;
    width: 50px;
  }
}
</style>
