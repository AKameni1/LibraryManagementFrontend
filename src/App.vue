<template>
  <div id="app">
    <Header v-if="requiresLayout" />

    <!-- Contenu principal -->
    <main class="flex-grow">
      <router-view />
    </main>

    <Footer v-if="requiresLayout" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { computed } from 'vue';

const route = useRoute()

const requiresLayout = computed(() => !['LandingPage', 'Login', 'Signup', 'NotFound'].includes(route.name))

</script>