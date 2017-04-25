import { Component } from '@angular/core';

import { MenuService, menuConfig } from './menu.service';

import template from './menu.html';

@Component({
    selector: 'frontendmenu',
    template
})
export class SciDAPFrontendMenu {

    menus;
    searchVisible = false;
    constructor(
        private _menuService: MenuService
    ) {
        this._menuService.setMenuConfig(menuConfig).then(m => this.menus = m);
    }

    searchToggle(focus) {
        this.searchVisible = !this.searchVisible;
    }
}
