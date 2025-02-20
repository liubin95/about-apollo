<script setup lang="ts">
import { gql } from '@/__generated__'
import MovieItem from '@/views/movie/component/MovieItem.vue'
import { useQuery } from '@vue/apollo-composable'
import { onMounted } from 'vue'

const GetMovies = gql(/* GraphQL */ `
  query Movies($filter: MovieFilter) {
    movies(filter: $filter) {
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

const { result, loading } = useQuery(GetMovies, {
  filter: {
    title: null,
    actors: null,
    category: null,
    country: null,
    year: null,
  },
})

onMounted(() => {
  console.log('MovieList mounted')
})
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
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
