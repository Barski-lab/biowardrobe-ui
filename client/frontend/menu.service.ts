import {Injectable} from '@angular/core';

export interface menuItem {
    name: string;
    path?: string;
    route?: string;
    icon?: string;
    text?: string;
    items?: Array<menuItem>;
}

@Injectable()
export class MenuService {

    menuPromise;

    constructor() {
        this.setMenuConfig(menuConfig);
    }

    setMenuConfig(menuconfig){
        return this.menuPromise = new Promise((resolve) => {resolve(menuconfig)});
    }

    getMenus() {
        return this.menuPromise;
    }

    addMenu(mi:menuItem) {
        this.menuPromise.then(m => m.push(mi));
    }

    addSubMenu(i:number, mi:menuItem) {
        this.menuPromise.then(m => m[i].items.push(mi));
    }

    getMenu(i:number) {
        return this.menuPromise.then(m => m[i]);
    }
}

export let menuConfig = <Array<menuItem> >[
    {
        name: 'Home'
    },
    {
        name: 'Features'
    },
    {
        name: 'Pricing'
    },
    {
        name: 'About',
        items: [
            {
                name: 'Team'
            },
            {
                name: 'BioWardrobe'
            }
        ]
    },
    {
        name: 'Login'
    }
];
