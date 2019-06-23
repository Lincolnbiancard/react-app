import PublicSubscriber from 'pubsub-js';

export default class MyHandleBugs{
    publicErrors(response){
        response.errors.forEach(function (error, index) {
            PublicSubscriber.publish("ErrorPublish", error);
        });
    }
}