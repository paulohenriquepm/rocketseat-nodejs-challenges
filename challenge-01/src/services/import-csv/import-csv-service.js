import { parse } from 'csv-parse'
import fs from 'node:fs'

const csvPath = new URL('./tasks.csv', import.meta.url)
const readFileStream = fs.createReadStream(csvPath)
const parser = parse({
  delimiter: ',',
  fromLine: 2
})

export class ImportCsvService {
  async execute() {
    const lines = readFileStream.pipe(parser)

    for await (const line of lines) {
      const [title, description] = line;

      await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        })
      })
    }
  }
}
