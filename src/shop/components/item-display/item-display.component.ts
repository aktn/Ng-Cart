import { Product } from './../../models/product.interface';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'item-display',
    styleUrls: ['item-display.component.scss'],
    template: `
        <div [formGroup]="parent" class="item-display">
            <div formGroupName="selector">   
                <ul>
                    <li class="items">
                        <div class="info">
                            <div class="section">
                                <select formControlName="product_id">
                                    <option value="">Select Product</option>
                                    <option *ngFor="let product of products" [value]="product.id">
                                        {{ product.name }}
                                    </option>
                                </select>        
                            </div>
                            <div class="prodTotal section">
                                <item-counter [min]="1" [max]="10" [step]="1" formControlName="quantity"></item-counter>
                            </div>         
                            <div class="prodTotal section">
                                <button type="button" class="add" (click)="onAdd()">Add</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `
})

export class ItemDisplayComponent{
    @Input() products: Product[];
    @Input() parent: FormGroup;

    @Output() added = new EventEmitter<any>();
    onAdd(){
         this.added.emit(this.parent.get('selector').value);
         this.parent.get('selector').reset({product_id: '',quantity: 1});
    }

}
