import { Component, Input } from '@angular/core';

@Component({
    selector: 'choice-wrapper',
    templateUrl: 'choice-wrapper.component.html'
})
export class ChoiceWrapperComponent {
    @Input()
    public wrap: boolean;
}