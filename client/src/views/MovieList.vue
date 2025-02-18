<script setup lang='ts'>
import { gql } from '@/__generated__'
import { useQuery } from '@vue/apollo-composable'
import { onMounted } from 'vue'

const GetMovie = gql(/* GraphQL */ `
  query GetMovie($movieId: ID!) {
    movie(id: $movieId) {
      title
      releaseDate
      category
      actors {
        name
      }
    }
  }
`)

const { result, loading } = useQuery(GetMovie, { movieId: '100' })

onMounted(() => {
  console.log('MovieList mounted')
})
</script>
<template>
  <div class='about'>
    <h1>This is an about page</h1>
    <div v-if='loading'>Loading...</div>

    <ul v-else-if='result && result.movie'>
      <li v-for='key in result.movie' :key='key'>
        {{ key }}: {{ result.movie[key] }}
      </li>
    </ul>
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
