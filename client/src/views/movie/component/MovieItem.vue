<script setup lang="ts">
import type { MoviesQuery } from '@/__generated__/graphql.ts'
import type { PropType } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<NonNullable<MoviesQuery['movies']>[number]>, // 使用 PropType 来定义 item 类型
    required: true,
  },
})
</script>

<template>
  <div class="container">
    <span class="title col">{{ item.title }}</span>
    <span class="col">{{ item.year }}</span>
    <div class="col tag-container">
      <span v-for="it in item.category" class="tag"> {{ it.name }}</span>
    </div>
    <div class="col tag-container">
      <span v-for="it in item.country" class="tag"> {{ it.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.col {
  width: 25%;
}

.title {
  font-weight: bold;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.tag {
  background-color: #f0f0f0;
  padding: 2px 5px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: 12px;
  color: #333;
}
</style>
