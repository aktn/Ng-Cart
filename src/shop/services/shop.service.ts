import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Product, Item } from './../models/product.interface';

@Injectable()
export class ShopService{
    constructor(private http: Http){}

    getProducts(): Observable<Product[]>{
        return this.http
            .get('/api/products')
            .map((response: Response) => response.json())
            .catch((error: any)=> Observable.throw(error.json()));
    }   

    getCartItems(): Observable<Item[]>{
        return this.http
            .get('/api/cart')
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }
}