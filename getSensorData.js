'use strict'
const AWS = require('aws-sdk')

module.exports.getSensorData = async (event) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_SENSOR_TABLE
  }

//   for local testing
//   const dynamodb = new AWS.DynamoDB.DocumentClient()
  const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'test',  // needed if you don't have aws credentials at all in env
    secretAccessKey: 'test' // needed if you don't have aws credentials at all in env
    })
  const result = await dynamodb.scan(scanParams).promise()


  if (result.Count === 0) {
    return {
      statusCode: 404
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      total: result.Count,
      items: await result.Items.map(customer => {
        return {
          name: customer.id,
          value: customer.value
          }
        })
    })
  }

}

module.exports.getWebpage = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      total: 10,
      items: "edd"
    })
  }

}