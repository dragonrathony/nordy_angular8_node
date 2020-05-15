import { Component, OnInit,Input,Output,EventEmitter   } from '@angular/core';
import { CommonServiceService } from '../commonservices.service';
import { ProductChar2 } from '../_models/ProductChar2';
import { ProductChar1 } from '../_models/ProductChar1';
import { NgForm } from '@angular/forms';
import { AlertService } from '../_services';
import { ProductBody } from '../_models/ProductBody';

declare var $: any;

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  @Input() submitStatus: boolean;
  @Output() messageToEmit = new EventEmitter<any>();
  //listChar2:ProductChar1[]=[];
  loading:string="Loading wait......"
  controlListString:string;
  paramChar1 = new ProductChar1()
  paramCharData = new ProductChar1()
  paramProductBody=new ProductBody();
  seconds = new Date().getTime() / 1000;

  constructor(public commonservice: CommonServiceService, private alertService: AlertService) {
    Window["myComponent"] = this;
   }
   test(){
     //alert('hi')
     var ddd=$("customFormAdd")
    //console.log("testing");
    this.submitAddProduct();
  }

  f: NgForm;
  ngOnInit(): void {
    this.getAllProductChar2();
    this.paramChar1.ProductCharFatherId=0;
  }

  getAllProductChar2(): void {
    this.commonservice.getProductChar2().subscribe(
      dataList => {
        // console.log(dataList)
            if(this.submitStatus)
            {
              let newData=$(dataList);
              newData.find('#ProductCode').closest('.row').find('label').remove();
              newData.find('#ProductCode').closest('.row').removeClass('form-group row');
              newData.find('#ProductCode').val(this.seconds);
              newData.find('#ProductCode').attr('type','hidden');
              newData.find('.card-box').append('<div class="form-group row"> <label class="col-sm-12 col-form-label">Quantity</label> <div class="col-sm-12"> <input type="number" class="form-control" min="0" value="0" name="createQuantity" id="createQuantity"> </div> </div>');
              dataList=newData[0].outerHTML;
            }
       this.controlListString=dataList;
       this.loading="";
       //console.log(     this.controlListString);
      },
      err => console.log(err)
    );
  }

  submitAddProduct(){ 
    if(!$('#customFormAdd')[0].checkValidity()) {
     // alert("ProductCode required");
     // $('#ProductCode').focus();
     // return false;
    }
    var product=$('#customFormAdd').serializeArray();
    $('#customFormAdd')[0].reset();
    console.log(product)
    //alert('Record Saved Successfully')
     this.commonservice.manageProductChar1(product).subscribe(
       dataList => {
         this.paramCharData = dataList;
         console.log(dataList)
         console.log(this.submitStatus)
         if(this.submitStatus){
          
          let newData={productCode:0,quantidade:0}
           $.each(dataList,function(index,obj){
             console.log(obj)
            //  console.log(index)
             if(obj.name == 'ProductCode')
             {
              newData['productCode']=obj.value;
              // console.log(obj.value)
             }
             if(obj.name == 'createQuantity')
             {
              newData['quantidade']=obj.value;
              //  console.log(quantidade)
             }
           })
           console.log(newData)
           this.messageToEmit.emit(newData)
         }
         alert("Product Added");
         //product.reset()
          // this.alertService.success("Add Product");
       },
       err => console.log(err)
     );
    
  }
  

}
