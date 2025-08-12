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
      'style/comma-dangle': 'off',
      'comma-dangle': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      '@stylistic/js/comma-dangle': 'off',
      '@stylistic/ts/comma-dangle': 'off',

      // 关闭箭头函数括号
      'style/arrow-parens': 'off',
      '@stylistic/js/arrow-parens': 'off',
      '@stylistic/ts/arrow-parens': 'off',

      // 关闭不想要的规则
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-named-imports': 'off',
      'ts/consistent-type-imports': 'off',
      'antfu/if-newline': 'off',
      'regexp/use-ignore-case': 'off',
      'no-cond-assign': 'off',

      'jsonc/sort-keys': 'off'
    }
  }
)
