import { Product } from './../../models/product.interface';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
    selector: 'item-cart',
    styleUrls: ['item-cart.component.scss'],
    template: `
        <div [formGroup]="parent">
            <div formArrayName="cart">
                <ul>
                    <div *ngFor="let item of items; let i = index;">
                        <div class="item-cart" [formGroupName]="i"> 
                            <li class="items">
                                <div class="info">
                                    <div class="section">
                                        <img src="img/{{ getProduct(item.value.product_id).image }}.svg" class="itemImg">    
                                        <h3>{{ getProduct(item.value.product_id).name }}</h3> 
                                        <p>{{ getProduct(item.value.product_id).price | currency:'GBP': true }}</p>
                                        <input type="number" step="1" min="1" max="10" formControlName="quantity">
                                    </div>
                                    <div class="prodTotal section">
                                        <img src="img/remove.svg" (click)="removeItem(item, i)" />
                                    </div>
                                </div>
                            </li>      
                        </div>
                    </div>
                </ul>
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

    @Output() remove = new EventEmitter<any>();
    removeItem(item: Product, index: number){
        this.remove.emit({item, index});
        console.log(index, item);
    }   
}