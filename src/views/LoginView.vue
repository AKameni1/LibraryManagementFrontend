<template>
  <div class="lg rp zf ajh">
    <div class="lg rt va zf zs asn cnr dmr">
      <div class="cdi chy cih">
        <img alt="Your Company" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&amp;shade=600"
          class="gh nx tz" />
        <h1 class="kt awe awm axo axz ayx">Sign in to your account</h1>
      </div>
      <div class="kg cdi chy cif">
        <div class="aml asf asn bck clz cnj">
          <Form :validationSchema="schema" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)" :disabled="loading" novalidate class="aco">
              <!-- Section pour afficher le message d'erreur général -->
              <div v-if="errorMessage" class="text-red-500 text-sm mb-4 text-center">
                {{ errorMessage }}
              </div>

              <div>
                <label for="email" class="ld axf axp ayx">Email address</label>
                <Field name="email" v-slot="{ field }">
                  <input id="email" type="email" autocomplete="email" v-bind="field"
                    class="kl ld ua aen aml asa asl awv ayx bcw bcx bcy bdb bgr boi bok bor cqw" />
                </Field>
                <ErrorMessage name="email" as="span" class="text-red-500 text-sm" />
              </div>

              <div>
                <label for="password" class="ld axf axp ayx">Password</label>
                <Field name="password" v-slot="{ field }">
                  <input id="password" type="password" autocomplete="current-password" v-bind="field"
                    class="kl ld ua aen aml asa asl awv ayx bcw bcx bcy bdb bgr boi bok bor cqw" />
                </Field>
                <ErrorMessage name="password" as="span" class="text-red-500 text-sm" />
              </div>

              <div class="lg zn zt">
                <div class="lg aae">
                  <div class="lg oq vf zn">
                    <div class="bsb lk nh yu">
                      <input id="remember-me" name="remember-me" type="checkbox"
                        class="ei ev yq aef afp agm aml bhj bhn bhr bhs bqr bqs bqu brb brp brr brz dxf" /><svg
                        fill="none" viewBox="0 0 14 14" class="c ei ev nf adp ads aqt buv">
                        <path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                          class="bby bvd"></path>
                        <path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                          class="bby bve"></path>
                      </svg>
                    </div>
                  </div>
                  <label for="remember-me" class="ld axf ayx">Remember me</label>
                </div>

                <div class="axf">
                  <router-link to="/forgot-password" class="axr azm bml">Forgot password?</router-link>
                </div>
              </div>

              <div>
                <button type="submit" :disabled="loading"
                  class="lg ua zs aen akp asa asl axf axr bbl bcr bjz bqr bqs bqu brb">
                  {{ loading ? 'Signing in...' : 'Sign in' }}
                </button>
              </div>
            </form>
          </Form>
        </div>
        <p class="kg awe axf ayt">
          Not a member? <router-link to="/signup" class="axr azm bml">Start now</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

// Store et router
const authStore = useAuthStore()
const router = useRouter()

// Variables de chargement et d'erreur
const loading = ref(false)
const errorMessage = ref('')

// Schéma de validation avec yup
const schema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required')
})

// Gestion de la soumission du formulaire
const onSubmit = async (values) => {
  console.log('Form submitted:', values) // Test
  loading.value = true
  errorMessage.value = ''

  try {
    await authStore.loginUser(values)

    if (authStore.isAuthenticated) {
      router.push('/dashboard')
    } else {
      errorMessage.value = 'Login failed. Please try again.'
    }
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred during login.'
  } finally {
    loading.value = false
  }
}
</script>