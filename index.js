const Mustache = require('mustache')

const fs = require('fs')
const http = require('http')

const filenames = fs.readdirSync('snippets')

const snippets = filenames
  .filter(filename => filename.endsWith('.mustache'))
  .reduce((obj, filename) => {
    obj[filename.replace('.mustache', '')] = fs.readFileSync(
      'snippets/' + filename,
      'utf-8'
    )
    return obj
  }, {})
//console.log(JSON.stringify(snippets))

const template_name =
  process.argv.length > 2 ? process.argv[2] : 'test.mustache'

const template = fs.readFileSync('templates/' + template_name, 'utf-8')
//console.log(test_template)

const test_view = JSON.parse(fs.readFileSync('data/report-data.json', 'utf-8'))
//console.log(test_view)

http
  .createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(Mustache.render(template, test_view, snippets))
  })
  .listen(8080)
