// user token store
import { defineStore } from 'pinia'

export interface TokenInfo {
  token: string
  refreshToken: string
}

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      token: '',
      refreshToken: '',
    }) as TokenInfo,
  persist: true,
  actions: {
    setToken(token: TokenInfo) {
      this.token = token.token
      this.refreshToken = token.refreshToken
    },
    getToken() {
      return this.token
    },
    getRefreshToken() {
      return this.refreshToken
    },
    removeToken() {
      this.token = ''
      this.refreshToken = ''
    },
  },
})
