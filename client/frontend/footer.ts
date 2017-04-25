import {Component, NgZone} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import template from './footer.html'

@Component({
    selector: 'footer',
    template
})

export class SciDAPFooter {

    _tweets = [];

    constructor(
        private _zone:NgZone,
        private _sanitizer:DomSanitizer
    ) {
    }

    ngOnInit() {
        let self = this;
        function handleTweets(tweets){
            self._zone.run(()=>{
                self._tweets = tweets;
                console.log(self._tweets);
            });
        }
        let config = {
            // "list": {"listSlug": 'inspiration',"screenName": 'biowardrobe'},
            "likes":{"screenName": 'biowardrobe'},
            "dataOnly":true,
            "domId": '',
            "maxTweets": 3,
            "enableLinks": true,
            "showUser": true,
            "showTime": true,
            "dateFunction": '',
            "showRetweet": false,
            "customCallback": handleTweets,
            "showInteraction": false
        };
        window.twitterFetcher.fetch(config);
    }

    getTweet(p){
        let html=p.tweet+'<a href="'+p.permalinkURL+'" class="time">'+p.time+'</a>';
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

}
