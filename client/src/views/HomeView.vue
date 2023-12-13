<script setup lang="ts">
import io from 'socket.io-client'
import { onBeforeUnmount, ref } from 'vue'

const url = 'http://localhost:3001'
// @ts-ignore
const socket = io.connect(url)
const messages = ref<string[]>([])

socket.on('randomDataSent', (data: string) => {
  messages.value.push(data)
})

onBeforeUnmount(() => socket.off('randomDataSent'))
</script>

<template>
  <main>
    <ul>
      <li v-for="msg in messages" :key="msg">{{ msg }}</li>
    </ul>
  </main>
</template>
