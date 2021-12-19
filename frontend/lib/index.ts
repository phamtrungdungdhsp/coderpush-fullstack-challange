import { RequestInit } from 'next/dist/server/web/spec-extension/request'

const initConfig: any = { headers: { 'app-id': '61bbee41e8cafdca35771b83', 'userId': 1 } }
export const fetchingAPI = async (url: string, config?: RequestInit) => {
  const res = await fetch(url, { ...initConfig, ...config })
  return res.json()
}