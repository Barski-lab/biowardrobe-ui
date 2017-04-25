import { Meteor } from 'meteor/meteor';

// const mode = process.env.NODE_ENV || "production";
//
// export interface SciDAPSettingsStatic {
//     name:string;
//     logLevel: string;
//     base_url: string;
//     public: any,
//     email: {
//         url:string;
//         from:string;
//     };
//     oauth:[{service:string,clientId:string,secret:string}];
// }

export module SciDAP {

    let stream:any = {
        outputMode: "short"
    };

    if(!!Meteor.settings['logFile'] && Meteor.settings['logFile'].length>0)
        stream.path = Meteor.settings['logFile'];
    else
        stream.stream = process.stderr;

    export var Log = logger.bunyan.createLogger({
        name: "SciDAP Server",
        src: Meteor.settings["logLevel"] == 'debug',
        streams: [ stream ],
        level: Meteor.settings["logLevel"]
    });

}

