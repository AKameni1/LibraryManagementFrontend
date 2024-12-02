<template>
  <div class="BackToTop" :class="{ visible: isScrolled }" @click="scrollToTop">
    <a aria-label="Back to top">
      <svg
        aria-hidden="true"
        focusable="false"
        class="octicon octicon-arrow-up"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="currentColor"
      >
        <path
          d="M3.47 7.78a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0l4.25 4.25a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018L9 4.81v7.44a.75.75 0 0 1-1.5 0V4.81L4.53 7.78a.75.75 0 0 1-1.06 0Z"
        ></path>
      </svg>
    </a>
  </div>
</template>

<script setup>
import { useScroll } from '../utils/useScroll.js'

const { isScrolled } = useScroll()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
