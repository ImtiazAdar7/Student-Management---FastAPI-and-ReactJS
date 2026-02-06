import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../core/models/Employee';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: false,
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isUpdateMode = false;
  employeeId!: number;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ){}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required]
    });
    const idParam = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeId = idParam? Number(idParam): 0;

    if(this.employeeId && this.employeeId > 0){
      this.isUpdateMode = true;
      this.employeeService.getEmployeeById(this.employeeId).subscribe(emp=>{ 
        console.log('Selected Employee for update: ', emp);
        this.employeeForm.patchValue(
        {
          firstName: emp.firstName,
          lastName: emp.lastName,
          email: emp.email,
          gender: emp.gender,
          designation: emp.designation
        }
      );});
    }
  }

  onSubmit(): void{
    const employee: Employee = this.employeeForm.value;
    if(this.isUpdateMode){
      this.employeeService.updateEmployee(this.employeeId, employee).subscribe(()=> this.router.navigate(['/employees']));
    }
    else{
      this.employeeService.createEmployee(employee).subscribe(()=> this.router.navigate(['/employees']));
    }
  }
  goBack() {
  this.location.back();
}
}
