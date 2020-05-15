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
  listQuotation: any[] = [];
  keysQuotation: any[] = [];
  quentity: any = 0;
  code: any = 0;
  minimumcost: any = 0;

  listCustomer: any[] = [];
  keysCustomer: any[] = [];
  customer: any = 0;
  // inputlistQuotation:any[]=[];

  constructor(public commonservice: CommonServiceService) { }
  f: NgForm;
  ngOnInit(): void {
  }

  submitQuotation(data: any) {
    console.log(data)
    this.commonservice.searchQuotationByPCodeQty(this.quotationParam.productCode, this.quotationParam.quantidade).subscribe(
      dataList => {
        console.log(dataList)
        if (dataList['result']['result'].length) {
          this.keysQuotation = Object.keys(dataList['result']['result'][0]);
          console.log(this.keysQuotation);
          this.listQuotation = dataList['result']['result'];
          console.log(this.listQuotation);

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
  getInputlistQuotation(dataList: any) {
    console.log(dataList)
    if (dataList) {
      this.commonservice.searchQuotationByPCodeQty(dataList.productCode, dataList.quantidade).subscribe(
        dataList => {
          console.log(dataList['result'])
          if (dataList['result'].length) {
            this.keysQuotation = Object.keys(dataList['result'][0]);
            console.log(this.keysQuotation);
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
  toggleClass($event) {
    let node = $event.target.closest('tbody').children;
    var i;
    for (i = 0; i < node.length; i++) {
      node[i].classList.remove('active');
      if (i == node.length - 1)
        $event.target.closest('tr').classList.toggle('active');
    }

  }
  submitCustomer(data: any) {
    this.commonservice.searchCustomerById(this.quotationParam.customer).subscribe(
      dataList => {
        if (dataList['result'].length) {
          this.keysCustomer = Object.keys(dataList['result'][0]);
          // console.log(this.keysCustomer);
          this.listCustomer = dataList['result'];
          console.log(this.listCustomer);
          this.customer = dataList['result']['Customer'];

          $('a[href="#qClient__submitedData"]').trigger('click');
        }
        else {
          alert('no record found!!')
        }
      },
      err => console.log(err)

    );
  }
  onClickBackTab() {
    console.log('clicked')
    $('#qProduct .nav-stacked').show(0)
    $('a[href="#qProduct__form"]').trigger('click');
  }
  backClientTab() {
    console.log('clicked')
    // $("#qClient__submitedData").hide();
    // $('#qClient__code').show();
  }
}
