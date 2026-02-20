import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerModel, ItemModel } from '../../../../model/type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item',
  imports: [RouterOutlet, CommonModule,FormsModule],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item {
  itemList: Array<ItemModel> = [];
    showForm = false;
  
    itemOject: ItemModel  = {
      code: '',
      description: '',
      packSize: '',
      unitPrice: 0,
      qtyOnHand: 0,
    
    };
  
    constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }
  
    ngOnInit() {
      this.getAll();
    }
  
    addItem(): void {
      this.http.post("http://localhost:8080/item/add-item", this.itemOject).subscribe(data => {
        console.log(data);
        if (data === true) {
          Swal.fire({
            title: "Good job!"+this.itemOject.description+"  saved Successfully!...",
            text: "You clicked the button!",
            icon: "success"
          });
        }
      })
      this.getAll();
    }
  
    getAll() {
      this.http.get<ItemModel[]>("http://localhost:8080/item/get-all").subscribe({
        next: (data) => {
          console.log(data);
          this.itemList = data;
          this.cdr.detectChanges();
        }
      });
    }
    deleteItem(code:any){
        this.itemList = this.itemList.filter(c => c.code !== code);
        Swal.fire({
          title : "Are you sure?",
          text : "You won't be able to revert this!",
          icon : "warning",
          showCancelButton:true,
          confirmButtonColor:"#3085d6",
          cancelButtonColor:"#d33",
          confirmButtonText:"Yes, delete it!"
        }).then((result) =>{
          if(result.isConfirmed){
            this.http.delete("http://localhost:8080/item/delete-by-id"+ code).subscribe(data =>{
              if(data===true){
                Swal.fire({
                  title:"Deleted!",
                  text:"Your file has been deleted!",
                  icon:"success"
                });
                this.getAll();
              }
            })
          }
        })
      }
}
