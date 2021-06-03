const express = require('express')
const api = express.Router()
const database = require('../database.js')
const database_mysql = require('../database-mysql')

api.get('/', (req, res) => {

  var db = database_mysql.init();
  database_mysql.connect(db);

  var aData = [];

  db.query('select * from tc_mining_curuser limit 10', function(req, res) {    
    for (let i = 0; i < res.length; i++) {
      aData.push(res[i]);      
      console.log(aData[i]);
      break;
    }    
    db.end();
  });
  console.log(aData);
  /*
  let result = database.people;
  Object.keys(req.query).forEach((key) => {
    result = result.filter((data) => {
      return data[key] && data[key].toString() === req.query[key].toString()
    })
  })
  console.log(result);
  res.send(result)
  */
 res.send(JSON.stringify(aData));
})

api.get('/:id', (req, res) => {
  res.send(
    database.people.filter((data) => {
      return data.id && data.id.toString() === req.params.id.toString()
    })[0]
  )
})

api.post('/', (req, res) => {
  const data = {
    id: database.people.length + 1,
  }
  Object.keys(req.body).forEach((key) => {
    data[key] = req.body[key]
  })
  database.people = [...database.people, data]
  res.send(data)
})

api.put('/:id', (req, res) => {
  let result = null
  database.people.filter((data) => {
    return data.id && data.id.toString() === req.params.id.toString()
  }).map((data) => {
    Object.keys(data).forEach((key) => {
      delete data[key]
    })
    Object.assign(data, req.body)
    data.id = req.params.id
    result = data
  })
  res.send(result)
})

api.delete('/:id', (req, res) => {
  const result = database.people.filter((data) => {
    return data.id && data.id.toString() === req.params.id.toString()
  })
  database.people = database.people.filter((data) => {
    return !data.id || data.id.toString() !== req.params.id.toString()
  })
  res.send(result)
})

module.exports = api