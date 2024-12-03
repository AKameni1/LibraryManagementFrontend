<template>
  <header
    :class="[
      'transition-all duration-700 ease-in-out',
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent shadow-none'
    ]"
    class="fixed inset-x-0 top-0 z-50"
  >
    <!-- Navbar principale -->
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <!-- Logo -->
      <div class="flex lg:flex-1" :class="{ hidden: mobileMenuOpen }">
        <router-link to="/" class="-m-1.5 p-1.5 cursor-pointer" @click.prevent="refreshPage">
          <span class="sr-only">Your Company</span>
          <img
            class="h-8 w-auto"
            loading="lazy"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Logo"
          />
        </router-link>
      </div>

      <!-- Menu hamburger (mobile) -->
      <div class="flex lg:hidden" :class="{ hidden: mobileMenuOpen }">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>

      <!-- Menu principal (desktop) -->
      <div class="hidden lg:flex lg:gap-x-12">
        <PopoverGroup>
          <Popover class="relative">
            <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
              Product
              <ChevronDownIcon class="size-5 flex-none text-gray-400" aria-hidden="true" />
            </PopoverButton>
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel
                class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              >
                <div class="p-4">
                  <div
                    v-for="item in products"
                    :key="item.name"
                    class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                  >
                    <div
                      class="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                    >
                      <component
                        :is="item.icon"
                        class="size-6 text-gray-600 group-hover:text-indigo-600"
                      />
                    </div>
                    <div class="flex-auto">
                      <router-link :to="item.href" class="block font-semibold text-gray-900">
                        {{ item.name }}
                        <span class="absolute inset-0"></span>
                      </router-link>
                      <p class="mt-1 text-gray-600">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  <router-link
                    v-for="item in callsToAction"
                    :key="item.name"
                    :to="item.href"
                    class="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <component
                      :is="item.icon"
                      class="size-5 flex-none text-gray-500"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </router-link>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
        </PopoverGroup>
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="text-sm font-semibold text-gray-900"
        >
          {{ item.name }}
        </router-link>
      </div>

      <!-- Connexion -->
      <div class="hidden lg:flex lg:flex-1 lg:justify-end space-x-4 lg:items-center">
        <router-link to="/login" class="text-sm font-semibold text-gray-900"
          >Log in <span aria-hidden="true">&rarr;</span></router-link
        >
        <router-link
          to="/signup"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign up
        </router-link>
      </div>
    </nav>

    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <!-- Overlay -->
      <div class="fixed inset-0 z-10 bg-black/30" aria-hidden="true" />

      <!-- Panel -->
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <!-- Header -->
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <router-link to="/" class="-m-1.5 p-1.5" @click.prevent="refreshPage">
            <span class="sr-only">Your Company</span>
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt="Company Logo"
            />
          </router-link>

          <!-- Close Button -->
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 focus:outline-none"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <!-- Content -->
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <!-- Navigation Links -->
            <div class="space-y-6 py-6">
              <Disclosure as="div" class="space-y-2">
                <template v-slot="{ open }">
                  <DisclosureButton
                    class="flex w-full items-center justify-between text-base font-semibold text-gray-900 rounded-lg p-3 hover:bg-gray-50"
                  >
                    Product
                    <ChevronDownIcon
                      class="w-5 h-5 transition-transform"
                      :class="{ 'rotate-180': open }"
                    />
                  </DisclosureButton>
                  <DisclosurePanel class="mt-2 space-y-2 pl-2">
                    <div
                      v-for="item in [...products, ...callsToAction]"
                      :key="item.name"
                      class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                    >
                      <div
                        class="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                      >
                        <component
                          :is="item.icon"
                          class="size-6 text-gray-600 group-hover:text-indigo-600"
                        />
                      </div>
                      <div class="flex-auto">
                        <router-link :to="item.href" class="block font-semibold text-gray-900">
                          {{ item.name }}
                          <span class="absolute inset-0"></span>
                        </router-link>
                        <p class="mt-1 text-gray-600">{{ item.description }}</p>
                      </div>
                    </div>
                  </DisclosurePanel>
                </template>
              </Disclosure>

              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="block text-base font-semibold text-gray-900 rounded-lg p-3 hover:bg-gray-50"
              >
                {{ item.name }}
              </router-link>
            </div>

            <!-- Log In -->
            <div class="py-6">
              <router-link
                to="/login"
                class="block text-base font-semibold text-gray-900 rounded-lg p-3 hover:bg-gray-50"
              >
                Log in
              </router-link>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { navigation, products, callsToAction } from '../data/data.js'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverGroup,
  PopoverButton,
  PopoverPanel
} from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useScroll } from '../utils/useScroll.js'

const mobileMenuOpen = ref(false)
const { isScrolled } = useScroll()

const refreshPage = () => {
  window.location.reload()
}
</script>
