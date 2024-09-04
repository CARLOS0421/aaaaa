 import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:string=''
  contrasena:string=''

  constructor(private navCtrl:NavController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  validar(){
    if (this.contrasena=="1234") {
      localStorage.setItem("usuario",this.usuario)
      this.navCtrl.navigateForward(['/home'])
    } else {
      this.presentAlert()
    }
  }


  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Login',
      subHeader: 'Validacion usuario',
      message: 'usuario contraseña incorrecta',
      buttons: ['Action'],
    });

    await alert.present();
  }
}
