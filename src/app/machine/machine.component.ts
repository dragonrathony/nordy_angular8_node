import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
declare var $: any;

@Component({
  selector: 'machine',
  templateUrl: './machine.component.html',
  styleUrls: ['machine.component.css'],
  //styleUrls: ['./addproduct.component.scss']
})
export class MachineComponent implements OnInit {
  public data;

 constructor(private http: HttpClient){

 }
  ngOnInit(): void{
  //  let apiurl='http://122.163.176.14:8080/api/getProcessMeachne';
   this.http.get('http://localhost:8080/api/getProcessMeachne').subscribe((data)=>{
     console.log(data['result'])
     this.data=data['result'];
   })
  } 

}
