<script setup lang="ts">
import { gql } from '@/__generated__'
import { useQuery } from '@vue/apollo-composable'
import { onMounted } from 'vue'

const GetMovies = gql(/* GraphQL */ `
  query Movies {
    movies {
      title
      releaseDate
      category
    }
  }
`)

const { result, loading } = useQuery(GetMovies)

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
        {{ movie.title }} - {{ movie.releaseDate }} - {{ movie.category }}
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
