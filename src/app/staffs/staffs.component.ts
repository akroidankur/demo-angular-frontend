import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MaterialModule } from '../helper/material.module';
import { TitleChangerService } from '../services/title/title-changer.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { StaffsService } from '../services/staffs/staffs.service';
import { TableComponent } from '../helper/table/table.component';
import { Staff } from '../interfaces/staff/staff';

@Component({
  selector: 'app-staffs',
  standalone: true,
  imports: [CommonModule, MaterialModule, TableComponent],
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.scss'
})
export class StaffsComponent {
  titleChangerService: TitleChangerService = inject(TitleChangerService);
  private snackBarService: SnackbarService = inject(SnackbarService);
  private staffService = inject(StaffsService);

  staffs: Array<Staff> = [];
  columns: Array<(keyof Staff)> = [];

  creatingStaff: boolean = false;

  constructor() {
    // React to changes using an effect
    effect(() => {
      this.staffs = this.staffService.staffs();
      console.log('Updated Staffs:', this.staffs);
      this.columns = ['fullName', 'username', 'email', 'phone', 'status', 'role'];
      this.snackBarService.showSnackBar('Staffs Loaded');
    });
  }

  ngOnInit(): void {
    this.titleChangerService.title.set('Staffs');
  }

  getStaffFromTable(item: Staff): void {
    console.log('Selected Staff:', item);
  }

  createStaff(): void{
    this.creatingStaff = true;
  }

  goBack(): void{
    this.creatingStaff = false;
  }
}
