<template>
  <section
    class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0"
  >
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <svg
        class="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
            stroke-width="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          stroke-width="0"
          fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
        />
      </svg>
    </div>
    <div
      class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10"
    >
      <div
        class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
      >
        <div class="lg:pr-4">
          <div class="lg:max-w-lg">
            <p class="text-base/7 font-semibold text-indigo-600">Deploy faster</p>
            <h1
              class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
            >
              A better workflow
            </h1>
            <p class="mt-6 text-xl/8 text-gray-700">
              Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi,
              nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas.
            </p>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-left"
        data-aos-duration="1200"
        data-aos-easing="ease-in-sine"
        class="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden"
      >
        <img
          class="w-[48rem] h-[40rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/4f679f165188867.64033a4cc3495.png"
          alt="dashboard preview"
          loading="lazy"
        />
      </div>
      <div
        class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
      >
        <div class="lg:pr-4">
          <div class="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
              semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus
              viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat.
              Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.
            </p>
            <ul class="mt-8 space-y-8 text-gray-600">
              <li class="flex gap-x-3">
                <CloudArrowUpIcon
                  class="icon mt-1 size-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span
                  ><strong class="font-semibold text-gray-900">Push to deploy.</strong> Lorem ipsum,
                  dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit
                  eaque, iste dolor cupiditate blanditiis ratione.</span
                >
              </li>
              <li class="flex gap-x-3">
                <LockClosedIcon
                  class="icon mt-1 size-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span
                  ><strong class="font-semibold text-gray-900">SSL certificates.</strong> Anim aute
                  id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                  commodo.</span
                >
              </li>
              <li class="flex gap-x-3">
                <ServerIcon class="icon mt-1 size-5 flex-none text-indigo-600" aria-hidden="true" />
                <span
                  ><strong class="font-semibold text-gray-900">Database backups.</strong> Ac
                  tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi
                  lobortis.</span
                >
              </li>
            </ul>
            <p class="mt-8">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id
              blandit molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel.
              Mauris varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac
              tempor et ut. Ac lorem vel integer orci.
            </p>
            <h2 class="text-gradient mt-16 text-2xl font-bold tracking-tight text-gray-900">
              No server? No problem.
            </h2>
            <p class="mt-6">
              Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu
              ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate
              nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim
              cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis ipsum eu a sed
              convallis diam.
            </p>
          </div>
        </div>
      </div>
      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/vue/20/solid'

import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  AOS.init({
    useClassNames: true, // Active les classes personnalisées
    animatedClassName: 'aos-animate', // Classe appliquée quand visible
    once: false,
    mirror: true
  })
})
</script>
