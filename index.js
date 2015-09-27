var https = require('https')
var http = require('http')
var fs = require('fs')

function requireOnline(address) {
  return new Promise(function(resolve, reject) {
    var method = address.slice(0, 5) === 'https' ? https : http

    var split = address.split('/')
    var name = split[split.length - 1]
    console.log(name)
    var file = ''

    method.get(address, function(res){
      res.on('data', function(d) {
        file += d.toString()
      })

      res.on('end', function(e) {
        var output = fs.createWriteStream('./downloaded/' + name)
        output.write(file)
        output.end()
        output.on('finish', function() {
          resolve(require('./downloaded/' + name))
        })
      })
    })
  })
}

module.exports = requireOnline