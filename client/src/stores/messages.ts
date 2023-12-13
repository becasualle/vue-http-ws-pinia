import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<string[]>([])

  function addMessage(msg: string) {
    messages.value.push(msg)
  }

  return { messages, addMessage }
})
