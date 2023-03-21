import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'

@Component({
    selector: 'app-login-window',
    templateUrl: './login-window.component.html',
    styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent implements OnInit {
    constructor(public authService: AuthService) {}
    username!: string
    password!: string

    ngOnInit(): void {}

    login(): void {
        this.authService.login(this.username, this.password)
    }
}
