import useSWR from 'swr'
import { fetchingAPI } from './index'

export const getUsers = (page = 1, limit = 10) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(`https://dummyapi.io/data/v1/user?page=${page}&limit=${limit}`, fetchingAPI)
  
  return {
    listUser: data?.data || [],
    isLoading: !error && !data,
    isError: error
  }
}