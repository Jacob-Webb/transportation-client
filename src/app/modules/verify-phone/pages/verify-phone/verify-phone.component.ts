import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { IConfig } from 'ngx-mask';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@Component({
  selector: 'app-confirm-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent implements OnInit {
  public verifyPhoneForm: FormGroup;
  codeLength: number = 6;

  constructor(private router: Router,
    fb: FormBuilder) { 
      this.verifyPhoneForm = fb.group ({
        'verifyCode':['', Validators.compose([Validators.maxLength(this.codeLength), Validators.required])]
      })
    }

  private user: User | undefined

  ngOnInit(): void {
    this.user = history.state.data;

    // if (this.user == null) 
    // this.router.navigate(['access']);
  }

  public verify() {
    console.log(this.verifyPhoneForm.value.verifyCode);
  }

}
