import { Meteor } from 'meteor/meteor';

import { SciDAP } from './settings';
import { SDValid } from '../common/sdvalid';

import { Pricing } from '../common/pricing';

Pricing.deny({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});

Meteor.publish('pricing/plans', function features() {
    return Pricing.find();
});

