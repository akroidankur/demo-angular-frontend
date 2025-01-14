import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CamelToTitlePipe } from '../pipes/camel-to-title.pipe';
import { IsoDateToDatetimePipe } from '../pipes/iso-to-datetime.pipe';
import { MillisecToTimePipe } from '../pipes/millisec-to-time.pipe';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, CamelToTitlePipe, MillisecToTimePipe,
            IsoDateToDatetimePipe, MaterialModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})

export class TableComponent<T> implements OnInit, OnChanges {
  @Input({ required: true }) tableData: T[] = [];
  @Input({ required: true }) displayedColumns: Array<keyof T> = [];
  dataSource: MatTableDataSource<T> = new MatTableDataSource();
  filterValues: Record<keyof T, string> = {} as Record<keyof T, string>;
  filterValue: string = '';
  @Output() passToParent = new EventEmitter<T>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData'] && changes['tableData'].currentValue) {
      this.dataSource = new MatTableDataSource(changes['tableData'].currentValue);
      this.displayedColumns.forEach(column => {
        this.filterValues[column] = '';
      });
      this.initializeTable();
    }
  }

  initializeTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => this.getPropertyByPath(item, property);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    })
    this.dataSource.filterPredicate = this.createFilter();
  }

  getTableItem(item: T){
    this.passToParent.emit(item)
  }

  checkType(data: any): string{
    if(typeof data === 'object' &&  data){
      return data.name;
    }
    else{
      return data
    }
  }

  createFilter(): (data: T, filter: string) => boolean {
    const filterFunction = (data: T, filter: string): boolean => {
      const searchTerms = filter.trim().toLowerCase();

      if (!searchTerms) {
        return true;
      }

      return this.displayedColumns.some(column => {
        const columnValue = String(data[column]).toLowerCase();
        return columnValue.includes(searchTerms);
      });
    };

    return filterFunction;
  }

  applyFilter() {
    const filterValue = this.filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPropertyByPath(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => o && o[p], obj);
  }
}
