import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';
import { Random } from 'meteor/random';

import { SciDAP } from './settings';
import { pictureConfig } from '../common/picturefiles';

/*
* TODO: check if file is actually media file
*/
export var pictureFiles = new Meteor['Files'](_.extend(pictureConfig,{
    storagePath: '/assets/app/uploads/pictureFiles',
    protected: () => true,
    namingFunction: () => Random['_randomString'](25, 'AZQWXSECDRFVTBGYNHUJMIKOLPzaqwsxecdrfvtgbyhnujimkolp0123456789'),
}));

pictureFiles.collection.deny({
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
