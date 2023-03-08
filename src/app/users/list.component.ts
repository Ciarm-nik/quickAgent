import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import { User } from '@app/_models';
import { HttpParams } from '@angular/common/http';

@Component({
  templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {
  users: User[] = [];
  searchForm: FormGroup;
  showList: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      username: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      active: [''],
    });
  }

  searchUsers() {
    const searchParams = {
      username: this.searchForm.get('username').value || undefined,
      firstName: this.searchForm.get('firstName').value || undefined,
      lastName: this.searchForm.get('lastName').value || undefined,
      email: this.searchForm.get('email').value || undefined,
      active: this.searchForm.get('active').value
    };
    let params = new HttpParams();
    if (searchParams.username) {
      params = params.append('username', searchParams.username);
    }
    if (searchParams.firstName) {
      params = params.append('firstName', searchParams.firstName);
    }
    if (searchParams.lastName) {
      params = params.append('lastName', searchParams.lastName);
    }
    if (searchParams.email) {
      params = params.append('email', searchParams.email);
    }
    if (searchParams.active) {
      params = params.append('active', searchParams.active);
    }

    this.accountService.searchUsers(params)
      .subscribe(users => {
        if (searchParams.active) {
          const isActive = searchParams.active === 'true';
          this.users = this.setUsersActivity(users).filter(user => user.active === isActive);
        } else {
          this.users = this.setUsersActivity(users);
        }

        if (searchParams.username) {
          this.users = this.users.filter(user => user.username && user.username.toLowerCase().includes(searchParams.username.toLowerCase()));
        }
        if (searchParams.firstName) {
          this.users = this.users.filter(user => user.firstName && user.firstName.toLowerCase().includes(searchParams.firstName.toLowerCase()));
        }
        if (searchParams.lastName) {
          this.users = this.users.filter(user => user.lastName && user.lastName.toLowerCase().includes(searchParams.lastName.toLowerCase()));
        }
        if (searchParams.email) {
          this.users = this.users.filter(user => user.email && user.email.toLowerCase().includes(searchParams.email.toLowerCase()));
        }

        this.showList = true;
      });
  }




  private setUsersActivity(users: User[]): User[] {
    const now = new Date();
    const threshold = new Date(now.getTime() - 60 * 1000); // consideriamo attivo un utente che ha effettuato l'accesso entro l'ultimo minuto
    return users.map(user => {
      const isActive = user.lastLogin >= threshold;
      return { ...user, active: isActive };
    });
  }
}
