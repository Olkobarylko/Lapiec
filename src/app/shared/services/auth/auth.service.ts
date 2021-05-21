import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginStatus$ = new Subject<string>();

  constructor(private auth: AngularFireAuth,
    private db: AngularFirestore,
    private route: Router) { }

  singIn(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password).then(userCredential => {
      this.db.collection('users').ref.where('uid', '==', userCredential.user.uid).onSnapshot(
        snap => {
          snap.forEach(
            user => {
              const myUser = {
                id: user.id,
                ...user.data() as any
              };
              localStorage.setItem(myUser.role.toLowerCase(), JSON.stringify(myUser));
              if (myUser.role === 'USER') {
                this.route.navigateByUrl('profile');
                this.loginStatus$.next('user');
              }
              else if (myUser.role === 'ADMIN') {
                this.route.navigateByUrl('admin');
                this.loginStatus$.next('admin')
              }
            }
          )
        }
      )
    })
      .catch(err => console.log(err));
  }

  singUp(email: string, password: string): void {
    this.auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
      console.log(userCredential);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        role: 'USER',
        phone: '',
        firstName: '',
        date_birth: '',
        city: '',
        street: '',
        number_home: ''
      };
      this.db.collection('users').add(user).then(myUser => {
        console.log(myUser);
      }).catch(err => console.log(err));
    })
      .catch(error => console.log(error));
  }
  singOut(): void {
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
        this.loginStatus$.next('logout')
        this.route.navigateByUrl('login');
      });
  }

  updateProfile(id, data): void {
    this.db.collection('users').doc(id).update(data).then(
      () => { console.log('update profile success'); },
      err => { console.log(err); }
    )
  }

  checkCurrentUser(): void {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
      }
      else {
        console.log(user);
      }
    })
  }

}
