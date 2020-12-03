import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Auth } from 'src/entities/auth';
import { Login } from 'src/shared/auth.actions';
import { AuthState } from 'src/shared/auth.state';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  auth = new Auth();
  
  constructor(private store:Store, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(JSON.stringify(this.auth));
    this.store.dispatch(new Login(this.auth)).subscribe(() => {
      this.router.navigateByUrl(this.store.selectSnapshot(AuthState.urlAfterLogin));
    });
  }
}
