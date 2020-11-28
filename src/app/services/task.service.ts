import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiurl="http://localhost:3000/tasks";

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Task[]>(this.apiurl);
  }
  delete(id){
    return this.http.delete(this.apiurl+'/'+id)
  }
  persist(task){
    return this.http.post<Task>(this.apiurl,task);
  }
  completed(id,completed){
    return this.http.patch(this.apiurl+'/'+id,{completed: !completed});
  } 
  update(task){
    return this.http.put(this.apiurl+'/'+task.id,task)

  }
}
