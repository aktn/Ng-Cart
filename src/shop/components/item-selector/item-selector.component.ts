import { FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'item-selector',
    styleUrls: ['item-selector.component.scss'],
    template: `
        <div [formGroup]="parent" class="item-display">
            <div class="item-display__name">
                
            </div>
        </div>
    `
})

export class ItemSelectorComponent{
    @Input() parent: FormGroup

}