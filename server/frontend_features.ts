import { Meteor } from 'meteor/meteor';

import { Features } from '../common/frontend/features';

export function loadFrontendFeatures() {
    Features.remove({});
    if (Features.find().count() === 0) {

    let data = Meteor.settings['features'];

    for (let i = 0; i < data.length; i++) {
        Features.insert(data[i]);
    }
  }
}

Features.deny({
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

Meteor.publish('features', function features() {
    return Features.find();
});

