import { NgModule, Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SciDAPHome, SciDAPHomeModule } from './home';

@Component({
    template: `
        <scidaphome *ngIf="scidaphome == 'Home'"></scidaphome>
    `
})
export class SciDAPBody implements OnInit {

    scidaphome:any;

    constructor(
        private _router:Router,
        private _route:ActivatedRoute
    ) {}

    ngOnInit() {
        this._route.params.subscribe(param => this.switchPages(param['name']));
    }

    switchPages(name:string) {
        this.scidaphome = name;
        switch(name) {
            case 'Login':
                window.location.replace('https://biowardrobe.cchmc.org/ems/');
                break;
            case 'BioWardrobe':
                window.location.replace('https://biowardrobe.com/projects/wardrobe/wiki');
                break;
            case 'Home':
                this.scrollToAnchor("body");
                break;
            case 'Features':
                this.scidaphome = 'Home';
                this.scrollToAnchor("features");
                break;
            case 'Pricing':
                this.scidaphome = 'Home';
                this.scrollToAnchor("pricing");
                break;
            default:
                break
        }
    }
    scrollToAnchor(tag) {
        setTimeout(function(){
            jQuery('html,body').animate({scrollTop: jQuery(tag).offset().top},'slow');
        }, 10);
    }
}

@NgModule({
    declarations: [
        SciDAPBody
    ],
    exports: [
        SciDAPBody
    ],
    imports: [
        CommonModule,
        SciDAPHomeModule
    ]
})
export class SciDAPBodyModule {}

