import { Product } from './../../models/product.interface';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'item-display',
    styleUrls: ['item-display.component.scss'],
    template: `
        <div [formGroup]="parent" class="item-display">
            <div formGroupName="selector">
                <div *ngFor="let product of products">
                    <div class="item-display__name">
                        {{ product.name }}
                    </div>
                    <div class="item-display__price">
                        {{ product.price }}
                    </div>
                    <div class="item-display__img">
                        <img src="img/{{ product.image }}.svg">
                    </div>
                </div>
                <button type="button" (click)="onAdd()">Add</button>
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
         this.parent.get('selector').reset({product_id: '',quantity: 0});
    }

}
