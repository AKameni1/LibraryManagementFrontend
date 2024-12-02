<template>
  <footer class="bg-white border-t border-gray-200">
    <!-- Section supérieure -->
    <section class="px-4 sm:px-6 lg:px-8 py-10 text-center">
      <p class="text-lg font-medium text-indigo-600">Get started</p>
      <h2 class="mt-4 text-5xl text-balance font-bold text-gray-900 sm:text-6xl tracking-tight">
        Boost your productivity. Start using our app today.
      </h2>
      <p class="mt-6 leading-7 text-pretty text-lg text-gray-500">
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua
        proident excepteur commodo do ea.
      </p>
      <div class="mt-8">
        <router-link to="/signup"
          class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get
          started</router-link>
      </div>
    </section>

    <!-- Section des liens -->
    <section
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1 py-12 flex flex-col md:flex-row items-start border-t border-gray-200">
      <div class="flex flex-col space-y-4">
        <!-- Logo -->
        <div class="flex-shrink-0 md:w-1/4 mb-8 md:mb-0">
          <img class="h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Company Logo" />
        </div>

        <p class="text-gray-600 text-sm">
          Making the world a better place through constructing elegant hierarchies.
        </p>
      </div>

      <!-- Liens -->
      <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:ml-8">
        <div v-for="section in footerSections" :key="section.title">
          <h3 class="text-sm font-semibold text-gray-900">
            {{ section.title }}
          </h3>
          <ul class="mt-5 space-y-3">
            <li v-for="link in section.links" :key="link.name">
              <router-link :to="link.href" class="text-gray-600 hover:text-gray-900 text-sm">{{
                link.name
              }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Section inférieure -->
    <section
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between">
      <p class="text-sm text-gray-500">© 2024 Your Company, Inc. All rights reserved.</p>
      <div class="flex space-x-4 mt-4 md:mt-0">
        <a v-for="icon in socialIcons" :key="icon.name" :href="icon.href" class="text-gray-600 hover:text-gray-900"
          target="_blank">
          <span class="sr-only">{{ icon.name }}</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" v-html="icon.svg"></svg>
        </a>
      </div>
    </section>
  </footer>
</template>

<script setup>
import { footerSections, socialIcons } from '../data/data.js'
</script>
