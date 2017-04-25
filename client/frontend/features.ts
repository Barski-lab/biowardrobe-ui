import { Component, NgZone } from '@angular/core';
import { Features } from '../../common/frontend/features';

import template from './features.html'

@Component({
    selector: 'features',
    template
})

export class SciDAPFeatures{

    features: Mongo.Cursor<Object>;

    rows: Array< any >[];
    cols = 3;

    constructor(
        private _zone:NgZone
    ) {
        this.rows = new Array();
        this._initAutorun();
    }

    private _initAutorun():void {
        let self = this;
        Tracker.autorun(() => {
            this._zone.run(() => {
                self.features = Features.find();
                let rowsn = 0;
                self.rows.splice(0,self.rows.length);
                let tot=0;
                self.features.forEach((feature) => {
                    if(tot%this.cols == 0) {
                        self.rows.push(new Array());
                        rowsn ++;
                    }
                    self.rows[rowsn -1].push(feature);
                    tot++;
                });
            })
        });
    }

}
