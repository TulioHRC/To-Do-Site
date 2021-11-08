module.exports = function(app){
  app.get('/error/:err', (req, res) => {
    // Theme Loading
    let theme = 'false'
    if(req.cookies['theme'] != undefined){ // Theme cookie if not defined
      theme = req.cookies['theme']
    }

    res.render('err.ejs', {data: req.params.err.replace(':', ''), theme: theme})
  })
}
