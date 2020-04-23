'use strict';

const AWS = require('aws-sdk');
const {eventsQueue} = process.env;
const SQS = new AWS.SQS();

module.exports.hello = async event => {
    try {
        await SQS.sendMessage({
            MessageBody: event.body,
            QueueUrl: eventsQueue
        }).promise();

        // for debug only.
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: `Event sent to queue ${eventsQueue}`,
                    input: event,
                },
                null,
                2
            ),
        };
        // for debug only.

        // for prod.
        // return {
        //     statusCode: 200,
        //     body: `event sent to queue [${event.body}}]`
        // };
        // for prod.

    } catch (e) {
        console.error(`Failed to send message to queue [${eventsQueue}], message [${JSON.stringify(event)}]`, e);
    }
};
