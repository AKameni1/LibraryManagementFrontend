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
          <div>
            <div class="j kg">
              <div aria-hidden="true" class="i s lg zn">
                <div class="ua agc agl"></div>
              </div>
              <div class="j lg zs axf axp"><span class="aml asf ayx">Or continue with</span></div>
            </div>
            <div class="kt lk yw aaf">
              <a href="#" class="lg ua zn zs aae aen aml asa asq axd axr ayx bcr bdg bdk bds bjo brl"
                target="_blank"><svg viewBox="0 0 24 24" aria-hidden="true" class="on sq">
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"></path>
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"></path>
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"></path>
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"></path>
                </svg><span class="axf axr">Google</span></a>
              <a href="#" class="lg ua zn zs aae aen aml asa asq axd axr ayx bcr bdg bdk bds bjo brl"
                target="_blank"><svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" class="nk apc">
                  <path
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clip-rule="evenodd" fill-rule="evenodd"></path>
                </svg><span class="axf axr">GitHub</span></a>
            </div>
          </div>
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
