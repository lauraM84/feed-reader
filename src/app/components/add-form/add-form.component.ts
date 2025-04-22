import {Component, ViewEncapsulation} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-form',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss'
})
export class AddFormComponent {

selectedFeed = new FormControl("");
superform = new FormArray([]);

  // submitForm() {
  //   console.log(this.superForm)
  //   if (this.superForm.valid) {
  //     console.log(this.superForm.value);
  //   } else {
  //     for (const key in this.superForm.controls) {
  //       if (Object.prototype.hasOwnProperty.call(this.superForm.controls, key)) {
  //         const element = this.superForm.get(key);
  //         console.log(key, element?.errors)
  //       }
  //     }
  //   }
  // };

  createForm(arg: string|null) {
    if (arg === "REDDIT") {
      console.log("Reddittiamo");
    } else if(arg === "RSS"){
      console.log("rss");
    } else {
      console.log("stocazzo");
    }
    }
}
