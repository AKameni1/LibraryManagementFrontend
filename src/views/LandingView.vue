<template>
  <div class="bg-white">
    <Header />

    <main class="flex-grow">
      <Hero />

      <Logo />

      <Features />

      <Testimonials />
    </main>

    <Footer />

    <BackToTop />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Testimonials from '../components/Testimonials.vue'
import Logo from '../components/Logo.vue'
import Hero from '../components/Hero.vue'
import Features from '../components/Features.vue'
import BackToTop from '../components/BackToTop.vue'

import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import gsap from 'gsap'

onMounted(() => {
  AOS.init({
    useClassNames: true,
    animatedClassName: 'aos-animate',
    once: false,
    mirror: true
  })

  gsap.from('.icon', {
    scale: 0,
    duration: 0.8,
    ease: 'elastic.out(1, 0.3)',
    stagger: 0.2
  })
})
</script>
