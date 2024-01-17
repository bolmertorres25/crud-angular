import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {Validators} from '@angular/forms';
import { HttpService } from '../../http.service';
import { ITask } from '../../interfaces/task';

import { validateHeaderValue } from 'http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

 fechaEnCadena: string = "2022-01-31T10:30:00";
 fechaConvertida: Date = new Date(this.fechaEnCadena);
 router = inject(Router);
 route =inject(ActivatedRoute);

  formaBuilder=inject(FormBuilder);
  httpService = inject(HttpService);
  taskFrom = this.formaBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dateCreation: ['', [Validators.required]],
  })
  taskId!:number;
  isEdit=false;
  ngOnInit(){
    this.taskId=this.route.snapshot.params['id'];
    if(this.taskId){
      this.isEdit=true;

      this.httpService.getTask(this.taskId).subscribe((result) => {
        console.log(result);
      })

    }

  }
  save() {
    console.log(this.taskFrom.value);
    const task: ITask = {
      title: this.taskFrom.value.title!,
      description: this.taskFrom.value.description!,
      dateCreation: this.fechaConvertida!,
    };
    if(this.isEdit){
      this.httpService.updateTask(this.taskId, task).subscribe(()=>{
        console.log('success');
        this.router.navigateByUrl("/task-lisk");
        
      })
    }else{
      this.httpService.createTask(task).subscribe(()=>{
        console.log('success');
        this.router.navigateByUrl("/task-lisk");
        
      })
    }
    
  }
}
