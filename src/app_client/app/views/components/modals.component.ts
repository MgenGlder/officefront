import { Component, ViewChild } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'modals.component.html'
})
export class ModalsComponent {
    public myModal;
    public largeModal;
    public smallModal;
    public primaryModal;
    public successModal;
    public warningModal;
    public dangerModal;
    public infoModal;
}
