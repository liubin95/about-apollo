import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'node:fs'

class LoadData {
  private movies = []

  constructor() {

  }

  async load() {
    await this.readData()
    void await this.scrapeActorData()
    void await this.writeData()
  }

  async readData() {
    this.movies = JSON.parse(fs.readFileSync('./dist/movies.json', 'utf-8'))
  }

  async writeData() {
    fs.writeFileSync('./dist/movies-actor.json', JSON.stringify(this.movies))
  }

  async scrapeActorData() {
    for (const item of this.movies) {
      const actors = []
      console.log(item.title)
      // 搜索电影
      const { data } = await axios.get(`https://www.themoviedb.org/search?query=${item.title.split('/')[0]}`)
      let $ = cheerio.load(data)
      const href = $('a[data-media-type="movie"].result')[0].attribs['href']
      // 演员页面
      const { data: actorData } = await axios.get(`https://www.themoviedb.org${href}/cast?language=zh-CN`)
      $ = cheerio.load(actorData)
      $('ol.people.credits').children().each((i, el) => {
        actors.push({ name: $(el).find('div.info p a').first().text() })
      })
      // sleep 1-5s
      await new Promise(resolve => setTimeout(resolve, Math.random() * 4000 + 1000))
      item.actors = actors.splice(0, 10)
    }
  }
}

void new LoadData().load()
