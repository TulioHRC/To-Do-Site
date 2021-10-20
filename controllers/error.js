module.exports = function(app){
  app.get('/error/:err', (req, res) => {
    res.render('err.ejs', {data: req.params.err.replace(':', '')})
  })
}
