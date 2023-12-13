import { isRef, ref, unref, watchEffect, type Ref } from 'vue'
import axios, { AxiosError } from 'axios'

export type Method = 'GET' | 'POST	' | 'PUT	' | 'PATCH	' | 'DELETE'

export function useFetch<T>(url: string | Ref<string>, method: Method, payload?: any) {
  const isLoading = ref(false)
  const error = ref<Error>()
  const data = ref<T | null>(null)

  async function fetchData() {
    try {
      isLoading.value = true
      const response = await axios({
        url: unref(url),
        method,
        data: payload
      })
      data.value = response.data
    } catch (e) {
      if (e instanceof AxiosError || e instanceof Error) {
        error.value = e
      } else {
        error.value = new Error(String(e))
      }
    } finally {
      isLoading.value = false
    }
  }

  if (isRef(url)) {
    watchEffect(fetchData)
  } else {
    fetchData()
  }

  return { data, isLoading, error }
}
