<script setup lang="ts">
import { gql } from '@/__generated__'
import MovieItem from '@/views/movie/component/MovieItem.vue'
import { useQuery } from '@vue/apollo-composable'
import { onMounted, ref } from 'vue'

const GetMovies = gql(/* GraphQL */ `
  query Movies($filter: MovieFilter, $category: String, $country: String) {
    movies(filter: $filter) {
      id
      title
      year
      country {
        name
      }
      category {
        name
      }
    }
    categories(name: $category) {
      id
      name
    }
    countries(name: $country) {
      id
      name
    }
  }
`)
const filter = ref({
  title: null,
  actors: null,
  category: null,
  country: null,
  year: null,
})
const filterCountry = ref('')
const filterCategory = ref('')

const { result, loading } = useQuery(
  GetMovies,
  {
    filter: filter.value,
    category: filterCategory.value,
    country: filterCountry.value,
  },
  { debounce: 500 },
)

onMounted(() => {
  console.log('MovieList mounted')
})
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div>
      <h3>选择国家</h3>
      <input v-model="filterCountry" placeholder="输入国家" />
      <div v-for="country in result?.countries" :key="country.id">
        <input type="checkbox" :value="country.id" v-model="filter.country" />
        {{ country.name }}
      </div>
    </div>

    <div>
      <h3>选择类别</h3>
      <input v-model="filterCategory" placeholder="输入类别" />
      <div v-for="category in result?.categories" :key="category.id">
        <input type="checkbox" :value="category.id" v-model="filter.category" />
        {{ category.name }}
      </div>
    </div>
    <input v-model="filter.title" placeholder="输入名称" />

    <div v-if="loading">Loading...</div>
    <div v-else>
      <p v-for="(movie, index) in result?.movies" :key="index">
        <MovieItem :item="movie" />
      </p>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
