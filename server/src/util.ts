import { mergeTypeDefs } from '@graphql-tools/merge'
import { glob } from 'glob'
import { parse, OperationDefinitionNode } from 'graphql'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export function getOperationName(query: string): string[] | null {
  try {
    const ast = parse(query)
    const operationDef = ast.definitions.find(
      (def) => def.kind === 'OperationDefinition',
    ) as OperationDefinitionNode
    return operationDef.selectionSet.selections
      .map((item) => ('name' in item ? item.name?.value : ''))
      .filter(Boolean)
  } catch (error) {
    console.error('Failed to parse GraphQL query:', error)
    return null
  }
}

export function getTypeDefs() {
  // deal __dirname is not defined
  const __dirname = import.meta.dirname
  // 匹配多个 schema 文件
  const files = glob.sync(join(__dirname, '../*.schema.graphql'))
  // 读取所有 schema 文件并合并
  return mergeTypeDefs(files.map((file) => readFileSync(file, 'utf-8')))
}
