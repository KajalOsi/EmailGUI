import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailBackendService } from 'src/app/service/email-backend.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  data={
    to:"",
    subject:"",
    message:""
  }
  //to be used to hide progress spinner once clicked on btn then only need to show
  flag:boolean=false;

  //injected service to call sendEmail method which returns promice 
  constructor(private email:EmailBackendService,private snak:MatSnackBar){

  }

  doSubmitForm(){
    console.log("trying to submit form");
    console.log("Data: ",this.data);

    if(this.data.to=='' || this.data.subject=='' || this.data.message==''){
      this.snak.open("Fields cannot be Empty !!","OK");
      return;
    }
    //to show progressbar jst befor sending mail
    this.flag=true;
    this.email.sendEmail(this.data).subscribe({
      next: (response) => {
        console.log(response);
        this.flag=false;
        this.snak.open("Send Success !!","OK");
      },
      error: (error) => {
        console.log(error);
        this.flag=false;
        this.snak.open("Error !!","OK");
      }
    });
    
  }

}
