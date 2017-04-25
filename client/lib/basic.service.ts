'use strict';

import { Meteor } from 'meteor/meteor';

import { FormGroup, FormArray, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

export class BasicService {

    protected _submitting = false;

    protected subscription;
    protected subscriptions:Array<any> = [];

    protected formGroup:FormGroup;

    protected __disposables: {dispose: string, track: Object, id?: string}[] = [];

    constructor (){}

    protected runWithPromise(accountFn: Function, inTimeout?: boolean): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            accountFn(this.getResolver(resolve, reject, inTimeout));
        });
    }

    protected getResolver(resolve, reject, inTimeout?: boolean): (error?: any) => void {
        let newResolve = inTimeout ? () => setTimeout(() => resolve()) : resolve;
        return error => {
            if (error) reject(error); else newResolve();
        }
    }

    protected promiseCall(name,...args : any[]):Promise<any> {
        return new Promise((resolve,reject) => Meteor.apply(name,args,(err,result) => err?reject(err):resolve(result)));
    }

    public checkSubmit():boolean {
        this._submitting = true;
        let status = Meteor.status();
        if(!status['connected']) {
            this._submitting = false;
            swal({ title: "There is no connection to the server, please repeat the request later.", type: 'error', text: status.reason,  timer: 3000 });
        }
        return this._submitting;
    }

    protected makeData(form, value) {
        if( !form.dirty ) return;
        let uo = {};
        for(let k in value) {
            let f = form.controls[k];
            if( f && f instanceof FormControl && f.dirty && f.valid) {
                uo[k] = value[k];
            }
            if( f && f instanceof FormGroup && f.dirty) {
                uo[k] = this.makeData(f, value[k]);
            }
            if( f && f instanceof FormArray && f.dirty && f.valid) {
                uo[k] = value[k];
            }
        }
        return uo;
    }

    setFieldsFromDB(v, form?) {
        if ( !form ) form=this.formGroup;
        if ( !v ) v=[];

        _.keys(form.controls)
            .forEach( k => {
                if (form.controls[k] instanceof FormControl)
                    form.controls[k].reset(v && v[k] || null, {onlySelf: false, emitEvent: false});

                if (form.controls[k] instanceof FormGroup)
                    this.setFieldsFromDB(v[k], form.controls[k])
            })
    }

    formValid():boolean{
        return this.formGroup.valid;
    }

    getForm() {
        return this.formGroup;
    }

    /**
     * Tracks the given value and disposes of it when the object gets destroyed
     */
    public set tracked(track: Object) {
        this.__disposables.push(this.getDispose(track));
    }

    public cleanup(){
        this.__disposables.forEach(d => d.track[d.dispose]());
    }

    public trackedId(track: Object, id?) {
        let st = this.__disposables.find(d => d.id === id);
        if(st) st.track[st.dispose]();

        let o = this.getDispose(track);
        o['id'] = id;
        this.__disposables.push(o);
    }

    private getDispose(track) {

        if (track instanceof Subscription) {
            return {
                track,
                dispose: "unsubscribe"
            }
        }

        if (typeof track["stop"] === "function" && track['subscriptionId']) {
            return {
                track,
                dispose: "stop"
            };
        }

        if (typeof track["destroy"] === "function") {
            return {
                track,
                dispose: "destroy"
            };
        }

        if (typeof track["dispose"] === "function") {
            return {
                track,
                dispose: "dispose"
            };
        }

        throw new Error("Could not find a method that would destroy an object");
    }

}
