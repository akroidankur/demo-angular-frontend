import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MaterialModule } from '../helper/material.module';
import { TitleChangerService } from '../services/title/title-changer.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { StaffsService } from '../services/staffs/staffs.service';
import { TableComponent } from '../helper/table/table.component';
import { Staff } from '../interfaces/staff/staff';
import { Router } from '@angular/router';

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
  private router: Router = inject(Router);

  staffs: Array<Staff> = [];
  columns: Array<(keyof Staff)> = [];

  creatingStaff: boolean = false;

  staffForm!: Staff;

  roles = [
    { _id: '6785f162565f0a0f05b53d54', name: 'Admin' },
    { _id: '6785f162565f0a0f05b53d54', name: 'Manager' },
    { _id: '6785f162565f0a0f05b53d54', name: 'User' },
  ];

  constructor() {
    this.initializeStaffFormData()
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

  initializeStaffFormData() {
    this.staffForm = {
      fullName: '',
      username: '',
      email: '',
      password: '',
      phone: '',
      status: 'active',
      role: { _id: '', name: '' },
    };
  }


  onSubmit() {
    console.log('Form Submitted:', this.staffForm);

    this.staffService.createStaff(this.staffForm).subscribe({
      next: (response) => {
        console.log('Staff created successfully:', response);
        this.router.navigate(['/staffs']);
        this.snackBarService.showSnackBar('Staffs created successfully');
        this.creatingStaff = false;
        this.initializeStaffFormData()
      },
      error: (error) => {
        console.error('Error creating staff:', error);
        this.snackBarService.showSnackBar(`Error: ${error.message}`);
        this.creatingStaff = false;
        this.initializeStaffFormData();
      },
    });
  }
}
