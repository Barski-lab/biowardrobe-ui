import {Component} from '@angular/core';

import template from './pricing.html'

@Component({
    selector: 'pricing',
    template
})
export class SciDAPPricing {

    _pricing = [{"_id":"2fBixjL47RgDk32Wk","name":"Maxi","price":"2800.  ","pricecomment":"/ year","features":[{"f":"100","d":"new libraries "},{"f":"200","d":"old libraries"},{"f":"1hrs","d":"manual analysis"},{"f":"Free","d":"re-analysis"},{"f":"","d":""}],"rules":[{"price":{"v":"2800","t":"y"},"charge":{"v":"1","t":"y"},"includes":{"v":"100","t":"i"}},{"price":{"v":"0","t":"y"},"charge":{"v":null,"t":"y"},"includes":{"v":"200","t":"i"}}],"userId":"WAJskAsqpvfxi7DBh","type":{"subscription":true,"order":3,"active":true}},{"_id":"8DooGqnHuTz9ycFT5","name":"A la carte","price":"35.00","features":[{"f":"Free","d":"1 year storage included"},{"f":"Free","d":"re-analysis"},{"f":"Free","d":"advanced analysis"},{"f":"$10 year","d":"storage thereafter"},{"f":"","d":""}],"featured":"","rules":[{"price":{"v":"35","t":"y"},"charge":{"v":"1","t":"y"},"includes":{"v":null,"t":"y"}},{"price":{"v":"10","t":"y"},"charge":{"v":null,"t":"m"},"includes":{"v":null,"t":"y"}}],"pricecomment":"/ library","userId":"WAJskAsqpvfxi7DBh","type":{"default":true,"active":true,"order":5}},{"_id":"dprZxYnt39tzLni9N","name":"Unlimited","price":"4500.  ","pricecomment":"/ year","features":[{"f":"Unlimited","d":"libraries"},{"f":"3hrs","d":"manual analysis"},{"f":"Free","d":"re-analysis"},{"f":"Free","d":"advanced analysis"},{"f":null,"d":null}],"rules":[{"price":{"v":"4500","t":"y"},"charge":{"v":null,"t":"y"},"includes":{"v":"9999999999","t":"i"}}],"userId":"WAJskAsqpvfxi7DBh","type":{"subscription":true,"order":4,"active":true}},{"_id":"kJdXnrqaRaksDeKLQ","name":"Midi","price":"1500.  ","pricecomment":"/ year","featured":"1","features":[{"f":"50","d":"new libraries"},{"f":"100","d":"old libraries"},{"f":"Free","d":"re-analysis"},{"f":"Free","d":"advanced analysis"},{"f":null,"d":null}],"rules":[{"price":{"v":"1500","t":"y"},"charge":{"v":"1","t":"y"},"includes":{"v":"50","t":"i"}},{"price":{"v":"0","t":"y"},"charge":{"v":null,"t":"y"},"includes":{"v":"100","t":"i"}}],"userId":"WAJskAsqpvfxi7DBh","type":{"subscription":true,"order":2,"active":true}},{"_id":"v3Pz4u4WdgZPCdkRr","name":"Mini","price":"850.  ","pricecomment":"/ year","features":[{"f":"25","d":"new libraries "},{"f":"50","d":"old libraries"},{"f":"Free","d":"re-analysis"},{"f":"Free","d":"advanced analysis"},{"f":null,"d":null}],"rules":[{"price":{"v":"850","t":"y"},"charge":{"v":"1","t":"y"},"includes":{"v":"25","t":"i"}},{"price":{"v":"0","t":"y"},"charge":{"v":null,"t":"y"},"includes":{"v":"50","t":"y"}}],"userId":"WAJskAsqpvfxi7DBh","type":{"subscription":true,"order":1,"active":true}}];
    pricing;
    constructor(){
      this.pricing =  this._pricing.sort(function (a,b) {
            return a.type.order - b.type.order;
        });
    }

    splitPrice(p,i) {
        if(!p)
            return "";
        if(!i)
            i=0;
        let _p = p.split('.');
        if(_p[i])
            return _p[i];
        return '';
    }
}
