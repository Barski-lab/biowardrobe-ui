import { FormControl, FormGroup } from '@angular/forms';
import { SDValid } from '../../common/sdvalid';

export interface ValidationResult {
    [key:string]:any;
    message:string;
}

export class SDValidators {

    static email(control: FormControl): ValidationResult {
        if (SDValid.isEmpty(control.value)) return null;
        if (SDValid.email(control.value )) return null;
        return { "email": true, message: "Not a valid email." };
    }

    static password(control: FormControl): ValidationResult {
        if (SDValid.isEmpty( control.value)) return null;
        if (SDValid.password(control.value)) return null;
        return { "password": true, message: "Not a strong password. At least 8 characters long should include smalls, capitals and numbers."  };
    }

    static required(control: FormControl): ValidationResult {
        if(!SDValid.isEmpty(control.value)) return null;
        return { "required": true, message: "This field is required."};
    }

    static spinner(control: FormControl): ValidationResult {
        if(SDValid.spinner(control.value)) return null;
        // if(!SDValid.isEmpty(control.value)) return null;
        return { "spinner": true, message: "Not a valid number."};
    }

    static url(control: FormControl): ValidationResult {
        if(SDValid.url(control.value)) return null;
        // if(!SDValid.isEmpty(control.value)) return null;
        return { "url": true, message: "Url must be in format: scheme://host[:port][/]path[?query][#fragment]"};
        //scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]
    }

    //CONTROL GROUP VALIDATORS
    static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if (password.value !== confirmPassword.value) {
            return {
                mismatchedPasswords: true
            };
        }
    }
}
}
