<template>
  <div id="add-resto">
    <h1 class="title">Ajouter un restaurant</h1>
    <div class="content">
      <div class="infos">
        <vs-input v-model="name" label="Nom" type="text" />
        <vs-input v-model="borough" label="Quartier" type="text" />
        <vs-input v-model="cuisine" label="Cuisine" type="text" />
      </div>
      <div class="address">
        <vs-input v-model="address.building" label="Numéro" type="text" />
        <vs-input v-model="address.street" label="Rue" type="text" />
        <vs-input v-model="address.zipcode" label="Code postal" type="text" />
      </div>
      <vs-button @click="createRestaurant">Ajouter un restaurant</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExplorePage',
  layout: 'LandingLayout',
  data() {
    return {
      name: '',
      address: {
        building: '',
        street: '',
        zipcode: '',
      },
      borough: '',
      cuisine: '',
    }
  },

  computed: {},
  methods: {
    createRestaurant() {
      if (
        this.name === '' ||
        this.borough === '' ||
        this.cuisine === '' ||
        this.address.building === '' ||
        this.address.street === '' ||
        this.address.zipcode === ''
      ) {
        this.$vs.notification({
          title: 'Erreur',
          text: 'Veuillez remplir tous les champs',
          color: 'danger',
          position: 'top-right',
        })
        return
      }
      this.$store.dispatch('ADD_RESTAURANT', {
        name: this.name,
        address: this.address,
        cuisine: this.cuisine,
        borough: this.borough,
      })
    },
    goToRestaurant(id) {
      this.$store.dispatch('GET_RESTAURANTS_BY_ID', id)
      this.$router.push('/restaurant/' + id)
    },
  },
}
</script>

<style lang="scss">
#add-resto {
  margin: 6em 0;

  .title {
    text-align: center;
  }
  .search-panel {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3em;
    margin-bottom: 2em;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    gap: 4em;
    .infos {
      display: flex;
      gap: 10px;
    }
    .address {
      display: flex;
      gap: 10px;
    }
  }
}
</style>
