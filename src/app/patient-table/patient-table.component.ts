import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PatientTableDataSource } from './patient-table-datasource';
import { PatientService } from '../patient.service'
import { Patient } from '../patient/patient'

@Component({
  selector: 'patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.css']
})
export class PatientTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PatientTableDataSource;

  constructor(private service : PatientService) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'lastName', 'contactNumber', 'status', 'action'];
  data: Patient[] = [];
  dataIsReady: boolean = false;
  dataLength: number = 0;
  SEARCH_TEXT: string = "search-text";
  SEARCH_COUNTRY: string = "country";
  isSearchFreeText: boolean = true;

  ngOnInit() {
    this.initTable();
  }

  initTable() {
    this.service.getPatients().subscribe((response) => {
      this.dataSource = new PatientTableDataSource(this.paginator, this.sort, response);
      this.dataIsReady = true;
      this.dataLength = (response) ? response.length : 0;
    });
  }

  searchPatients(query: string) {
    this.service.searchPatients(query).subscribe((response) => {
      this.dataSource = new PatientTableDataSource(this.paginator, this.sort, response);
      this.dataIsReady = true;
      this.dataLength = (response) ? response.length : 0;
    });
  }

  search() {
    var query = '';
    if(this.isSearchFreeText) {
      query = (<HTMLInputElement>document.getElementById("search-query")).value;
    } else {
      query = (<HTMLInputElement>document.getElementById("search-country")).value;
    }
    this.searchPatients(query);
  }

  changeSearchType() {
    this.isSearchFreeText = (<HTMLInputElement>document.getElementById("search-type-text")).checked;
  }

  delete(id: number) {
    this.service.deletePatient(id).subscribe(() => {
      alert(`Patient with id ${id} is deleted.`);
      this.refreshTable()
    });
  }

  refreshTable() {
    this.initTable();
  }
}
