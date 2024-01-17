import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ITask } from './interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl="https://localhost:7206";
  http=inject(HttpClient);

  constructor() { }

  getAllTask(){
    return this.http.get<ITask[]>(this.apiUrl+"/api/Task/ListTask")
  }

  createTask(task:ITask){
    return this.http.post(this.apiUrl + '/api/Task/CreateTask', task);
  }

  getTask(taskId:number){
    return this.http.get<ITask[]>(this.apiUrl+"/api/Task/seeTask"+taskId);
  }

  updateTask(taskId: number, task: ITask) {
    return this.http.put<ITask>(
      this.apiUrl + '/api/Task/editTask' + taskId,
      task
    );
  }
  deleteTask(taskId: number) {
    return this.http.delete(this.apiUrl + '/api/Task/deleteTask' + taskId);
  }

}
