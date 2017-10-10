import {Component} from '@angular/core';

import template from './pricing.html'

@Component({
    selector: 'pricing',
    template
})
export class SciDAPPricing {

    _pricing = Meteor.settings['public']['pricing'];
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
