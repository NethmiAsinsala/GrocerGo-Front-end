import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerModel } from '../../../../model/type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {
  customerList: Array<CustomerModel> = [];
  showForm = false;

  customerOject: CustomerModel = {
    id: '',
    title: '',
    name: '',
    dob: {},
    salary: 0,
    address: '',
    city: '',
    province: '',
    postalCode: ''
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getAll();
  }

  addCustomer(): void {
    this.http.post("http://localhost:8080/customer/add-customer", this.customerOject).subscribe(data => {
      console.log(data);
      if (data === true) {
        Swal.fire({
          title: "Good job!"+this.customerOject.name+"  saved Successfully!...",
          text: "You clicked the button!",
          icon: "success"
        });
      }
    })
    this.getAll();
  }

  getAll() {
    this.http.get<CustomerModel[]>("http://localhost:8080/customer/get-all").subscribe({
      next: (data) => {
        this.customerList = data;
        this.cdr.detectChanges();
      }
    });
  }
}
