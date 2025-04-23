import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RssService } from '../../services/rss.service';
import { Rss } from '../../models/rss';

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
    console.log('Selected value:', value);
    if (this.selectedFeed) {
      if (value === 'reddit') {
        console.log('Display Reddit-specific form');
        const reddit = new FormGroup({
          subRedditName: new FormControl(""),
          subRedditUrl: new FormControl(""),
        })

        this.redditForm.push(reddit);

      } else if (value === 'rss') {
        console.log('Display RSS-specific form');
        const rss = new FormGroup({
          journalName: new FormControl(""),
          journalUrl: new FormControl(""),
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

    this.service.rssFeed.set(rawValue.rssForm)
    console.log(this.service.rssFeed())

    this.service.redditFeed.set(rawValue.redditForm)
    console.log(this.service.redditFeed())
  }
}
