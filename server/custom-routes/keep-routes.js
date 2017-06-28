let Keep = require('../models/keep')

export default {
  keepsByUserId: {
    path: 'getKeeps',
    reqType: 'get',
    method(req, res, next) {
      debugger
      let action = 'Get Keeps by UserId'
      Keep.find({ creatorId: req.userId })
        .then(keeps => {
              res.send(handleResponse(action, keeps))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },

}


function handleResponse(action, data, error) {
    var response = {
      action: action,
      data: data
    }
    if (error) {
      response.error = error
    }
    return response
  }