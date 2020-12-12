import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Matiere } from '../models/matiere';
import { MatiereService } from '../services/matiere.service';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {
  closeResult = '';
  myForm:FormGroup;
  searchText='';
  editForm=false;
  myMatiere: Matiere={
    nom:'',
    coefficient:1,
    categorie:'',
   }
  m:Matiere={
    nom:'',
    coefficient:1,
    categorie:'',
  }
matieres:Matiere[]=[];
resultMatiere:Matiere[]=[];

  constructor(private matiereService: MatiereService,private modalService: NgbModal) { 

  }
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
    this.getMatiere();
    this.myForm=new FormGroup({
      id:new FormControl(''),
      nom:new FormControl('',Validators.required),
      coefficient:new FormControl('',[Validators.required]),
      categorie:new FormControl('',[Validators.required]),
    })
  }
  get id(){ return this.myForm.get('id');}
  get nom(){ return this.myForm.get('nom');}
  get coefficient(){ return this.myForm.get('coefficient');}
  get categorie(){ return this.myForm.get('categorie');}

  getMatiere(){
    this.matiereService.findAll()
    .subscribe(matieres => 
      this.resultMatiere=this.matieres=matieres)
  }
  deleteMatiere(id){
    this.matiereService.delete(id)
        .subscribe(() => {
           this.matieres=this.matieres.filter(matiere => matiere.id != id);
           this.getMatiere();
        })
  }
  persistMatiere(){
    this.m.nom=this.nom.value;
    this.m.coefficient=this.coefficient.value;
    this.m.categorie=this.categorie.value;
    this.matiereService.persist(this.m)
        .subscribe((matiere)=>{
          this.matieres=[matiere, ...this.matieres];
          this.resetMatiere();
          this.getMatiere();
          
        })
        
  }
  resetMatiere(){
    this.myForm=new FormGroup({
      nom:new FormControl('',Validators.required),
      coefficient:new FormControl('',[Validators.required]),
      categorie:new FormControl('',[Validators.required]),
    })
  }

 
  editMatiere(matiere){
    this.myForm.setValue({
      id:matiere.id,
      nom : matiere.nom,
    coefficient: matiere.coefficient,
    categorie: matiere.categorie,});
    this.editForm=true;
  }
  
  updateMatiere(){
    this.myMatiere.id=this.id.value;
    this.myMatiere.nom=this.nom.value;
    this.myMatiere.coefficient=this.coefficient.value;
    this.myMatiere.categorie=this.categorie.value;

  this.matiereService.update(this.myMatiere)
        .subscribe(task=>{
          this.resetMatiere();
          this.editForm=false;
          this.getMatiere();
        })
  }
  searchMatiere(){
  this.resultMatiere= this.matieres.filter((matiere)=> matiere.nom.toLowerCase().includes(this.searchText.toLocaleLowerCase()))
  }



}
