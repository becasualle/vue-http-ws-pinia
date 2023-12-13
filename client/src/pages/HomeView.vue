<template>
  <main>
    <ul>
      <li v-for="msg in store.messages" :key="msg">{{ msg }}</li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import * as io from 'socket.io-client'
import { useMessagesStore } from '../stores/messages'
import type { Post } from './home'
import { useFetch } from '../composables/useFetch'

// update store based on websocket events
const url = 'http://localhost:3001'
const socket = io.connect(url)

const store = useMessagesStore()

socket.on('randomDataSent', (msg: string) => store.addMessage(msg))

onBeforeUnmount(() => socket.off('randomDataSent'))

// make some http-requests
const postsUrl = 'https://jsonplaceholder.typicode.com/posts'
const { data: posts, isLoading, error } = useFetch<Post[]>(postsUrl, 'GET')
</script>
