import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { Observable, map } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucidePlus, lucideTrash2, lucideCircle, lucideCheck, lucidePencil } from '@ng-icons/lucide';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [provideIcons({ lucidePlus, lucideTrash2, lucideCircle, lucideCheck, lucidePencil })]
})
export class TasksComponent {
  tasks$!: Observable<Task[]>;
  pending$!: Observable<Task[]>;
  done$!: Observable<Task[]>;
  newTitle = '';
  editingId: number | null = null;
  editingTitle = '';

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
    this.pending$ = this.tasks$.pipe(map(ts => ts.filter(t => !t.isDone)));
    this.done$ = this.tasks$.pipe(map(ts => ts.filter(t => t.isDone)));
  }

  add() {
    const title = this.newTitle && this.newTitle.trim();
    if (!title) return;
    this.taskService.addTask(title).subscribe({
      next: () => (this.newTitle = ''),
      error: (err) => console.error('Erro ao adicionar a tarefa', err)
    });
  }

  toggle(t: Task) {
    this.taskService.toggleTask(t).subscribe({
      error: (err) => console.error('Erro ao mudar status', err)
    });
  }

  remove(t: Task) {
    if (!confirm(`Remover tarefa: "${t.title}"?`)) return;
    this.taskService.removeTask(t.id).subscribe({
      error: (err) => console.error('Erro ao remover a tarefa', err)
    });
  }

  trackById(_: number, t: Task) {
    return t.id;
  }

  startEdit(t: Task) {
    this.editingId = t.id;
    this.editingTitle = t.title;
  }

  cancelEdit() {
    this.editingId = null;
    this.editingTitle = '';
  }

  saveEdit(t: Task) {
    const title = this.editingTitle && this.editingTitle.trim();
    if (!title || title === t.title) {
      this.cancelEdit();
      return;
    }
    this.taskService.updateTaskTitle(t.id, title).subscribe({
      next: () => this.cancelEdit(),
      error: (err) => console.error('Erro ao atualizar o título', err)
    });
  }
}
