import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../commonservices.service';
import { Process } from '../_models/Process';
import { NgForm, FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '../_services';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'basic-table',
  templateUrl: './editprocessrecord.component.html',
  //styleUrls: ['./addproduct.component.scss']
})
export class EditprocessrecordComponent implements OnInit {
  elements: any = [];
  survey: FormGroup;
 
  //listChar2:ProductChar1[]=[];
  loading:string="Loading wait......"
  serverresponse:string='';
  serverError:number=0;
  Processrecord=[];
  questions:any=[];
  EXTRAFIELDS:any=[]
  oldId:any;
  constructor(public commonservice: CommonServiceService, private alertService: AlertService, private formBuilder: FormBuilder,private route: ActivatedRoute) {
    Window["myComponent"] = this;
   }
   
  
  f: NgForm;
  ngOnInit(): void {
    this.survey = this.formBuilder.group({   
      oldId:'',   
      BusinessUnity:'',
      Name:'',
      MachineCode:'',
      ProcessId:'',
      Quality:'',
      Eficiency:'',
      Availability:'',
      SetupTime:'',
      SetupTimeUnity:'',
      Cost:'',
      CostTimeUnity:'',
      SetupLoss:'',
      GroupSpeedTimeUnity:'',
      SetupLossUnity:'',
      Speed:'',
      SpeedUnity:'',
      SpeedTimeUnity:'',
      MinBatch:'',
      MinBatchUnity:'',
      MaxBatch:'',
      MaxBatchUnity:'',
      GroupSpeed:'',
      GroupSpeedUnity:'',
      GroupName:'',
      OnOff:'',
      EXTRAFIELDS:new FormArray([])

    });
    //this.paramProductBody.Id=0;

    this.getProcess();

    
  }
  

  getProcessRecordByid(){
    this.commonservice.getProcessRecordByid(this.oldId).subscribe(
      dataList => {
        dataList=JSON.parse(dataList);
        if(dataList['result']['EXTRAFIELDS']!='')
        this.EXTRAFIELDS=JSON.parse(dataList['result']['EXTRAFIELDS']);
        console.log(this.EXTRAFIELDS);
        this.survey.controls['oldId'].setValue(dataList['result']['Id']);
        this.survey.controls['Availability'].setValue(dataList['result']['Availability']);
        this.survey.controls['BusinessUnity'].setValue(dataList['result']['BusinessUnity']);
        this.survey.controls['Cost'].setValue(dataList['result']['Cost']);
        this.survey.controls['CostTimeUnity'].setValue(dataList['result']['CostTimeUnity']);
        this.survey.controls['Eficiency'].setValue(dataList['result']['Eficiency']);
        this.survey.controls['GroupName'].setValue(dataList['result']['GroupName']);
        this.survey.controls['GroupSpeed'].setValue(dataList['result']['GroupSpeed']);
        this.survey.controls['GroupSpeedTimeUnity'].setValue(dataList['result']['GroupSpeedTimeUnity']);
        this.survey.controls['GroupSpeedUnity'].setValue(dataList['result']['GroupSpeedUnity']);
        this.survey.controls['MachineCode'].setValue(dataList['result']['MachineCode']);
        this.survey.controls['MaxBatch'].setValue(dataList['result']['MaxBatch']);
        this.survey.controls['MaxBatchUnity'].setValue(dataList['result']['MaxBatchUnity']);

        this.survey.controls['MinBatch'].setValue(dataList['result']['MinBatch']);
        this.survey.controls['MinBatchUnity'].setValue(dataList['result']['MinBatchUnity']);
        this.survey.controls['Name'].setValue(dataList['result']['Name']);
        this.survey.controls['OnOff'].setValue(dataList['result']['OnOff']);
        this.survey.controls['ProcessId'].setValue(dataList['result']['ProcessId']);
        this.survey.controls['Quality'].setValue(dataList['result']['Quality']);
        this.survey.controls['SetupLoss'].setValue(dataList['result']['SetupLoss']);

        this.survey.controls['SetupLossUnity'].setValue(dataList['result']['SetupLossUnity']);
        this.survey.controls['SetupTime'].setValue(dataList['result']['SetupTime']);
        this.survey.controls['SetupTimeUnity'].setValue(dataList['result']['SetupTimeUnity']);
        this.survey.controls['Speed'].setValue(dataList['result']['Speed']);
        this.survey.controls['SpeedTimeUnity'].setValue(dataList['result']['SpeedTimeUnity']);
        this.survey.controls['SpeedUnity'].setValue(dataList['result']['SpeedUnity']);

        this.genreateForm(dataList['result']['ProcessId']);
      },
      err => console.log(err)
    );
  }
  getProcess(){
    this.commonservice.getProcess().subscribe(
      dataList => {
        dataList=JSON.parse(dataList);
       console.log(dataList);       
       this.Processrecord=dataList['result'];
       this.route.paramMap.subscribe(params => {
        //console.log(params['params']["id"]);
        this.oldId=params['params']["id"];      
        this.getProcessRecordByid();
      });
      },
      err => console.log(err)
    );
  }

  getSelectedID(selectedId){
    for(var i=0;i<this.Processrecord.length;i++){
      if(selectedId==this.Processrecord[i]['Id']){
        return i;
      }
    }

  }

  escapeUnicode(str) {
    return str.replace(/[^\0-~]/g, function(ch) {
        return "\\u" + ("0000" + ch.charCodeAt().toString(16)).slice(-4);
    });
}

initQuestion(level) {
  return this.formBuilder.group({
    ExtraTextBox:new FormControl (""),    
  });
}

  get studentsArray(): FormArray {
    return this.survey.get('EXTRAFIELDS') as FormArray;
  }
  genreateForm(selectedId){
    selectedId=this.getSelectedID(selectedId);    
    let selectedrecord=this.Processrecord[selectedId];
    var EXTRAFIELDS=selectedrecord['EXTRAFIELDS'];
    EXTRAFIELDS=this.escapeUnicode(EXTRAFIELDS);
    EXTRAFIELDS=JSON.parse(EXTRAFIELDS);
    if(EXTRAFIELDS!=null && EXTRAFIELDS!=null){
      this.questions=EXTRAFIELDS['sections'][0]['questions'];
      var arr = <FormArray>this.survey['controls'].EXTRAFIELDS;
      arr.controls = [];
      console.log(this.questions);
      var listquestions=[];
      for(var i=0;i<this.questions.length;i++){
        if(this.questions[i]['questionTitle']!=''){          
          //arr.push(this.formBuilder.group(this.questions[i]['questionTitle']))
          let title=this.questions[i]['questionTitle'];
          var obj = {};
          if(this.questions[i]['questionType']=='Check Boxes' || this.questions[i]['questionType']=='radio')
                   
          {
            var tempArray=[];
            var extrfieldaray=this.EXTRAFIELDS[i][title];
            for(var kj=0;kj<extrfieldaray.length;kj++){
              //tempArray.push(new FormControl(this.EXTRAFIELDS[i][title][kj]));
              //console.log(this.EXTRAFIELDS[i][title][kj]);
              tempArray.push(new FormControl(this.EXTRAFIELDS[i][title][kj]));

            }
            //tempArray.push(new FormControl("A"));
            //.push(new FormControl("B"));
            obj[title] = new FormArray(tempArray);
          arr.push(this.formBuilder.group(obj));  
          }else{
          obj[title] =this.EXTRAFIELDS[i][title];
          arr.push(this.formBuilder.group(obj));
          }
        }
      }
      //this.studentsArray.push(this.formBuilder.group({'ExtraTextBox':''}));
      console.log(listquestions)
      
      console.log(this.survey.value);
    }
    
  }

  public trackItem (index: number, item) {
    return item.trackId;
  }

  getchecked(currentvalue,extrafiled){
    //console.log(extrafiled.indexOf(currentvalue),currentvalue,extrafiled);
    if (extrafiled.indexOf(currentvalue) < 0) {
      return false;
    }else{
      return true;
    }
    
  }

  onCheckChange(event,filedname,i) {
    //console.log(i);
    const formArray: FormArray = this.survey.get('EXTRAFIELDS')['controls'][i].get(filedname) as FormArray;    
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }

  onSubmit(form){
    //var json = JSON.stringify(form.value);
    this.commonservice.updateProcessrecord(form.value).subscribe(
      dataList => {
       
        //console.log(dataList.message);
        this.serverresponse=dataList.message;
        this.serverError=dataList.error;
        if(dataList.error==0){
          //this.getProcess()
          //this.paramProductBody.MachineName=""
        }
        //product.reset()
         // this.alertService.success("Add Product");

       
      },
      err => console.log(err)
    );
    console.log(form.value);
  }
  

}
