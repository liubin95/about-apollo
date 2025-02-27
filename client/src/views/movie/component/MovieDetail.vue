<script setup lang="ts">
import { gql } from '@/__generated__'
import router from '@/router'
import { useQuery } from '@vue/apollo-composable'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const GET_MOVIE_DETAIL = gql(/* GraphQL */ `
  query MovieDetail($id: Int!) {
    movie(id: $id) {
      id
      title
      year
      actors {
        id
        name
      }
      countries {
        id
        name
      }
      categories {
        id
        name
      }
    }
  }
`)

const { result, loading, error } = useQuery(GET_MOVIE_DETAIL, {
  id: parseInt(props.id),
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="movie-detail-container">
    <button class="back-button" @click="goBack"><span class="back-icon">←</span> 返回</button>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>加载失败</p>
      <button @click="goBack">返回列表</button>
    </div>

    <div v-else-if="result?.movie" class="movie-content">
      <div class="movie-header">
        <div class="poster-container">
          <div class="poster-placeholder">
            {{ result.movie.title[0] }}
          </div>
        </div>
        <div class="movie-info">
          <h1 class="movie-title">{{ result.movie.title }}</h1>
          <div class="movie-meta">
            <span class="year">{{ result.movie.year }}</span>
            <span class="dot">•</span>
            <span class="countries">
              {{ result.movie.countries?.map((c) => c.name).join(', ') }}
            </span>
          </div>
          <div class="categories">
            <span
              v-for="category in result.movie.categories"
              :key="category.id"
              class="category-tag"
            >
              {{ category.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="movie-body">
        <section class="description-section">
          <h2>剧情简介</h2>
          <p>{{ result.movie.description || '暂无简介' }}</p>
        </section>

        <section class="actors-section">
          <h2>演员表</h2>
          <div class="actors-list">
            {{ result.movie.actors?.map((a) => a.name).join(', ') || '暂无演员信息' }}
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

.back-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  color: #4a90e2;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 2rem;
}

.back-icon {
  margin-right: 0.5rem;
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4a90e2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.movie-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.movie-header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(to bottom, #f8f9fa, white);
}

.poster-container {
  aspect-ratio: 2/3;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.poster-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: #999;
  background: linear-gradient(45deg, #f3f3f3, #e3e3e3);
}

.movie-info {
  padding: 1rem 0;
}

.movie-title {
  font-size: 2.5rem;
  color: #333;
  margin: 0 0 1rem;
}

.movie-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 1.1rem;
}

.dot {
  color: #999;
}

.countries {
  color: #4a90e2;
}

.movie-body {
  padding: 2rem;
}

.movie-body section {
  margin-bottom: 2rem;
}

.movie-body h2 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
}

.description-section p {
  line-height: 1.6;
  color: #666;
}

.actors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: #666;
}

.categories {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-tag {
  color: #4a90e2;
  background: rgba(74, 144, 226, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .movie-header {
    grid-template-columns: 1fr;
  }

  .poster-container {
    max-width: 300px;
    margin: 0 auto;
  }

  .movie-title {
    font-size: 2rem;
  }

  .movie-detail-container {
    padding: 1rem;
  }
}
</style>
