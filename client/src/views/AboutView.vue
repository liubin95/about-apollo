<script setup lang='ts'>
import { gql } from '@apollo/client';
import { useQuery } from '@vue/apollo-composable';

const { result } = useQuery(gql`
      query getUsers {
        users {
          id
          firstname
          lastname
          email
        }
      }
    `);
console.log(result.value);
</script>
<template>
  <div class='about'>
    <h1>This is an about page</h1>
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
