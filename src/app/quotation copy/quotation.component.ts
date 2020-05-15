import { Component, OnInit } from '@angular/core';
import { Quotation } from '../_models/quotation';
import { CommonServiceService } from '../commonservices.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {

  quotationParam=new Quotation();
  listQuotation:any[]=[];
  
  constructor(public commonservice: CommonServiceService) { }
  f: NgForm;
  ngOnInit(): void {

  }


  submitQuotation(data:any){
    console.log(data)
    this.commonservice.managePostFlowQuotation(this.quotationParam.productCode,this.quotationParam.quantidade).subscribe(
      dataList => {
       this.listQuotation=dataList;
      },
      err => console.log(err)
      
    );
  }

}
