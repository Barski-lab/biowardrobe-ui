
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SciDAPFrontendMenu } from './menu';
import { SciDAPBody, SciDAPBodyModule } from './body';

import { MenuService } from './menu.service';
import { sdDirectivesModule } from '../lib/directives';

@Component({
    template: `
        <link href="/css/styles.css" rel="stylesheet" media="screen">
        <link href="/css/plugins.css" rel="stylesheet" media="screen">
        <div id="app">
            <frontendmenu></frontendmenu>
            <router-outlet></router-outlet>
        </div>
    `
})
export class SciDAPFrontendApp {}

export const routes: Routes = [
    { path: 'frontend', component: SciDAPFrontendApp, children: [
        { path: '', redirectTo: './Home', pathMatch: 'full' },
        { path: ':name', component: SciDAPBody }
    ] }
];

@NgModule({
    declarations: [
        SciDAPFrontendApp,
        SciDAPFrontendMenu
    ],
    exports: [
        SciDAPFrontendApp
    ],
    providers: [
        MenuService
    ],
    imports: [
        CommonModule,
        SciDAPBodyModule,
        sdDirectivesModule,
        RouterModule.forChild(routes) // <-- routes
    ]
})
export class SciDAPFrontendAppModule {}

