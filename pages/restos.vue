<template>
  <div id="search">
    <div>
      <h1 class="title">
        Rechercher :
        <span v-if="searchResult.length !== 0"
          >({{ searchResult.length }} resultats)</span
        >
      </h1>
      <div class="search-panel" @keyup.enter="searchHandle">
        <vs-input v-model="name" label="Name" />
        <vs-button @click="searchHandle()">Rechercher</vs-button>
      </div>

      <h3 class="title">Cliquez sur un restaurant pour voir sa page</h3>
      <div class="content">
        <div class="search-results">
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th>Nom</vs-th>
                <vs-th>Adresse</vs-th>
                <vs-th>Cuisine</vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                v-for="(restaurant, i) in searchResult"
                :key="i"
                :data="restaurant"
                @click="goToRestaurant(restaurant.restaurant_id)"
              >
                <vs-td> {{ restaurant.fullName }} </vs-td>
                <vs-td> {{ restaurant.fullAddress }} </vs-td>
                <vs-td> {{ restaurant.cuisine }} </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RestosPage',
  layout: 'LandingLayout',
  data() {
    return {
      name: '',
    }
  },
  computed: {
    searchResult() {
      return this.$store.state.restaurantByName
    },
  },

  methods: {
    searchHandle() {
      this.$store.dispatch('GET_RESTAURANTS_BY_NAME', this.name)
    },
    goToRestaurant(id) {
      this.$store.dispatch('GET_RESTAURANTS_BY_ID', id)
      this.$router.push('/restaurant/' + id)
    },
  },
}
</script>

<style lang="scss">
#search {
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
    padding: 1em;
    gap: 4em;
  }
}
</style>
