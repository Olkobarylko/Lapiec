import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileID: string;
  constructor(private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initProfileForm();
    this.loadProfile();
  }

  initProfileForm(): void {
    this.profileForm = this.fb.group({
      password: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      firstName: [null],
      date_birth: [null],
      city: [null],
      street: [null],
      number_home: [null],
    })
  }

  loadProfile(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.profileID = user.id;
      this.profileForm.patchValue({
        firstName: user.firstName,
        phone: user.phone,
        date_birth: user.date_birth,
        city: user.city,
        street: user.street,
        number_home: user.number_home,
      })
    }
  }

  submitProfile(): void {
    this.authService.updateProfile(this.profileID, this.profileForm.value);
  }

  profileSingOut(): void {
    this.authService.singOut();
  }

}
