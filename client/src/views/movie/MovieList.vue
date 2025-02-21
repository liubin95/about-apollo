<script setup lang="ts">
import { gql } from '@/__generated__'
import MovieItem from '@/views/movie/component/MovieItem.vue'
import { useQuery } from '@vue/apollo-composable'
import { onMounted, ref } from 'vue'

const GetMovies = gql(/* GraphQL */ `
  query Movies($filter: MovieFilter) {
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
  }
`)
const GetCountries = gql(/* GraphQL */ `
  query Countries($country: NameFilter) {
    countries(filter: $country) {
      id
      name
    }
  }
`)
const GetCategories = gql(/* GraphQL */ `
  query Categories($category: NameFilter) {
    categories(filter: $category) {
      id
      name
    }
  }
`)
const filter = ref({
  title: null,
  actors: null,
  category: [],
  country: [],
  year: null,
})
const filterCountry = ref({
  name: null,
})
const filterCategory = ref({
  name: null,
})

const { result, loading } = useQuery(
  GetMovies,
  {
    filter: filter.value,
  },
  { debounce: 500 },
)
const { result: countries } = useQuery(
  GetCountries,
  {
    country: filterCountry.value,
  },
  { debounce: 500 },
)
const { result: categories } = useQuery(
  GetCategories,
  {
    category: filterCategory.value,
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
      <input v-model="filterCountry.name" placeholder="输入国家" />
      <div v-for="country in countries?.countries" :key="country.id">
        <input
          :id="'country-' + country.id"
          type="checkbox"
          :value="country.id"
          v-model="filter.country"
        />
        <label :for="'country-' + country.id"> {{ country.name }}</label>
      </div>
    </div>

    <div>
      <h3>选择类别</h3>
      <input v-model="filterCategory.name" placeholder="输入类别" />
      <div v-for="category in categories?.categories" :key="category.id">
        <input
          :id="'category-' + category.id"
          type="checkbox"
          :value="category.id"
          v-model="filter.category"
        />
        <label :for="'category-' + category.id">{{ category.name }}</label>
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
