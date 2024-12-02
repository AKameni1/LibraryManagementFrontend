import globals from 'globals'
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      ...js.configs.recommended.rules, // Ajoute les règles JavaScript recommandées
      'no-var': 'error',
      'prefer-const': 'warn'
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser, // Utilise le parseur Vue pour les fichiers .vue
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      ...vue.configs['flat/essential'].rules // Intègre directement les règles Vue "essentielles"
    }
  }
]
