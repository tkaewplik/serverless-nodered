'use strict'
const AWS = require('aws-sdk')

module.exports.putSensorData = async (event) => {
    console.log("add sensor value")
    console.log(event.body)

    const body = JSON.parse(event.body)

    console.log("body!!!!")
    console.log(body);

    const dynamoDb = new AWS.DynamoDB.DocumentClient()

    // revieved timestamp is the time when the data arrival
    const putParams = {
        TableName: process.env.DYNAMODB_SENSOR_TABLE,
        Item: {
            sensor_id: body.sensor_id,
            sensor_timestamp: body.timestamp,
            received_timestamp: Math.floor(Date.now() / 1000),
            value: body.value
    }
  }
  
  await dynamoDb.put(putParams).promise()

  return {
    statusCode: 201
  }
}