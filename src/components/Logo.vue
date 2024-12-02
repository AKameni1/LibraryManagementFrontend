<template>
  <section class="bg-white py-24 sm:py-32">
    <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
      <h2 class="text-center text-lg/8 font-semibold text-gray-900">
        Trusted by the world’s most innovative teams
      </h2>
      <div
        ref="scrollContainer"
        class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"
      >
        <img
          v-for="(logo, index) in logos"
          :key="index"
          :src="logo.src"
          :alt="logo.alt"
          :class="logo.classes"
          width="158"
          height="48"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { logos } from '../data/data.js'
</script>
