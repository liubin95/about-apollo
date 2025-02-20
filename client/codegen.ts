import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../shared/*.schema.graphql',
  // 假设您的所有源文件都在顶级`src/`目录中 - 您可能需要将其调整为文件结构
  documents: ['src/**/*.{ts,vue}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
