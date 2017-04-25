import { FormControl, Validators, FormArray, FormGroup, ValidatorFn, AsyncValidatorFn  } from '@angular/forms';

import { SDValidators } from './sdvalidators';

export * from './sdvalidators';

/*
 *
 */
export class SDInput extends FormControl {
    type: any;
    focus: boolean = false;
    disabled: boolean = false;
    public readonly: boolean = false;
    public placeHolder: string;
    onChangeDuplicate;
    constructor(
        public text,
        public required?:boolean,
        value?: any,
        validator?: ValidatorFn,
        asyncValidator?: AsyncValidatorFn)
    {
        super(value,validator,asyncValidator);
        let val = [];
        if(required)
            val.push(SDValidators.required);

        if(validator)
            val.push(validator);

        if(val.length >0)
            this.validator = Validators.compose(val);
    }

    registerOnChange(fn: Function): void {
        this._onChange = this._onChange.filter(f => ''+f !== ''+fn);
        super.registerOnChange(fn);
    }

    deRegisterOnChange(fn: Function): void {
        this._onChange = this._onChange.filter(f => ''+f !== ''+fn);
    }

}

export class SDInputEmail extends SDInput {
    type = 'email';
    constructor(
        text:any,
        required?:boolean,
        value?: any,
        public verified?:boolean,
        public primary?:boolean
    )
    {
        super(text,required,value,SDValidators.email);
    }
}

export class SDInputUrl extends SDInput {
    type = 'url';
    constructor(
        text:any,
        required?:boolean,
        value?: any
    )
    {
        super(text,required,value,SDValidators.url);
    }
}

export class SDInputText extends SDInput {
    type = 'text';
}

export class SDInputCheckbox extends SDInput {
    type = 'checkbox';
    constructor(
        text:any,
        value?: any,
        public style?: string)
    {
        super(text,false,value);
    }
}


export class SDInputSpinnerText extends SDInput {
    type = 'text';
    constructor(
        text:any,
        required?:boolean,
        value?: any)
    {
        super(text,required,value,SDValidators.spinner);
    }

}

export class SDInputPassword extends SDInput {
    type = 'password';
    constructor(
        text:any,
        required?:boolean,
        value?: any)
    {
        super(text,required,value,SDValidators.password);
    }
}

export class SDInputImage extends SDInput {
    type = 'image';

    constructor(
        text:any,
        value?: any,
        public fileId?:any)
    {
        super(text,false,value);
    }
}

export class SDInputArray extends FormArray {
    type = 'array';

    constructor(
        public text,
        value: any,
        validator?: ValidatorFn,
        asyncValidator?: AsyncValidatorFn)
    {
        super(value,validator,asyncValidator);

        // var val = [];
        // if(required)
        //     val.push(SDValidators.required);
        //
        // if(validator)
        //     val.push(validator);
        //
        // if(val.length >0)
        //     this.validator = Validators.compose(val);
    }
}

export class SDInputGroup extends FormGroup {
    type = 'group';

    constructor(
        public text,
        value: any,
        validator?: ValidatorFn,
        asyncValidator?: AsyncValidatorFn)
    {
        super(value,validator,asyncValidator);
    }
}

export const SD_CONTROLS:Array<any> = [SDInput, SDInputEmail, SDInputImage, SDInputPassword, SDInputText, SDInputArray, SDInputGroup];