import { Meteor } from 'meteor/meteor';

export var pictureConfig = {
    debug: true,
    collectionName: 'pictureFiles',
    downloadRoute: "/scidap/pictures",
    allowClientCode: true,
    // throttle: 1000, //bps
    // chunkSize: 256 * 256 * 4,
    onBeforeUpload: function ():any {
        console.log("onBeforeUpload",this);
        if (this.file.size <= 1024 * 1024 * 16)
            return true;
        else
            return "Max. file size is 16MB you've tried to upload filesize (" + this.file.size + ")";

    }
}
var _pictureFiles;
if(Meteor.isClient) {
    _pictureFiles = new Meteor['Files'](_.defaults(pictureConfig,{
        downloadCallback: function(fileObj) {
            console.debug("downloadCallback:",arguments);
            //                 context:
            //                     @request
            //                     @response
            //                     @user()
            //                     @userId
            //     Notes:
            // Function should return {Boolean} value, to abort download - return false, to allow download - return true
        }
    }));

    _pictureFiles['local_link'] = function(fileRef, version) {                                                   // 96
        if (version == null) {                                                                                             //
            version = 'original';                                                                                            //
        }                                                                                                                  //
        if (this.debug) {                                                                                                  // 1417
            console.info('[FilesCollection] [link()]');                                                                      // 1417
        }                                                                                                                  //
        if (_.isString(fileRef)) {                                                                                         // 1418
            version = fileRef;                                                                                               // 1419
            fileRef = null;                                                                                                  // 1419
        }                                                                                                                  //
        if (!fileRef && !this.currentFile) {                                                                               // 1421
            return '';                                                                                                       // 1421
        }                                                                                                                  //
        var ext, ref, root;                                                                                                  // 1435
        if (version == null) {                                                                                               //
            version = 'original';                                                                                              //
        }                                                                                                                    //
        if ((fileRef != null ? (ref = fileRef.extension) != null ? ref.length : void 0 : void 0) > 0) {                      // 1437
            ext = '.' + fileRef.extension;                                                                                     // 1438
        } else {                                                                                                             //
            ext = '';                                                                                                          // 1440
        }                                                                                                                    //
        if (fileRef["public"] === true) {                                                                                    // 1442
            return (version === 'original' ? fileRef._downloadRoute + "/" + fileRef._id + ext : fileRef._downloadRoute + "/" + version + "-" + fileRef._id + ext);
        } else {
            return (fileRef._downloadRoute + "/" + fileRef._collectionName + "/" + fileRef._id + "/" + version + "/" + fileRef._id + ext);
        }
    };
}


export var pictureFiles = _pictureFiles;
