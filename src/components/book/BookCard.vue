<template>
  <div class="rounded-lg shadow-md p-4 bg-white">
    <h3 class="text-lg font-semibold">{{ book.Title }}</h3>
    <p class="text-gray-600">{{ book.Author }}</p>
    <div class="mt-2">
      <span :class="availabilityClass">
        {{ book.Availability }}
      </span>
    </div>
    <div class="mt-4 flex justify-between">
      <button
          v-if="canBorrow"
          @click="borrowBook"
          class="btn-primary"
      >
        Borrow
      </button>
      <button
          v-if="canReserve"
          @click="reserveBook"
          class="btn-secondary"
      >
        Reserve
      </button>
    </div>
  </div>
</template>