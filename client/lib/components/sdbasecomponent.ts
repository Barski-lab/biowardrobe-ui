import { Random } from 'meteor/random';

import { Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SDInput, SDInputText } from '../sdinputs';

import {Subscription, AsyncSubject} from "rxjs";
import {OnDestroy} from "@angular/core";

export class SDBaseComponent implements OnDestroy {
    id = Random.id();

    protected _showError;

    /**
     *  Functions to provide error support
     * @param comp
     * @returns {boolean}
     */
    isInvalid(comp):any {
        if(comp && comp instanceof FormControl && comp.errors )
            return !!this._showError && comp.errors;

        if(comp && comp instanceof FormGroup)
            return !!this._showError && !comp.valid;

        return false;
    }

    /**
     *
     * @param comp
     * @returns {string}
     */
    invalidMessage(comp:any) {
        if(comp && comp instanceof FormControl && comp.errors)
            return comp.errors.message;
        return "You have some errors in the form. Please fix them.";
    }

    /**
     *
     * @param comp
     * @returns {any}
     */
    invalidStyle(comp) {
        if(!!comp.valid||!this._showError)
            return '';
        else
            return 'has-error';
    }

    // getRoutes(component: any) {
    //     return Reflect.getMetadata('annotations', component)
    //         .filter(a => {
    //             return a.constructor.name === 'RouteConfig';
    //         }).pop();
    // }

    back() {
        window.history.back();
    }

    private __disposables: {dispose: string, track: Object}[] = [];

    public viewReady = new AsyncSubject();

    /**
     * Tracks the given value and disposes of it when the object gets destroyed
     */
    public set tracked(track: Object) {

        if (track instanceof Subscription) {
            this.__disposables.push({
                track,
                dispose: "unsubscribe"
            });
            return;
        }

        if (typeof track["destroy"] === "function") {
            this.__disposables.push({
                track,
                dispose: "destroy"
            });
            return;
        }

        if (typeof track["dispose"] === "function") {
            this.__disposables.push({
                track,
                dispose: "dispose"
            });
            return;
        }

        throw new Error("Could not find a method that would destroy an object");
    }

    ngOnDestroy(): void {
        this.__disposables.forEach(d => d.track[d.dispose]());
    }

    ngAfterViewInit(){
        this.viewReady.next(true);
        this.viewReady.complete();

    }

}

export class SDBaseControlComponent extends SDBaseComponent  {
    @Input()
    public sdControl:SDInput = new SDInputText('dummy');

    @Input()
    public disabled:boolean = false;

    @Input()
    public readonly:boolean = false;

    constructor() {
        super();
    }

    isInvalid() {
        return this.sdControl && this.sdControl.valid == false && this.sdControl.dirty == true;
    }

    invalidMessage() {
        return this.sdControl.errors['message'];
    }

}
