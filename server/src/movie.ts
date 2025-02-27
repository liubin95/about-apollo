import { QueryResolvers } from './__generated__/resolvers-types.js'
import { prisma } from './database.js'

class MovieResolvers {
  movies: QueryResolvers['movies'] = async (_parent, { filter }, _context) => {
    console.log(_parent, _context)
    // 提取过滤条件
    const titleFilter = filter.title ? { contains: filter.title } : undefined
    const yearFilter = filter.year ? { equals: filter.year } : undefined
    const categoryFilter = filter.categories?.length
      ? {
          some: {
            id: {
              in: filter.categories.map((category) => category),
            },
          },
        }
      : undefined
    const countryFilter = filter.countries?.length
      ? {
          some: {
            id: {
              in: filter.countries.map((country) => country),
            },
          },
        }
      : undefined

    // 构建查询条件
    const where = {
      AND: [
        titleFilter && { title: titleFilter },
        yearFilter && { year: yearFilter },
        categoryFilter && { categories: categoryFilter },
        countryFilter && { countries: countryFilter },
      ].filter(Boolean), // 去掉 undefined 的条件
    }
    return await prisma.movie.findMany({
      where,
      include: {
        categories: true,
        countries: true,
        actors: true,
      },
    })
  }
  movie: QueryResolvers['movie'] = async (_parent, { id }, _context) => {
    return await prisma.movie.findUnique({
      where: { id },
      include: {
        categories: true,
        countries: true,
        actors: true,
      },
    })
  }
}

// 导出 MovieResolvers 类实例
export const movieResolvers = new MovieResolvers()
