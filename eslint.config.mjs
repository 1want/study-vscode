// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      // eslint ignore globs here
    ]
  },
  {
    rules: {
      'comma-dangle': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      'jsonc/sort-keys': 'off'
    }
  }
)
