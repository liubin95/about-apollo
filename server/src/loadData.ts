import * as fs from 'node:fs'
import { prisma } from './database.js'

//read data from json file
fs.readFile('./movies.json', 'utf8', async (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const jsonData = JSON.parse(data)
  //create user and post data
  for (let item of jsonData) {
    item = item as { title: string; year: number; country: string[]; category: string[] }
    console.log(item)
    const countryDB = await prisma.country.findMany({
      where: {
        name: {
          in: item.country, // 这里是你想查找的多个值
        },
      },
    })
    if (countryDB.length !== item.country.length) {
      // find the country that is not in the database
      const newCountry = item.country.filter(
        (c: string) => !countryDB.map((c) => c.name).includes(c),
      )
      // create new country
      void (await prisma.country.createMany({
        data: newCountry.map((c: string) => ({ name: c })),
      }))
    }
    const categoryDB = await prisma.category.findMany({
      where: {
        name: {
          in: item.category, // 这里是你想查找的多个值
        },
      },
    })
    if (categoryDB.length !== item.category.length) {
      // find the category that is not in the database
      const newCategory = item.category.filter(
        (c: string) => !categoryDB.map((c) => c.name).includes(c),
      )
      // create new category
      void (await prisma.category.createMany({
        data: newCategory.map((c: string) => ({ name: c })),
      }))
    }
    // create movie
    await prisma.movie.create({
      data: {
        title: item.title,
        releaseDate: parseInt(item.year),
        country: {
          connect: item.country.map((c: string) => ({ name: c })),
        },
        category: {
          connect: item.category.map((c: string) => ({ name: c })),
        },
      },
    })
  }
})
