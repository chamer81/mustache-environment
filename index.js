const React = require('react')

const Mustache = require('mustache')
const ReactDOMServer = require('react-dom/server')

const fs = require('fs')

const test_template = fs.readFileSync('templates/tiny.mustache', 'utf-8')
console.log(test_template)
const test_view = JSON.parse(fs.readFileSync('data/test_view.json', 'utf-8'))
console.log(test_view)

const TestComponentContainingMustache = React.createElement(
  'div',
  null,
  React.createElement('h1', null, Mustache.render('{{title}}', test_view)),
  React.createElement('p', null, Mustache.render(test_template, test_view))
)

const output = ReactDOMServer.renderToStaticMarkup(
  TestComponentContainingMustache
)

console.log(output)
