import { Component, inject, output } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RssService } from '../../services/rss.service';
import { feed } from '../../models/feed';

@Component({
  selector: 'app-add-form',
  imports: [MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss'
})

export class AddFormComponent {

  service = inject(RssService);
  dialogSubmit = output();
  selectedFeed = new FormControl("");

  superForm = new FormGroup({
    rssForm: new FormArray([]),
    redditForm: new FormArray([]),
  })

  get rssForm() {
    return this.superForm.get('rssForm') as FormArray;
  }

  get redditForm() {
    return this.superForm.get('redditForm') as FormArray;
  }

  handleSelection(value: string | null) {
    if (this.selectedFeed) {
      if (value === 'reddit') {
        const reddit = new FormGroup({
          name: new FormControl("", [Validators.required, Validators.maxLength(20)]),
          url: new FormControl("", [Validators.required, Validators.pattern(/^https?:\/\/([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/)]),
        })

        this.redditForm.push(reddit);

      } else if (value === 'rss') {
        const rss = new FormGroup({
          name: new FormControl("", [Validators.required, Validators.maxLength(20)]),
          url: new FormControl("", [Validators.required, Validators.pattern(/^https?:\/\/([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/)]),
        })

        this.rssForm.push(rss);

      } else {
        console.log('No valid selection');
      }
    }
  }

  clear() {
    this.selectedFeed.setValue("")
  }

  removeFieldRss(index: number) {
    this.rssForm.removeAt(index);
  }

  removeFieldReddit(index: number) {
    this.redditForm.removeAt(index);
  }

  submitForm() {

    const rawValue = this.superForm.getRawValue();

    this.service.rssFeed.update((old) => old.concat(rawValue.rssForm));

    this.service.redditFeed.update((old) => old.concat(rawValue.redditForm));

    this.service.removeRssDuplicateUrls();
    this.service.removeRedditDuplicateUrls();

    this.service.getData();

    this.dialogSubmit.emit();
  }
}
