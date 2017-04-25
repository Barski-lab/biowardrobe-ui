import {Meteor} from "meteor/meteor"
import {Mongo} from "meteor/mongo"

export var Features: any;

Features = new Mongo.Collection('frontend_features');
// Features.attachSchema(new SimpleSchema({
//     faicon: {
//         type: String,
//         optional: true
//     },
//     feature: {
//         type: String,
//         optional: false
//     },
//     description: {
//         type: String,
//         optional: false
//     }
// }));

if(Meteor.isClient) {
    Meteor.subscribe("features");
}