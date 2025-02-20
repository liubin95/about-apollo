import { QueryResolvers } from './__generated__/resolvers-types.js'
import { prisma } from './database.js'

class OtherResolvers {
  categories: QueryResolvers['categories'] = (_parent, { name }, _context) => {
    const nameFilter = name ? { contains: name } : undefined
    // 构建查询条件
    const where = {
      AND: [nameFilter && { name: nameFilter }].filter(Boolean), // 去掉 undefined 的条件
    }
    return prisma.category.findMany({
      where,
    })
  }
  countries: QueryResolvers['countries'] = (_parent, { name }, _context) => {
    const nameFilter = name ? { contains: name } : undefined
    // 构建查询条件
    const where = {
      AND: [nameFilter && { name: nameFilter }].filter(Boolean), // 去掉 undefined 的条件
    }
    return prisma.country.findMany({
      where,
    })
  }
}

// 导出 MovieResolvers 类实例
export const otherResolvers = new OtherResolvers()
