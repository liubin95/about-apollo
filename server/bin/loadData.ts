import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { prisma } from '../src/database.js'

//read data from json file
async function loadMovieActor() {
  try {
    const __dirname = import.meta.dirname
    const stringData = readFileSync(join(__dirname, '../../shared/movies-actor.json'), 'utf-8')
    const jsonData = JSON.parse(stringData)
    //create data
    for (let i = 0; i < jsonData.length; i++) {
      const item = jsonData[i] as {
        title: string
        year: string
        country: string[]
        category: string[]
        actors: { name: string }[]
      }
      console.log(`processing ${i}/${jsonData.length} ${item.title}`)
      // create movie
      await prisma.movie.create({
        data: {
          title: item.title,
          year: parseInt(item.year),
          country: {
            connectOrCreate: item.country.map((country) => ({
              where: { name: country },
              create: { name: country },
            })),
          },
          category: {
            connectOrCreate: item.category.map((category) => ({
              where: { name: category },
              create: { name: category },
            })),
          },
          actors: {
            connectOrCreate: item.actors.map((actor) => ({
              where: { name: actor.name },
              create: { name: actor.name },
            })),
          },
        },
      })
    }
  } catch (e) {
    console.error(e)
  }
}

void (await loadMovieActor())
