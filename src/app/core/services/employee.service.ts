import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../models/Employee";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
    private baseURL = 'http://localhost:8081/employees';

    constructor(private httpClient: HttpClient){

    }

    getAllEmployees(): Observable<Employee[]>{{
        return this.httpClient.get<Employee[]>(this.baseURL);
    }}
    
    getEmployeeById(employeeId: number): Observable<Employee>{
        return this.httpClient.get<Employee>(`${this.baseURL}/${employeeId}`);
    }
    createEmployee(employee: Employee): Observable<Employee>{
        return this.httpClient.post<Employee>(`${this.baseURL}/add-employee`, employee);
    }
    updateEmployee(employeeId: number, employee: Employee): Observable<Employee>{
        return this.httpClient.put<Employee>(`${this.baseURL}/update/${employeeId}`, employee);
    }
    deleteEmployee(employeeId: number): Observable<void>{
        return this.httpClient.delete<void>(`${this.baseURL}/delete/${employeeId}`);
    }
}