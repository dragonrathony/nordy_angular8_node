import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { CommonServiceService } from '../commonservices.service';
import { Process } from '../_models/Process';
import { NgForm,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertService } from '../_services';
import { MDBBootstrapModule,  MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

declare var $: any;

@Component({
  selector: 'basic-table',
  templateUrl: './listprocess.component.html',
  //styleUrls: ['./addproduct.component.scss']
})
export class ListprocessComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  elements: any = [];
  previous: any = [];


  headElements = ['ID', 'Name', 'Status', 'Action'];
  //listChar2:ProductChar1[]=[];
  loading:string="Loading wait......"
  serverresponse:string='';
  survey: FormGroup;
  paramProductBody=new Process();
  constructor(private cdRef: ChangeDetectorRef,public commonservice: CommonServiceService, private alertService: AlertService, private formBuilder: FormBuilder) {

    Window["myComponent"] = this;


   }
   test(){
     //alert('hi')
     var ddd=$("customFormAdd")
    //console.log("testing");
    this.submitAddProduct();
  }

  getProcess(){
    this.commonservice.getProcess().subscribe(
      dataList => {
        dataList=JSON.parse(dataList);
       this.elements=dataList['result'];
       console.log(dataList);
       this.loading="";
       //console.log(     this.controlListString);
      },
      err => console.log(err)
    );
  }

  f: NgForm;
  ngOnInit(): void {
    this.getProcess();
    for (let i = 1; i <= 29; i++) {
      this.elements.push({id: i.toString(), name: 'Name ' + i, status: 'Status ' + i, action: 'Action ' + i});
    }

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
    console.log(this.mdbTable.getDataSource())
    //this.paramProductBody.Id=0;
  } 

  updateStatus(id,status){
    if(confirm("Are you sure to  "+status)) {      
      
      this.commonservice.updatePrcoessStatus({'status':status,'id':id}).subscribe(
        dataList => {
         
          //console.log(dataList.message);
          this.serverresponse=dataList.message;
          if(dataList.error==0){
            this.getProcess()
            //this.paramProductBody.MachineName=""
          }
          //product.reset()
           // this.alertService.success("Add Product");
  
         
        },
        err => console.log(err)
      );
    }

  }

  submitAddProduct(){ 
    console.log(this.paramProductBody);
    
    this.commonservice.addFamily(this.paramProductBody).subscribe(
      dataList => {
       
        //console.log(dataList.message);
        this.serverresponse=dataList.message;
        if(dataList.error==0){
          this.getProcess()
          //this.paramProductBody.MachineName=""
        }
        //product.reset()
         // this.alertService.success("Add Product");

       
      },
      err => console.log(err)
    );
   
    
    
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  

}
