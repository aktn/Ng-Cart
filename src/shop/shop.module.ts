//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

//Components
import { ItemCartComponent } from './components/item-cart/item-cart.component';
import { ItemSelectorComponent } from './components/item-selector/item-selector.component';
import { ItemDisplayComponent } from './components/item-display/item-display.component';

//Containers
import { ShopComponent } from './containers/shop/shop.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule
    ],
    declarations: [
        ItemCartComponent,
        ItemDisplayComponent,
        ItemSelectorComponent,
        ShopComponent
    ],
    exports: [
        ShopComponent
    ]
})

export class ShopModule{

}