import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  user!: User;
  dataLoaded = false;

  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
    setTimeout(() => {

    },
      2000);
  }


  checkToLogin() {
    if (this.authService.isAuth()) {
      return true;
    } else {
      return false;
    }
  }

  checkUserIsHere() {
    if (this.user.firstName.length > 0) {
      return true;
    } else { return false; }
  }

  logOut() {
    localStorage.clear();

    this.toastrService.success("Succesfully logget out");


  }

  getUser() {
    let email = localStorage.getItem("email");
    if (email == null) {
      return;
    }
    this.userService.getByMail(email).subscribe(
      (response) => {
        this.user = response.data;
        this.dataLoaded = true;
      }, (responseError) => {
        this.toastrService.error("error");
      }
    )
  }


}
