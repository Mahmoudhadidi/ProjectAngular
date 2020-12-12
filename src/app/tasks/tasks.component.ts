import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Matiere } from '../models/matiere';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  searchText='';
  editForm=false;
  showForm= false;
  closeResult = '';
  myTask: Task={
   label:'',
   completed: false,
   idMatiere:1,
  }
tasks:Task[]=[];
resultTasks:Task[]=[];
matieres:Matiere[]=[];
resultMatiere:Matiere[]=[];
  constructor(private taskService: TaskService,private modalService: NgbModal) { }
  
open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
 }

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    this.getTasks();
    this.getMatiere();
  }

  getTasks(){
    this.taskService.findAll()
        .subscribe(tasks => 
          this.resultTasks=this.tasks=tasks)
  }
  getMatiere(){
    this.taskService.findAllMatiere()
    .subscribe(matieres => 
      this.resultMatiere=this.matieres=matieres)
  }
  deleteTask(id){
    this.taskService.delete(id)
        .subscribe(() => {
           this.tasks=this.tasks.filter(task => task.id != id);
           this.getTasks();
        })
  }
  persistTask(){
    this.taskService.persist(this.myTask)
        .subscribe((task)=>{
          this.tasks=[task, ...this.tasks];
          this.resetTask();
          this.getTasks();
        })
  }
  resetTask(){
    this.myTask={
      label:'',
      completed:false,
      idMatiere:null
    }
  }

  toggleCompleted(task){
  this.taskService.completed(task.id,task.completed)
        .subscribe(() => {
         task.completed=!task.completed 
        })
  }
  editTask(task){
    this.myTask=task
    this.editForm=true;
  }
  
  updateTask(){
  this.taskService.update(this.myTask)
        .subscribe(task=>{
          this.resetTask();
          this.editForm=false;
          this.getTasks();
        })
  }
  searchTasks(){
  this.resultTasks= this.tasks.filter((task)=> task.label.toLowerCase().includes(this.searchText.toLocaleLowerCase()))
  }
}
