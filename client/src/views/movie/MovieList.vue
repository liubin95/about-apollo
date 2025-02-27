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
  categories: [],
  countries: [],
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
  <div class="movie-list-container">
    <!-- 筛选器部分 -->
    <div class="filters-section">
      <div class="search-box">
        <input v-model="filter.title" placeholder="搜索电影名称..." class="search-input" />
      </div>

      <!-- 筛选器组 -->
      <div class="filter-groups">
        <!-- 国家筛选 -->
        <div class="filter-group">
          <h3 class="filter-title">按国家筛选</h3>
          <div class="filter-search">
            <input v-model="filterCountry.name" placeholder="搜索国家..." class="filter-input" />
          </div>
          <div class="checkbox-group">
            <label v-for="country in countries?.countries" :key="country.id" class="checkbox-label">
              <input
                type="checkbox"
                :value="country.id"
                v-model="filter.countries"
                class="checkbox-input"
              />
              <span class="checkbox-text">{{ country.name }}</span>
            </label>
          </div>
        </div>

        <!-- 类别筛选 -->
        <div class="filter-group">
          <h3 class="filter-title">按类别筛选</h3>
          <div class="filter-search">
            <input v-model="filterCategory.name" placeholder="搜索类别..." class="filter-input" />
          </div>
          <div class="checkbox-group">
            <label
              v-for="category in categories?.categories"
              :key="category.id"
              class="checkbox-label"
            >
              <input
                type="checkbox"
                :value="category.id"
                v-model="filter.categories"
                class="checkbox-input"
              />
              <span class="checkbox-text">{{ category.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- 电影列表部分 -->
    <div class="movies-section">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <span>加载中...</span>
      </div>
      <div v-else class="movies-grid">
        <MovieItem
          v-for="movie in result?.movies"
          :key="movie.id"
          :item="movie"
          class="movie-item"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-list-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

/* 筛选器样式 */
.filters-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  outline: none;
}

.filter-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.filter-group {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
}

.filter-title {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 600;
}

.filter-input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  padding: 0.3rem 0.6rem;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.checkbox-label:hover {
  background: #f0f0f0;
}

.checkbox-input {
  margin-right: 0.5rem;
}

/* 电影列表样式 */
.movies-section {
  margin-top: 2rem;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.movie-item {
  transition: transform 0.2s ease;
}

.movie-item:hover {
  transform: translateY(-5px);
}

/* 加载状态样式 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4a90e2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .movie-list-container {
    padding: 1rem;
  }

  .filter-groups {
    grid-template-columns: 1fr;
  }

  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
}
</style>
