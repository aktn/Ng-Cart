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
        <div class="row">
            <form [formGroup]="form">
                <div class="col-12 col-m-12 ">
                    <item-display [parent]="form" [products]="products" (added)="addItem($event)"></item-display>
                </div>
                <div class="col-6 col-m-12">
                    <item-cart [parent]="form" [map]="map" (remove)="deleteItem($event)"></item-cart>
                    <div class="total">
                        Total: {{ total | currency: 'GBP': true }}
                    </div>
                </div>
                <div class="col-6 col-m-12">
                     <pre>{{ form.value | json }}</pre>
                </div>    
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

                this.calculateTotal(this.form.get('cart').value);
                this.form.get('cart').valueChanges.subscribe(
                    value=> this.calculateTotal(value)
                );
            });
    }

    form = this.fb.group({
        cart: this.fb.array([]),
        selector: this.createItem({})
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

    deleteItem({group, index}: { group: FormGroup, index: number}){
        const control = this.form.get('cart') as FormArray;
        control.removeAt(index);
    }

    total: number;
    calculateTotal(value: Item[]){
        const total = value.reduce((prev, next)=>{
            return prev + (next.quantity * this.map.get(next.product_id).price);
        },0);
        this.total = total;
    }

}
