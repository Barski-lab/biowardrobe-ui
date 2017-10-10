import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
import { Component, NgModule, enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Ng2BootstrapModule } from 'ngx-bootstrap';

import { SciDAPFrontendAppModule } from './frontend/app';

const routes: Routes = [
    { path: '', redirectTo: '/frontend/Home', pathMatch: 'full'},
    { path: '**', redirectTo: '/frontend/Home'}
];

@Component({
    selector: 'scidap',
    template: `<router-outlet></router-outlet>`
})
export class SciDAPApp {
    private currentRoute:boolean = false;
    constructor(_router:Router) {
        ga('create', Meteor.settings["public"]["analyticsSettings"]["Google Analytics"]["trackingId"], 'auto');
        //http://stackoverflow.com/questions/37655898/tracking-google-analytics-page-views-in-angular2
        _router.events.distinctUntilChanged((previous: any, current: any) => {
            if(current instanceof NavigationEnd) {
                return previous.url === current.url;
            }
            return true;
        }).subscribe((x:any) => {
            ga('send', 'pageview', x.url);
        });
    }
}

@NgModule({
    declarations: [
        SciDAPApp
    ],
    entryComponents: [
        SciDAPApp
    ],
    imports: [
        BrowserModule,
        FormsModule,
        Ng2BootstrapModule,
        RouterModule.forRoot(routes),
        // AuthModule,
        SciDAPFrontendAppModule
    ],
    bootstrap: [ SciDAPApp ]
})
export class AppModule {}

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

//Temporary patch to meteor-promise package
Meteor['promise']= function (name,...args : any[]):Promise<any> {
    return new Promise((resolve,reject) => Meteor.apply(name,args,(err,result) => err?reject(err):resolve(result)));
};