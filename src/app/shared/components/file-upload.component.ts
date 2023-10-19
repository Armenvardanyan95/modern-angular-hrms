import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-file-upload',
    template: `
        <div class="file-upload">
            <label for="upload">{{ label }}</label>
            <input type="file" id="upload" (change)="onFileSelected($event)" />
            <span class="error" *ngIf="errorMessage">
                {{ errorMessage }} 
                Only following file types are permitted: 
                <ul>
                    <li *ngFor="let type of accept">{{ type }}</li>
                </ul>
            </span>
        </div>
    `,
    standalone: true,
    imports: [NgIf, NgFor],
})
export class FileUploadComponent {
    @Input({required: true}) label!: string;
    @Input({transform: (value: string) => value.split(',')})
    accept: string[] = [];
    @Output() selected = new EventEmitter<FileList>();
    errorMessage = '';

    onFileSelected(event: any) {
        const files: FileList = event.target.files;
        this.errorMessage = Array.from(files)
            .every(f => this.accept.includes(f.type)) 
            ? '' : 'Invalid file type';

        if (this.errorMessage === '') {
            this.selected.emit(files);
        }
    }
}