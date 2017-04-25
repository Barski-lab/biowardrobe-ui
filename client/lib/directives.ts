//http://stackoverflow.com/questions/34502768/why-angular2-template-local-variables-are-not-usable-in-templates-when-using-ng/34503163#34503163

import { NgModule, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[sdFocus]'
})
export class sdFocus {
    @Input('sdFocus') hasFocus: boolean;
    constructor(private el: ElementRef) {}

    // @Input() set sdFocus(condition: boolean) {
    //     if (condition) {
    //         this.el.nativeElement.focus();
    //     }
    // }

    ngAfterViewInit() {
        if(this.hasFocus)
            this.el.nativeElement.focus();
    }
    ngOnChanges(changes) {
        if(changes.hasFocus.currentValue == true) {
            this.el.nativeElement.focus();
        }
    }
}

@Directive({
    selector: '[sdDisabled]',
})
export class sdDisabled {
    @Input('sdDisabled') isDisabled: boolean;

    constructor(private el: ElementRef) {}

    @Input() set sdDisabled(condition: boolean) {
        if (condition) {
            this.el.nativeElement.setAttribute('disabled','disabled');
        } else {
            this.el.nativeElement.removeAttribute('disabled');
        }
    }
}

@Directive({
    selector: '[sdReadOnly]',
})
export class sdReadOnly {
    @Input('sdReadOnly') isDisabled: boolean;

    constructor(private el: ElementRef) {}

    @Input() set sdReadOnly(condition: boolean) {
        if (condition) {
            this.el.nativeElement.setAttribute('readonly','readonly');
        } else {
            this.el.nativeElement.removeAttribute('readonly');
        }
    }
}

const SD_DIRECTIVES:Array<any> = [ sdFocus, sdReadOnly, sdDisabled ];

@NgModule({
    declarations: [ SD_DIRECTIVES ],
    exports: [ SD_DIRECTIVES ]
})
export class sdDirectivesModule {
}