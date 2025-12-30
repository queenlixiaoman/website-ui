import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'

const eslintConfig = defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    'dockerImage/**'
  ]),
  {
    files: [ 'src/**/*.{js,mjs,cjs,jsx}' ],
    plugins: { js },
    extends: [ 'js/recommended' ],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly'
      }
    }
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // 此规则强制执行一致的缩进样式。默认样式是4 spaces。 设置关闭
      'indent': [ 'error', 2 ],
      // 多余空行报错
      'no-multiple-empty-lines': 'error',
      // 有分号报错
      'semi': [ 'error', 'never' ],
      // 每行结尾不能有空格
      'no-trailing-spaces': 'error',
      // 逗号周围放置空格
      'comma-spacing': 2,
      // 冒号周围放置空格
      'key-spacing': [ 2, { 'beforeColon': false, 'afterColon': true } ],
      // 中缀操作符周围有空间
      'space-infix-ops': 2,
      // 使用单引号
      'quotes': [ 2, 'single' ],
      // 禁止在逻辑表达式，条件表达式，声明，数组元素，对象属性，序列和函数参数周围使用多个空格
      'no-multi-spaces': 2,
      // 数组内前后有空格
      'array-bracket-spacing': [ 'error', 'always' ],
      // 对象内前后有空格
      'object-curly-spacing': [ 'error', 'always' ],
      // 强制执行统一的行结尾
      'linebreak-style': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

      // 忽略 prop-types 检查
      'react/prop-types': 'off',
      // 不要检查是否在文件中显式引入了 React
      'react/react-in-jsx-scope': 'off',
      // 忽略未转义的实体
      'react/no-unescaped-entities': 'off',
      // 强制执行统一的标签间距
      'react/jsx-tag-spacing': 2,
      // 强制执行统一的等号间距
      'react/jsx-equals-spacing': [ 'error', 'always' ],
      // 强制执行统一的括号间距
      'react/jsx-curly-spacing': [ 'error', { 'when': 'always' } ],
    }
  }
])

export default eslintConfig
