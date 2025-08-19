import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly api = 'http://localhost:3000/tasks';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  readonly tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.load();
  }

  load(): void {
    this.http.get<Task[]>(this.api).subscribe({
      next: (tasks) => this.tasksSubject.next(tasks),
      error: (err) => console.error('Erro ao carregar as tarefas', err)
    });
  }

  addTask(title: string): Observable<Task> {
    const payload = { title, isDone: false };
    console.log(payload);
    return this.http.post<Task>(this.api, payload).pipe(
      tap((task) => {
        const current = this.tasksSubject.getValue();
        this.tasksSubject.next([...current, task]);
      })
    );
  }

  toggleTask(task: Task): Observable<Task> {
    const updated = { isDone: !task.isDone } as Partial<Task>;
    return this.http.patch<Task>(`${this.api}/${task.id}`, updated).pipe(
      tap((resp) => {
        const current = this.tasksSubject.getValue().map((t) => (t.id === resp.id ? resp : t));
        this.tasksSubject.next(current);
      })
    );
  }

  updateTaskTitle(id: number, title: string): Observable<Task> {
    const updated = { title } as Partial<Task>;
    return this.http.patch<Task>(`${this.api}/${id}`, updated).pipe(
      tap((resp) => {
        const current = this.tasksSubject.getValue().map((t) => (t.id === resp.id ? resp : t));
        this.tasksSubject.next(current);
      })
    );
  }

  removeTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`).pipe(
      tap(() => {
        const current = this.tasksSubject.getValue().filter((t) => t.id !== id);
        this.tasksSubject.next(current);
      })
    );
  }
}
