import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

//Services
import { ShopService } from './../../services/shop.service';

//Model
import { Product, Item } from './../../models/product.interface';

import 'rxjs/add/observable/forkJoin';

@Component({
    selector : 'shop',
    styleUrls: ['shop.component.scss'],
    template: `
        <div>
            <form (ngSubmit)="onSubmit()" [formGroup]="form">
                <item-display [parent]="form" [products]="products" (added)="addItem($event)"></item-display>
                <item-selector [parent]="form" ></item-selector>
                <item-cart [parent]="form" [map]="map"></item-cart>
            </form>
        </div>
    `
})

export class ShopComponent implements OnInit{
    constructor(
        private fb: FormBuilder,
        private shopService: ShopService){}

    products: Product[];
    map: Map<number, Product>;

    ngOnInit(){
        const products = this.shopService.getProducts();
        const cart = this.shopService.getCartItems();
        
        Observable 
            .forkJoin(cart, products)
            .subscribe(([cart, products]: [Item[], Product[]])=>{

                const myMap = products.map<[number, Product]>(product =>[product.id, product]);
                
                this.map = new Map<number, Product>(myMap);
                this.products = products;
                
                cart.forEach(item => this.addItem(item));
            });
    }

    form = this.fb.group({
        cart: this.fb.array([]),
        selector: this.createItem({product_id: 1, quantity: 3})
    })

    createItem(item: any){
        return this.fb.group({
            product_id: parseInt(item.product_id) || '',
            quantity: item.quantity || 1
        });
    }

    addItem(item: any){
        console.log(item);
        const control = this.form.get('cart') as FormArray;
        control.push(this.createItem(item));
    }
}
