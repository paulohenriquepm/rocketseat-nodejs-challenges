import { ImportCsvService } from './import-csv-service.js'

const importCsvService = new ImportCsvService()
console.log('Starting import of CSV...')
importCsvService.execute()
console.log('Done!')
