import { Mongo } from 'meteor/mongo';

export var Stats: any;

Stats = new Mongo.Collection('stats');
