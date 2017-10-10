import { NgModule, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SciDAPFeatures } from './features';
import { SciDAPFooter } from './footer';
import { SciDAPPricing } from './pricing';


import template from './home.html';

declare let FrontendMain;

@Component({
    selector: 'scidaphome',
    template,
})
export class SciDAPHome implements OnInit {

    ngOnInit() {
        // FrontendMain.homeCarouselHandler();
        // FrontendMain.setParallaxHandler();

        FrontendMain.sliderCaptionHandler();
        FrontendMain.fullHeightHandler();
        FrontendMain.swiperHandler();
        FrontendMain.homeSliderHandler();
    }
    onScroll(event) {
        FrontendMain.scrollTopHandler();
        FrontendMain.sliderCaptionHandler();
        //FrontendMain.setParallaxHandler();
    }
}


@NgModule({
    declarations: [
        SciDAPHome,
        SciDAPFeatures,
        SciDAPFooter,
        SciDAPPricing
    ],
    exports: [
        SciDAPHome
    ],
    imports: [
        CommonModule
    ]
})
export class SciDAPHomeModule {}

