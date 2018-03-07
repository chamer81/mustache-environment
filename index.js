const React = require('react')

const Mustache = require('mustache')
const ReactDOMServer = require('react-dom/server')

const view = {
  title: 'What Joe spends',
  calc: function() {
    return 2 + 4
  }
}

const ComponentContainingMustache = React.createElement(
  'div',
  null,
  React.createElement('h1', null, Mustache.render('{{title}}', view)),
  React.createElement('p', null, Mustache.render('Joe spends {{calc}}', view))
)

const output = ReactDOMServer.renderToStaticMarkup(ComponentContainingMustache)

console.log(output)