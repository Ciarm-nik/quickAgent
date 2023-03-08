import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';



@Component({ 
    selector: 'home-app',
    templateUrl: 'home.component.html',
    styleUrls:['home.component.css'], })

export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}
