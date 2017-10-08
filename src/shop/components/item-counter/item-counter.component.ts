import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CounterAccessor = { 
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ItemCounterComponent),
    multi: true
};

@Component({
    selector: 'item-counter',
    styleUrls: ['item-counter.component.scss'],
    providers: [CounterAccessor], 
    template: `
        <div class="item-counter">
            <div>
                <div>
                    <p>{{ value }}</p>
                    <div>
                        <button type="button" [disabled]="value === max" (click)="increment()">+</button>
                        <button type="button" [disabled]="value === min" (click)="decrement()">-</button>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class ItemCounterComponent implements ControlValueAccessor{

    value: number = 0;

    private onModelChange: Function;
    registerOnChange(fn: any){
        this.onModelChange = fn;
    }

    private onTouch: Function;
    registerOnTouched(fn: any){
        this.onTouch = fn;
    }

    writeValue(value: any){
        this.value = value;
    }

    @Input() max: number=10;
    @Input() min: number=1;
    @Input() step: number=1;

    increment(){
        if(this.value < this.max){
            this.value = this.value + this.step;
            this.onModelChange(this.value);
        }
        this.onTouch();
    }

    decrement(){
        if(this.value > this.min){
            this.value = this.value - this.step;
            this.onModelChange(this.value);
        }
        this.onTouch();
    }
}