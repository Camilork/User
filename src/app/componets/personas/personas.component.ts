import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import { Personas } from '../../models/personas';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
  providers: [PersonasService],
})
export class PersonasComponent implements OnInit {
  constructor(public personasService : PersonasService) { }
  notificacion = [];

  ngOnInit() {
   this.getpersona(); 
  }
  addpersona(form?: NgForm) {   
    if(!this.datatest(form.value.nombre,form.value.apellido,form.value.correo)){return 0}
    if(form.value._id) {
      this.personasService.putPersonas(form.value)
        .subscribe(res => {
          this.notificar("Actualizacion","Se actualizo con exito "+form.value.nombre+" "+form.value.apellido);
          this.getpersona();
          this.resetForm(form);
        });
    } else {
      this.personasService.postPersonas(form.value)
      .subscribe(res => {
        this.notificar("Creacion","Se creo con exito  "+form.value.nombre+" "+form.value.apellido);
        this.getpersona();
        this.resetForm(form);
      });
    }
  }
  editpersona(persona: Personas) {
    this.personasService.selectperson = persona;
    this.notificar("Edicion","Inicia modo edicion");
  }
  getpersona(){
    this.personasService.getPersonas()
    .subscribe( res => {
      this.personasService.personas = res as Personas[];
    })
  }
  deletepersona(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete it?')) {
      this.personasService.deletePersonas(_id)
        .subscribe(res => {
          this.notificar("Eliminacion","Se elimino con exito ");    
          this.getpersona();
          this.resetForm(form);
        });
    }
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.personasService.selectperson = new Personas();
    }
  }

  datatest(nombre: string,apellido: string,correo: string):boolean{
    if ((correo == "") || (correo == null) || (nombre == "") || (nombre == null) || (apellido == "") || (apellido == null)) { 
      alert("Los campos no pueden quedar vacios");
      return false;
    }
    return true;
  }
  notificar(titulo:string,mensaje:string){
    let date=new Date;
    let hora=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 
    this.notificacion.unshift({titulo : titulo,mensaje : mensaje,hora:hora});
  }
}
