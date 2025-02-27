<script setup lang="ts">
import type { MoviesQuery } from '@/__generated__/graphql.ts'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  item: {
    type: Object as PropType<NonNullable<MoviesQuery['movies']>[number]>, // 使用 PropType 来定义 item 类型
    required: true,
  },
})

const handleClick = () => {
  router.push(`/movie/${props.item.id}`)
}
</script>

<template>
  <div class="movie-card" @click="handleClick">
    <div class="movie-poster">
      <!-- 如果有海报图片可以在这里添加 -->
      <div class="poster-placeholder">
        {{ item.title[0] }}
      </div>
    </div>
    <div class="movie-info">
      <h3 class="movie-title">{{ item.title }}</h3>
      <div class="movie-meta">
        <span class="year">{{ item.year }}</span>
        <span class="dot">•</span>
        <span class="countries">
          {{ item.countries?.map(c => c.name).join(', ') }}
        </span>
      </div>
      <div class="categories">
        <span
          v-for="category in item.categories"
          :key="category.id"
          class="category-tag"
        >
          {{ category.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
}

.movie-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.movie-poster {
  aspect-ratio: 2/3;
  background: #f0f0f0;
  position: relative;
}

.poster-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #999;
  background: linear-gradient(45deg, #f3f3f3, #e3e3e3);
}

.movie-info {
  padding: 1rem;
}

.movie-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.movie-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.dot {
  color: #999;
}

.categories {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.category-tag {
  font-size: 0.85rem;
  color: #4a90e2;
  background: rgba(74, 144, 226, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}
</style>
