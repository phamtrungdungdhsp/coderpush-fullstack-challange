import { RequestInit } from 'next/dist/server/web/spec-extension/request'

const initConfig: any = { headers: { 'app-id': '61bbee41e8cafdca35771b83' } }
export const fetchingAPI = async (url: string, config?: RequestInit) => {
  const userId = localStorage.getItem('userId')
  userId && (initConfig.headers.userId = +userId)
  const res = await fetch(url, { ...initConfig, ...config })
  return res.json()
}