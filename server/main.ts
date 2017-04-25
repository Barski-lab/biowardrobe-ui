import { Meteor } from 'meteor/meteor';

import { SciDAP } from './settings';
//import {loadFrontendMenu} from './frontend_menu';
import { loadFrontendFeatures } from './frontend_features';

Meteor.startup(() => {
        // //https://support.google.com/cloud/answer/6158849?hl=en&ref_topic=6262490
        // Meteor.settings["oauth"].forEach((s)=>{
        //     SciDAP.Log.info("Service: "+s.service+" configured.");
        //     ServiceConfiguration.configurations.upsert( { service: s.service }, {
        //         $set: s
        //     });
        // });

        //loadFrontendMenu();
        loadFrontendFeatures();
        // WebApp.rawConnectHandlers.use(function(req, res, next) {
        //     res.setHeader("Access-Control-Allow-Origin", "*");
        //     return next();
        // });
        Throttle.setMethodsAllowed(false);
        if(Meteor.settings['logLevel'] == "debug")
            Throttle.setDebugMode(true);
    }
);

export * from './settings';
