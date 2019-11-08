var helpers = {}

helpers.validation = {}

helpers.validation.email = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

helpers.validation.name = (name) => {
  if(name.length == 0) 
    return false
  return true
}

helpers.validation.message = message => {
  if(message.length == 0)
    return false
  return true
}

module.exports = helpers
