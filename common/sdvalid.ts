
export class SDValid {
    static isEmpty(control: string):boolean {

        if(control === null && typeof control === 'undefined') {
            return true;
        }

        if(typeof control === 'number') {
            return false;
        }

        if ( typeof control === 'string' && control.trim() == "" )
            return true;

        return false;
    }

    static email(control: string): boolean {
        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9]+\.(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])+(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.
        test( control );
    }

    static password(control: string): boolean {
        return /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50})/.test( control );
    }

    static spinner(control: string): boolean{
        return /^\d+(\.\d+)?$/.test( control );
    }

    static required(control: string): boolean {
        if(!SDValid.isEmpty(control)) return true;
        return false;
    }

    static url(control: string): boolean {
        var pattern = new RegExp('^((http|https|ftp):\\/\\/)'+ // protocol
            //username:password@ ?
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,})' +
            '(\\:\\d{2,5})?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(control);
        // /^((http|https|ftp):\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.?)+[a-z]{2,})(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)? (\#[-a-z\d_]*)?$/
    }
}
