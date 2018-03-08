const React = require('react')

const Mustache = require('mustache')
const ReactDOMServer = require('react-dom/server')

const fs = require('fs')
const http = require('http')

const Parser = require('html-react-parser')

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

const test_view = JSON.parse(
  fs.readFileSync('data/confirmation-email.json', 'utf-8')
)
//console.log(test_view)

const TestComponentContainingMustache = React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    null,
    Mustache.render('{{title}}', {title: 'This is a test.'})
  ),
  React.createElement('p', null, Parser('<p>inner paragraph</p>', 'text/xml'))
)

const output = ReactDOMServer.renderToStaticMarkup(
  TestComponentContainingMustache
)

//console.log(output)

http
  .createServer(function(req, res) {
    fs.readFile('templates/' + template_name, 'utf-8', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(
        ReactDOMServer.renderToStaticMarkup(
          React.createElement(
            'div',
            null,
            React.createElement(
              'h1',
              null,
              Mustache.render('{{title}}', {title: 'This is a test.'})
            ),
            React.createElement(
              'p',
              null,
              Parser(Mustache.render(template, test_view, snippets))
            )
          )
        )
      )
      res.end()
    })
  })
  .listen(8080)
