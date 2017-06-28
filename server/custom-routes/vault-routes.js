let Keep = require('../models/keep')
let Vault = require('../models/vault')

export default {
  vaultsByUserId: {
    path: '/getVaults/:userId',
    reqType: 'get',
    method(req, res, next) {
      //debugger
      let action = 'Get Vaults by UserId'
      Vault.find({ creatorId: req.params.userId })
        .then(vaults => {
          //debugger
          res.send(handleResponse(action, vaults))
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