import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { CustomerModel } from './users-dashboard.model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {

  formValue !: FormGroup;
  CustomerModelObj : CustomerModel = new CustomerModel();
  CustomerData !:any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder:FormBuilder, private api : ApiService) { }


  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName:[''],
      lastName: [''],
      email: [''],
      mobile: [''],
      address: ['']
    })
    this.getAllCustomer();
  }
  clickAddCustomer(){
    this.formValue.reset();
  }
  postCustomerDetails(){
    this.CustomerModelObj.firstName = this.formValue.value.firstName;
    this.CustomerModelObj.lastName = this.formValue.value.lastName;
    this.CustomerModelObj.email = this.formValue.value.email;
    this.CustomerModelObj.mobile = this.formValue.value.mobile;
    this.CustomerModelObj.address = this.formValue.value.address;

    this.api.postCustomer(this.CustomerModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Customer Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllCustomer();
    },
    err=>{
      alert("Something Went Wrong");
    })

  }
  getAllCustomer(){
    this.api.getCustomer()
    .subscribe(res=>{
      this.CustomerData = res;

    })
  }
  deleteCustomer(row : any){
    this.api.deleteCustomer(row.id)
    .subscribe(res=>{
      alert("Customer Deleted");
      this.getAllCustomer();
    })
  }
  onEdit(row : any){
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['address'].setValue(row.address);
  }
  updateCustomerDetails(){
    this.CustomerModelObj.firstName = this.formValue.value.firstName;
    this.CustomerModelObj.lastName = this.formValue.value.lastName;
    this.CustomerModelObj.email = this.formValue.value.email;
    this.CustomerModelObj.mobile = this.formValue.value.mobile;
    this.CustomerModelObj.address = this.formValue.value.address;

    this.api.updateCustomer(this.CustomerModelObj,this.CustomerModelObj.id)
    .subscribe(res=>{
      alert("Update Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllCustomer();
    })
  }
}
