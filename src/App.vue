<template>
  <div id="app">
    <Header v-if="requiresHeader" />

    <!-- Contenu principal -->
    <main class="flex-grow">
      <router-view />
    </main>

    <Footer v-if="requiresFooter" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { computed } from 'vue'

const route = useRouter()

const requiresHeader = computed(() =>
  ['Getstarted', 'Login', 'Signup', 'NotFound'].includes(route.name)
)

const requiresFooter = computed(() =>
  ['Getstarted', 'Login', 'Signup', 'About', 'NotFound'].includes(route.name)
)
</script>
