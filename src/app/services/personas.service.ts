import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personas } from '../models/personas';

@Injectable()
export class PersonasService {
  selectperson : Personas;
  personas : Personas[];

  readonly server: string = "http://localhost:3000";
  constructor(public http: HttpClient) { 
    this.selectperson = new Personas();
  }

  getPersonas(){
    return this.http.get(this.server); 
  }
  postPersonas(persona: Personas){
    return this.http.post(this.server,persona); 
  }
  putPersonas(persona: Personas){
    return this.http.put(this.server + `/${persona._id}`,persona); 
  }
  deletePersonas(_id: string){
    return this.http.delete(this.server + `/${_id}`); 
  }
}
