import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Patient } from '../patient/patient'

// TODO: Replace this with your own data model type
export interface PatientTableItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Patient[] = [
  {id: 1, firstName: 'Peter', lastName: 'One', contactNumber: '22334455', active: true, addresses: []},
  {id: 2, firstName: 'Peter', lastName: 'Two', contactNumber: '22334455', active: true, addresses: []},
  {id: 3, firstName: 'Peter', lastName: 'Three', contactNumber: '22334455', active: true, addresses: []},
  {id: 4, firstName: 'Peter', lastName: 'Four', contactNumber: '22334455', active: true, addresses: []},
  {id: 5, firstName: 'Peter', lastName: 'Five', contactNumber: '22334455', active: true, addresses: []},
  {id: 6, firstName: 'Peter', lastName: 'Six', contactNumber: '22334455', active: true, addresses: []},
  {id: 7, firstName: 'Peter', lastName: 'Seven', contactNumber: '22334455', active: true, addresses: []},
  {id: 8, firstName: 'Peter', lastName: 'Eight', contactNumber: '22334455', active: true, addresses: []},
  {id: 9, firstName: 'Peter', lastName: 'Nine', contactNumber: '22334455', active: true, addresses: []},
  {id: 10, firstName: 'Peter', lastName: 'Ten', contactNumber: '22334455', active: true, addresses: []},
  {id: 11, firstName: 'James', lastName: 'One', contactNumber: '22334455', active: true, addresses: []},
  {id: 12, firstName: 'James', lastName: 'Two', contactNumber: '22334455', active: true, addresses: []},
  {id: 13, firstName: 'James', lastName: 'Three', contactNumber: '22334455', active: true, addresses: []},
  {id: 14, firstName: 'James', lastName: 'Four', contactNumber: '22334455', active: true, addresses: []},
  {id: 15, firstName: 'James', lastName: 'Five', contactNumber: '22334455', active: true, addresses: []},
  {id: 16, firstName: 'James', lastName: 'Six', contactNumber: '22334455', active: true, addresses: []},
  {id: 17, firstName: 'James', lastName: 'Seven', contactNumber: '22334455', active: true, addresses: []},
  {id: 18, firstName: 'James', lastName: 'Eight', contactNumber: '22334455', active: true, addresses: []},
  {id: 19, firstName: 'James', lastName: 'Nine', contactNumber: '22334455', active: true, addresses: []},
  {id: 20, firstName: 'James', lastName: 'Ten', contactNumber: '22334455', active: true, addresses: []},
  {id: 21, firstName: 'Abraham', lastName: 'One', contactNumber: '22334455', active: true, addresses: []},
  {id: 22, firstName: 'Abraham', lastName: 'Two', contactNumber: '22334455', active: true, addresses: []},
  {id: 23, firstName: 'Abraham', lastName: 'Three', contactNumber: '22334455', active: true, addresses: []},
  {id: 24, firstName: 'Abraham', lastName: 'Four', contactNumber: '22334455', active: true, addresses: []},
  {id: 25, firstName: 'Abraham', lastName: 'Five', contactNumber: '22334455', active: true, addresses: []},
  {id: 26, firstName: 'Abraham', lastName: 'Six', contactNumber: '22334455', active: true, addresses: []},
  {id: 27, firstName: 'Abraham', lastName: 'Seven', contactNumber: '22334455', active: true, addresses: []},
  {id: 28, firstName: 'Abraham', lastName: 'Eight', contactNumber: '22334455', active: true, addresses: []},
  {id: 29, firstName: 'Abraham', lastName: 'Nine', contactNumber: '22334455', active: true, addresses: []},
  {id: 30, firstName: 'Abraham', lastName: 'Ten', contactNumber: '22334455', active: true, addresses: []}
];

/**
 * Data source for the PatientTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PatientTableDataSource extends DataSource<Patient> {
  data: Patient[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Patient[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Patient[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Patient[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
