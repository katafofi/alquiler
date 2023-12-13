const exceljs = require('exceljs');
const path = require('path');
const fs = require('fs');

const dataToExcel = (data, name) => {
    const workbook = new exceljs.Workbook()
    const worksheet = workbook.addWorksheet(name)
    const headers = Object.keys(data[0])
    worksheet.addRow(headers)
    
    data.forEach((row) => {
        worksheet.addRow(Object.values(row))
    })
    
    const filename = `${name}_${new Date().toISOString().replace(/:/g,'-')}.xlsx`
    const filepath = path.join(__dirname, 'reports', filename)

    const directory = path.dirname(filename)
    !fs.existsSync(directory) ? fs.mkdirSync(directory, { recursive: true }) : null

    workbook.xlsx.writeFile(filepath).then(() => {
        console.log('saved: ', filepath)
    }).catch((error) => {
        console.error('error saved: ', error)
    })
}

module.exports = dataToExcel



