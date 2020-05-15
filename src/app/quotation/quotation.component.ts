import { Component, OnInit } from '@angular/core';
import { Quotation } from '../_models/quotation';
import { CommonServiceService } from '../commonservices.service';
import { NgForm } from '@angular/forms';


declare var $: any;
@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})


export class QuotationComponent implements OnInit {
  submitStatusBol: boolean = true;
  quotationParam = new Quotation();

  // product variables
  listQuotation: any[] = []; // product list
  keysQuotation: any[] = []; // product keys
  quentity: any = 0; // product quantity
  code: any = 0; // product code
  minimumcost: any = 0

  // customer variables
  listCustomer: any[] = []; // customer list
  keysCustomer: any[] = []; // customer keys
  customer: any = 0; // customer id

  constructor(public commonservice: CommonServiceService) { }
  f: NgForm;
  ngOnInit(): void {
  }


  /**
   * Get product by code and quantity
   * @param data 
   */
  submitQuotation() {
    if (!this.quotationParam.productCode || !this.quotationParam.quantidade) {
      return;
    }
    console.log("here submit quotation call")
    this.commonservice.searchQuotationByPCodeQty(this.quotationParam.productCode, this.quotationParam.quantidade)
    .subscribe(dataList => {
        if (dataList['result']['result'].length) {
          this.keysQuotation = Object.keys(dataList['result']['result'][0]);
          this.listQuotation = dataList['result']['result'];

          this.quentity = dataList['result']['quentity'];
          this.code = dataList['result']['code'];

          this.minimumcost = dataList['result']['minimumcost'];

          $('#qProduct .nav-stacked').hide(0)
          $('a[href="#qProduct__submitedData"]').trigger('click');
        }
        else {
          alert('no record found!!')
        }
      },
      err => console.log(err)
    );
  }


  /**
   * 
   * @param dataList 
   */
  getInputlistQuotation(dataList: any) {
    if (dataList) {
      this.commonservice.searchQuotationByPCodeQty(dataList.productCode, dataList.quantidade).subscribe(
        dataList => {
          if (dataList['result'].length) {
            this.keysQuotation = Object.keys(dataList['result'][0]);
            this.listQuotation = dataList['result'];
            $('#qProduct .nav-stacked').hide(0)
            $('a[href="#qProduct__submitedData"]').trigger('click');
          }
          else {
            alert('no record found!!')
          }
        },
        err => console.log(err)
      );
    }
  }


  /**
   * Toggle function
   * @param $event 
   */
  toggleClass($event) {
    let node = $event.target.closest('tbody').children;
    var i;
    for (i = 0; i < node.length; i++) {
      node[i].classList.remove('active');
      if (i == node.length - 1)
        $event.target.closest('tr').classList.toggle('active');
    }
  }


  /**
   * Get customer by customer id
   * @param data 
   */
  submitCustomer(data: any) {
    this.commonservice.searchCustomerById(this.quotationParam.customer).subscribe(
      dataList => {
        if (dataList['result'].length) {
          this.keysCustomer = Object.keys(dataList['result'][0]);
          console.log(this.keysCustomer);
          this.listCustomer = dataList['result'];
          console.log(this.listCustomer);

          this.customer = this.quotationParam.customer;

          $('a[href="#qClient__submitedData"]').trigger('click');
        }
        else {
          alert('no record found!!')
        }
      },
      err => console.log(err)

    );
  }


  /**
   * Back to product tab
   */
  onClickBackTab() {
    $('#qProduct .nav-stacked').show(0);
    $('a[href="#qProduct__code"]').trigger('click');
  }

  
  /**
   * Back to client tab
   */
  backClientTab() {
    console.log('back to the client tab');
    $('a[href="#qClient"]').trigger('click');
  }
}
