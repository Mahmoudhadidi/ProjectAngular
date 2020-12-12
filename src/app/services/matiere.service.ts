import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matiere } from '../models/matiere';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  apiurl="http://localhost:3000/matiere";
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Matiere[]>(this.apiurl);
    }
  delete(id){
    return this.http.delete(this.apiurl+'/'+id)
  }
  persist(matiere){
    return this.http.post<Matiere>(this.apiurl,matiere);
  }
  
  update(matiere){
    return this.http.put(this.apiurl+'/'+matiere.id,matiere)
  }
}

