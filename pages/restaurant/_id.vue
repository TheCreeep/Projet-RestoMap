<template>
  <div id="restaurant">
    <div>
      <div class="title">
        <h1>{{ restaurant.name }} ({{ restaurant.borough }})</h1>

        <h2 class="address">
          {{ address }}
        </h2>
      </div>

      <div class="content">
        <h3 class="title">Ajouter une note</h3>
        <div class="add-grade">
          <vs-select v-model="newGrade" value="A" label="Grade">
            <vs-option label="A" value="A">A</vs-option>
            <vs-option label="B" value="B">B</vs-option>
            <vs-option label="C" value="C">C</vs-option>
            <vs-option label="D" value="D">D</vs-option>
          </vs-select>
          <vs-input
            v-model="newNote"
            label="Note"
            type="number"
            min="0"
            max="20"
          />
          <vs-button @click="addGrade">Ajouter une note</vs-button>
        </div>
        <div class="grades">
        <h3 class="title">Avis</h3>
          <div v-for="(grade, i) in restaurant.grades" :key="i" class="grade">
            <h3 class="date">{{ formatDate(grade.date) }}</h3>
            <h3 class="grade">{{ grade.grade }}</h3>
            <h3 class="score">{{ grade.score }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default {
  name: 'RestaurantPage',
  layout: 'LandingLayout',
  data() {
    return {
      newGrade: '',
      newNote: 0,
    }
  },

  computed: {
    searchResult() {
      return this.$store.state.restaurantByName
    },
    restaurant() {
      return this.$store.state.selectedRestaurant
    },
    address() {
      return (
        this.restaurant.address?.building +
        ' ' +
        this.restaurant.address?.street +
        ' ' +
        this.restaurant.address?.zipcode
      )
    },
  },
  created() {
    this.getRestaurant()
  },
  methods: {
    getRestaurant() {
      this.$store.dispatch('GET_RESTAURANTS_BY_ID', this.$route.params.id)
    },
    formatDate(date) {
      return dayjs(date).format('dddd DD MMMM YYYY HH:mm')
    },
    addGrade() {
      this.$store.dispatch('ADD_GRADE', {
        id: this.restaurant.restaurant_id,
        grade: this.newGrade,
        score: this.newNote,
        date: dayjs(),
      })
    },
  },
}
</script>

<style lang="scss">
#restaurant {
  margin: 6em 0;

  .title {
    text-align: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 1em;
    gap: 1em;
    align-items: center;
    .add-grade {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 3em;
      margin-bottom: 2em;
    }
    .title {
      font-size: 30px;
      font-weight: bold;
      text-decoration: underline;
    }
    .grade {
      display: flex;
      gap: 5px;

      .date {
        font-size: 1.5em;
        font-weight: bold;
        color: gray;
      }
      .grade {
        color: red;
      }
      .score {
        color: blue;
      }
    }
  }
}
</style>
