import { Mongo } from 'meteor/mongo';

export class PricingPlan {
    public name:string;
    public price:number;
    public pricecomment:string;
    public featured:boolean;

    public features:[{f:string,d:string}];
    public rules: [{
        price: { v:number, t:string }, //might be different currency, price for the mm(minutes),d(days),m,y of use or i(item)
        charge: { v:number, t:string },
        includes: { v:number, t:string }
    }]
}

export var Pricing: any;

Pricing = new Mongo.Collection<PricingPlan>('pricing');
