module.exports = function(req) {
  if (req.query.theme == undefined && req.session.theme == undefined) req.session.theme = 'default';
  else if (req.query.theme != undefined) req.session.theme = req.query.theme;
  return req.session.theme
}