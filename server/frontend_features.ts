import { Meteor } from 'meteor/meteor';

import { Features } from '../common/frontend/features';

export function loadFrontendFeatures() {
    if (Features.find().count() === 0) {

    let data = [
        {
            'faicon': 'fa-users',
            'feature': 'Collaborative Environment',
            'description': 'SciDAP enables you to share every piece of your work with everyone you would like. You can share a particular result from your project as well as the whole project'
        },
        {
            'faicon': 'fa-bar-chart',
            'feature': 'Interactive Charts',
            'description': 'Every data point in a chart can be inspected. Parameters for a chart can be adjusted without reanalyse of the data. Plot can be saved in a vector format like SVG without quality lost'
        },
        {
            'faicon': 'fa-desktop',
            'feature': 'Responsive Interface',
            'description': 'Cutting edge frameworks like angular2 and typescript help to manage our complex layouts for different devices'
        }
    ];

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

