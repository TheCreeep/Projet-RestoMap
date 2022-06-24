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
        <vs-button @click="resetInputs()">Reset</vs-button>
        <vs-select v-model="cuisineInput" label="Cuisine">
          <vs-option
            v-for="cuisine in allCuisines"
            :key="cuisine"
            :label="cuisine"
            :value="cuisine"
          >
            {{ cuisine }}
          </vs-option>
        </vs-select>
        <vs-select v-model="boroughInput" label="Quartier">
          <vs-option
            v-for="borough in allBoroughs"
            :key="borough"
            :label="borough"
            :value="borough"
          >
            {{ borough }}
          </vs-option>
        </vs-select>
        <vs-button @click="searchHandle()">Rechercher</vs-button>
      </div>
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
    <!-- Tableau avec les différentes valeurs des passager dans le computed -->
  </div>
</template>

<script>
export default {
  name: 'ExplorePage',
  layout: 'LandingLayout',
  data() {
    return {
      cuisineInput: '',
      boroughInput: '',
    }
  },

  computed: {
    searchResult() {
      return this.$store.state.restaurantByFilters
    },
    allCuisines() {
      return this.$store.state.allCuisines
    },
    allBoroughs() {
      return this.$store.state.allBoroughs
    },
  },
  created() {
    this.getCuisines()
    this.getBoroughs()
  },
  methods: {
    searchHandle() {
      this.$store.dispatch('GET_RESTAURANTS_BY_FILTERS', {
        cuisine: this.cuisineInput,
        borough: this.boroughInput,
      })
    },
    getCuisines() {
      this.$store.dispatch('GET_ALL_CUISINES')
    },
    getBoroughs() {
      this.$store.dispatch('GET_ALL_BOROUGHS')
    },
    resetInputs() {
      this.cuisineInput = ''
      this.boroughInput = ''
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
