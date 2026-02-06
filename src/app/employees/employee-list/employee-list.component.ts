import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Employee } from '../../core/models/Employee';
import { EmployeeService } from '../../core/services/employee.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  
  employees: Employee[] = [];
  loading = true;
  errorMsg = '';
  constructor(private employeeService: EmployeeService, private router: Router, private cd: ChangeDetectorRef){}
  ngOnInit(): void {
      this.loadEmployees();
  }

  loadEmployees(): void{
    this.employeeService.getAllEmployees().subscribe({
      next:(data)=>{
        console.log('Employee fetched form the backend: ', data);
        this.employees = data;
        this.loading = false;
        this.cd.detectChanges();
        console.log('Fetched!');
      },
      error: (err)=>{
        this.errorMsg = 'Sorry cannot fetch data from the database';
        console.error('There is something wrong: ', err);
        this.loading = false;
        this.cd.detectChanges();
      }
  })
  }

  onUpdate(employeeId: number): void{
    this.router.navigate(['/employees/update', employeeId]);
  }
  onDelete(employeeId: number): void{
    if(confirm('Are you sure?')){
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: ()=>{
          this.loading = false;
          this.employees = this.employees.filter(emp=>emp.employeeId != employeeId);
          this.cd.detectChanges();
          // this.loadEmployees();


        } ,
        error: (err)=> {
          console.error('Delation failed: ', err);
          this.loading = false;
          this.errorMsg = "Error bro";
          this.cd.detectChanges();
        }
          
      });
    }
  }
}
