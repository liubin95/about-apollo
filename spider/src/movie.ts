import axios from 'axios'
import * as cheerio from 'cheerio'
import * as fs from 'node:fs'

class LoadData {
  private movies = []

  constructor() {

  }

  async load() {
    void await this.scrapeMovieData()
    this.writeData()
  }

  writeData() {
    // write data to /dist/movies.json
    fs.writeFileSync('./dist/movies.json', JSON.stringify(this.movies))
  }

  async scrapeMovieData(start = 0) {
    console.log(`from ${start} to ${start + 25}`)
    const { data } = await axios.get(`https://movie.douban.com/top250?start=${start}&filter=`)
    const $ = cheerio.load(data)

    $('.item').each((i, element) => {
      const title = $(element).find('.title').text().replace('&nbsp;', '').trim()
      console.debug(title)
      const info = $(element).find('.bd').find('p').text().trim().split('\n')[1].replace('&nbsp;', '').split('/')
      const year = info[0].trim()
      const country = info[1].trim().split(' ')
      const category = info[2].split(' ')
      this.movies.push({ title, year, country, category })
    })
    if (this.movies.length < 250) {
      void await this.scrapeMovieData(start + 25)
    }
  }
}

void new LoadData().load()


