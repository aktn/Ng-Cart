import { Component } from '@angular/core';

@Component({
    selector : 'shop',
    styleUrls: ['shop.component.scss'],
    template: `
        <div>
            Shop Container
            <item-display></item-display>
            <item-selector></item-selector>
            <item-cart></item-cart>
        </div>
    `
})

export class ShopComponent{
    constructor(){}
}
