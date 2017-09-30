import { Product } from './../../models/product.interface';
import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
    selector: 'item-cart',
    styleUrls: ['item-cart.component.scss'],
    template: `
        <div [formGroup]="parent">
            <div formArrayName="cart">
                <div *ngFor="let item of items; let i = index;">
                    <div class="item-cart" [formGroupName]="i">
                        <div class="item-cart__name">
                            {{ getProduct(item.value.product_id).name }}
                        </div>
                        <div class="item-cart__price">
                            {{ getProduct(item.value.product_id).price | currency:'GBP': true }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class ItemCartComponent{

    @Input() parent: FormGroup;
    @Input() map: Map<number, Product>;

    get items(){
        return (this.parent.get('cart') as FormArray).controls;
    }

    getProduct(id: any){
        return this.map.get(id);
    }
    
}