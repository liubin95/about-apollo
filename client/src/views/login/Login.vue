<script setup lang="ts">
import { gql } from '@/__generated__'
import router from '@/router'
import { useUserStore } from '@/stores/user.ts'
import { useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'

const userStore = useUserStore()
const {
  mutate: login,
  loading,
  error,
} = useMutation(
  gql(/* GraphQL */ `
    mutation Login($form: LoginInput!) {
      login(login: $form) {
        token
        refreshToken
      }
    }
  `),
)
const props = defineProps<{
  redirect?: string
}>()
const formData = ref({
  email: '1@liubin.com',
  password: '123456',
})
const handleSubmit = async () => {
  const result = await login({
    form: formData.value,
  })
  userStore.setToken({
    token: result?.data?.login.token ?? '',
    refreshToken: result?.data?.login.refreshToken ?? '',
  })
  // 跳转到首页
  void router.push(props.redirect ?? '/')
}
</script>
<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">欢迎登录</h2>
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>登录中...</p>
      </div>
      <div v-else-if="error" class="error-state">
        <p>登录失败，请重试</p>
      </div>
      <div v-else>
        <form @submit.prevent="handleSubmit" class="login-form">
          <div class="form-group">
            <label for="email">邮箱</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              required
              placeholder="请输入邮箱"
            />
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input
              type="password"
              id="password"
              v-model="formData.password"
              required
              placeholder="请输入密码"
            />
          </div>
          <button type="submit" class="login-button">登录</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #666;
  font-size: 0.9rem;
}

.form-group input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.login-button {
  background-color: #4a90e2;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #357abd;
}

.loading-state {
  text-align: center;
  padding: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4a90e2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-state {
  text-align: center;
  color: #dc3545;
  padding: 1rem;
  background-color: #fff5f5;
  border-radius: 4px;
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
@media (max-width: 480px) {
  .login-box {
    margin: 1rem;
    padding: 1.5rem;
  }

  .login-title {
    font-size: 1.5rem;
  }
}
</style>
