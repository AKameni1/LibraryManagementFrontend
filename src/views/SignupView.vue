<template>
  <div class="lg rp zf ajh">
    <div class="lg rt va zf zs asn cnr dmr">
      <div class="cdi chy cih">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          class="gh nx tz"
        />
        <h1 class="kt awe awm axo axz ayx">Create your account</h1>
      </div>
      <div class="kg cdi chy cif">
        <div class="aml asf asn bck clz cnj">
          <Form :validationSchema="schema" v-slot="{ handleSubmit }">
            <form
              @submit.prevent="handleSubmit(handleSubmitWithAlert)"
              novalidate
              class="grid grid-cols-2 gap-4"
            >
              <!-- Section pour afficher le message d'erreur général -->
              <div v-if="errorMessage" class="col-span-2 text-red-500 text-sm mb-4 text-center">
                {{ errorMessage }}
              </div>

              <!-- Champ Username -->
              <div>
                <label for="username" class="ld axf axp ayx">Username</label>
                <Field name="username" v-slot="{ field }">
                  <input
                    id="username"
                    type="text"
                    v-bind="field"
                    class="kl ld ua aen aml asa asl awv ayx bcw bcx bcy bdb bgr boi bok bor cqw"
                    autocomplete="username"
                  />
                </Field>
                <ErrorMessage name="username" as="span" class="text-red-500 text-sm" />
              </div>

              <!-- Champ Email -->
              <div>
                <label for="email" class="ld axf axp ayx">Email address</label>
                <Field name="email" v-slot="{ field }">
                  <input
                    id="email"
                    type="email"
                    autocomplete="email"
                    v-bind="field"
                    class="kl ld ua aen aml asa asl awv ayx bcw bcx bcy bdb bgr boi bok bor cqw"
                  />
                </Field>
                <ErrorMessage name="email" as="span" class="text-red-500 text-sm" />
              </div>

              <!-- Champ Password -->
              <div>
                <label for="password" class="ld axf axp ayx">Password</label>
                <Field name="password" v-slot="{ field }">
                  <input
                    id="password"
                    type="password"
                    autocomplete="new-password"
                    v-bind="field"
                    class="kl ld ua aen aml asa asl awv ayx bcw bcx bcy bdb bgr boi bok bor cqw"
                  />
                </Field>
                <ErrorMessage name="password" as="span" class="text-red-500 text-sm" />
              </div>

              <!-- Champ Confirm Password -->
              <div>
                <label for="confirmPassword" class="ld axf axp ayx">Confirm Password</label>
                <Field name="confirmPassword" v-slot="{ field }">
                  <input
                    id="confirmPassword"
                    type="password"
                    v-bind="field"
                    class="kl ld ua aen aml asa asl awv ayx bcw bcx bcy bdb bgr boi bok bor cqw"
                  />
                </Field>
                <ErrorMessage name="confirmPassword" as="span" class="text-red-500 text-sm" />
              </div>

              <!-- Champ Image de profil -->
              <div class="col-span-2">
                <label for="profileImage" class="block text-sm font-medium text-gray-900"
                  >Profile Image</label
                >
                <div
                  class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                >
                  <div class="text-center">
                    <PhotoIcon class="mx-auto size-12 text-gray-300" aria-hidden="true" />
                    <div class="mt-4 flex text-sm text-gray-600">
                      <label
                        for="profileImage"
                        class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="profileImage"
                          name="profileImage"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          @change="onFileChange"
                          class="sr-only"
                        />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p v-if="fileError" class="text-red-500 text-sm mt-2">{{ fileError }}</p>
                    <p class="text-xs text-gray-600">PNG, JPG, up to 5MB</p>
                  </div>
                </div>
              </div>

              <!-- Alerte pour la photo par défaut -->
              <div
                v-if="showDefaultImageAlert"
                class="col-span-2 bg-yellow-50 border-l-4 border-yellow-400 p-4"
              >
                <p class="text-sm text-yellow-700">
                  No profile image selected. A default image will be used. Please confirm to
                  proceed.
                </p>
                <button
                  type="button"
                  @click="acceptDefaultImage"
                  class="mt-2 rounded-md px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                  style="background-color: #f59e0b"
                >
                  Accept Default Image
                </button>
              </div>

              <!-- Bouton de soumission -->
              <div class="col-span-2">
                <button
                  type="submit"
                  :disabled="loading"
                  class="lg ua zs aen akp asa asl axf axr bbl bcr bjz bqr bqs bqu brb"
                >
                  {{ loading ? 'Creating account...' : 'Sign up' }}
                </button>
              </div>
            </form>
          </Form>
        </div>
        <p class="kg awe axf ayt">
          Already have an account?
          <router-link to="/login" class="axr azm bml">Sign in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { PhotoIcon } from '@heroicons/vue/24/solid'
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

// Store et router
const authStore = useAuthStore()
const router = useRouter()

const emailPattern =
  /^(?!.*\.\.)[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,6}$/

// Variables de chargement, erreur et fichier
const loading = ref(false)
const errorMessage = ref('')
const profileImage = ref(null)
const fileError = ref('')
const acceptedDefaultImage = ref(false)
const showDefaultImageAlert = ref(false)

// Schéma de validation avec yup
const schema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: yup.string().required('Email is required').matches(emailPattern, 'Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(12, 'Password must be at least 12 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match')
})

// Gestion des fichiers
const onFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) {
    fileError.value = 'Please select a valid image file.'
    profileImage.value = null
    return
  }
  if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
    fileError.value = 'Only JPEG, JPG, and PNG formats are allowed.'
    profileImage.value = null
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    fileError.value = 'File size must not exceed 5MB.'
    profileImage.value = null
    return
  }
  fileError.value = ''
  profileImage.value = file
}

// Gestion de la confirmation de l'image par défaut
const acceptDefaultImage = () => {
  acceptedDefaultImage.value = true
  showDefaultImageAlert.value = false
}

// Gestion de la soumission du formulaire avec alerte
const handleSubmitWithAlert = (values) => {
  if (!profileImage.value && !acceptedDefaultImage.value) {
    showDefaultImageAlert.value = true
    return
  }
  onSubmit(values)
}

// Gestion de la soumission du formulaire
const onSubmit = async (values) => {
  loading.value = true
  errorMessage.value = ''

  const formData = new FormData()
  formData.append('username', values.username)
  formData.append('email', values.email)
  formData.append('password', values.password)
  if (profileImage.value) {
    formData.append('profileImage', profileImage.value)
  }

  try {
    await authStore.signupUser(formData)

    if (authStore.isAuthenticated) {
      try {
        router.push('/dashboard')
      } catch (error) {
        console.error('Navigation error:', error)
      }
    } else {
      errorMessage.value = 'Signup failed. Please try again.'
    }
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred during signup.'
  } finally {
    loading.value = false
  }
}
</script>
