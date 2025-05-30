import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { AddFormComponent } from "../add-form/add-form.component";


@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule, AddFormComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  isDialogOpen = false;
  sidenavBtnClicked = output()

  openDialogue() {
    this.isDialogOpen = !this.isDialogOpen;
  }

  emitSidenavClick() {
    this.sidenavBtnClicked.emit()
  }

}
