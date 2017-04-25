import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';

import { SciDAP } from './settings';

process.env.MAIL_URL = Meteor.settings.email.url;

Meteor.methods({
    SendEmail: function(to, subject, text) {
        check(to, String);
        check(subject, String);
        check(text, String);
        if (to) {
            Meteor.defer(function() { //TODO: async?
                Email.send({
                    from: Meteor.settings.email.from,
                    to: to,
                    replyTo: Meteor.settings.email.from,
                    subject: subject,
                    text: text
                })
            });
        }
    },
});
