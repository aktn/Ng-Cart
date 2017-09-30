import { ShopService } from './services/shop.service';
//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Components
import { ItemCartComponent } from './components/item-cart/item-cart.component';
import { ItemSelectorComponent } from './components/item-selector/item-selector.component';
import { ItemDisplayComponent } from './components/item-display/item-display.component';

//Containers
import { ShopComponent } from './containers/shop/shop.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpModule
    ],
    declarations: [
        ItemCartComponent,
        ItemDisplayComponent,
        ItemSelectorComponent,
        ShopComponent
    ],
    exports: [
        ShopComponent
    ],
    providers: [
        ShopService
    ]
})

export class ShopModule{

}