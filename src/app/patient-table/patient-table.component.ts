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
  displayedColumns = ['id', 'firstName', 'lastName', 'contactNumber', 'status'];
  data: Patient[] = [];
  dataIsReady: boolean = false;
  dataLength: number = 0;

  ngOnInit() {
    this.service.getPatients().subscribe((response) => {
      this.dataSource = new PatientTableDataSource(this.paginator, this.sort, response);
      this.dataIsReady = true;
      this.dataLength = (response) ? response.length : 0;
    });
  }
}
