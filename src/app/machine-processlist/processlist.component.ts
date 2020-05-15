import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective } from 'angular-bootstrap-md';
import { CommonServiceService } from '../commonservices.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'machine-processlist',
  templateUrl: './processlist.component.html',
  styleUrls: ['./processlist.component.css'],
})
export class MachineProcessLists implements OnInit {
	serverresponse:string='';
	constructor(public commonservice: CommonServiceService,private route: ActivatedRoute){

	}
  @ViewChild(MdbTableDirective, { static: true }) 
	mdbTable: MdbTableDirective; 
	elements: any = []; 
  headElements = ['Code', 'Description', 'Status', 'Edit'];
	searchText: string = ''; 
	previous: string;
	processid: string;
	processname:string;
  
	ngOnInit() { 
		this.route.paramMap.subscribe(params => {
			//console.log(params['params']["id"]);
			this.processid=params['params']["id"];  
			this.processname=params['params']["processname"];    
			this.getProcessRecord();
		  });
		//this.getProcessRecord();
	} 
	getProcessRecord(){
		this.commonservice.getProcessRecord(this.processid).subscribe(
		dataList => {
			dataList=JSON.parse(dataList);
			this.elements=dataList['result'];
			console.log(this.elements);
			this.mdbTable.setDataSource(this.elements);
			this.previous = this.mdbTable.getDataSource(); 
		},
		err => console.log(err)
		);
	}
	updateStatus(id,status){
		if(confirm("Are you sure to  "+status)) {      
		  
		  this.commonservice.updatePrcoessStatus({'status':status,'id':id}).subscribe(
			dataList => {
			 
			  //console.log(dataList.message);
			  this.serverresponse=dataList.message;
			  if(dataList.error==0){
				this.getProcessRecord()
				//this.paramProductBody.MachineName=""
			  }
			  //product.reset()
			   // this.alertService.success("Add Product");
	  
			 
			},
			err => console.log(err)
		  );
		}
	
	  }
	
}
