import { Component, inject } from '@angular/core';
import { ITask } from '../../interfaces/task';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  router=inject(Router);
  taskList : ITask[] = [];
  httpService = inject(HttpService);
  displayedColumns: string[] = [
    'id', 
    'title', 
    'description',
    'dateCreation',
    'action',
    
    ];
  ngOnInit() {
    this.getTaskFromServer()
  }

  getTaskFromServer(){
    this.httpService.getAllTask().subscribe((result) => {
      this.taskList=result;
      console.log(this.taskList);
      
    });
   
  }
  
  edit(id:number) {
    console.log(id);
    this.router.navigateByUrl("/task/"+id);
    
  }

  delete(id:number){
    this.httpService.deleteTask(id).subscribe(()=>{
      console.log("delete")
      this.taskList = this.taskList.filter(x=>x.id!=id);
      this.getTaskFromServer();
    })

  }

}