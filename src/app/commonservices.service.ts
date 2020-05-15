import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, tap, retry } from "rxjs/operators";

const httpOptions = {
  dataType: "json",
  timeout: 100000,
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class CommonServiceService {
  userLoginDetails: any;
  baseUrl: string = `http://localhost:8080/`;
  constructor(private http: HttpClient, @Inject('BASE_URL') _baseUrl: string) {
    this.userLoginDetails = {};
    this.userLoginDetails.isUserLogin = false;
    //this.baseUrl = _baseUrl;
  }


  uploadFiles(fileData: FormData) {
    return this.http.post(this.baseUrl + 'api/UploadFile', fileData
      , {
        reportProgress: true,
        observe: 'events'
      }
    )
  }
  getLoginDetail() {
    if (localStorage.getItem("session") != null) {
      this.userLoginDetails = JSON.parse(localStorage.getItem("session"));
      return this.userLoginDetails;
    }
    else {
      this.userLoginDetails = {};
      this.userLoginDetails.isUserLogin = false;
      return this.userLoginDetails;
    }

  }
  setLoginDetail(user: any) {
    localStorage.setItem("session", JSON.stringify(user));
    this.userLoginDetails = user;
  }



  getProductChar2(): Observable<string> {
    let httpOptions1 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };
    return this.http.get<string>(
      this.baseUrl + "api/ProductChar2", httpOptions1);
  }

  manageProductChar1(data: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "api/productSave",
      { 'raw': data },
      httpOptions
    );
  }
  addProcessrecord(data: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "api/addProcessrecord",
      { 'raw': data },
      httpOptions
    );
  }

  updateProcessrecord(data: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "api/updateProcessrecord",
      { 'raw': data },
      httpOptions
    );
  }

  addPrcoess(data: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "api/processSave",
      { 'raw': data },
      httpOptions
    );
  }

  processUpdate(data: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "api/processUpdate",
      { 'raw': data },
      httpOptions
    );
  }


  updatePrcoessStatus(data: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "api/updatePrcoessStatus",
      { 'raw': data },
      httpOptions
    );
  }

  addFamily(data: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "api/familysave",
      { 'raw': data },
      httpOptions
    );
  }

  updateFamily(data: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "api/familyUpdate",
      { 'raw': data },
      httpOptions
    );
  }

  getFamily(): Observable<string> {
    let httpOptions1 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };
    return this.http.get<string>(
      this.baseUrl + "api/getFamily", httpOptions1);
  }

  getFamilyByid(name): Observable<string> {
    let httpOptions1 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };
    return this.http.get<string>(
      this.baseUrl + "api/getFamilyByid/" + name, httpOptions1);
  }

  getProcess(): Observable<string> {
    let httpOptions1 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };
    return this.http.get<string>(
      this.baseUrl + "api/getProcess", httpOptions1);
  }

  getProcessRecord(processid): Observable<string> {
    let httpOptions1 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };
    return this.http.get<string>(
      this.baseUrl + "api/getProcessRecord/" + processid, httpOptions1);
  }

  getProcessid(id): Observable<string> {
    let httpOptions1 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };
    return this.http.get<string>(
      this.baseUrl + "api/getProcessByid/" + id, httpOptions1);
  }

  getProcessRecordByid(id): Observable<string> {
    let httpOptions1 = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };
    return this.http.get<string>(
      this.baseUrl + "api/getProcessRecordByid/" + id, httpOptions1);
  }

  managePostFlowQuotation(productCode: string, quantidade: number): Observable<any[]> {
    return this.http.post<any[]>(
      this.baseUrl + "api/Flow?productCode=" + productCode + "&quantidade=" + quantidade,
      httpOptions
    );
  }
  searchQuotationByPCodeQty(productCode: string, quantidade: number, showall: string = 'false'): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "api/getQuotations/" + productCode + "/" + quantidade + "/" + showall,
      httpOptions
    );
  }

  searchQuotationByPCodeQtyPostions(productCode: string, quantidade: number, position: number): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "api/getQuotations/" + productCode + "/" + quantidade + "/" + position,
      httpOptions
    );
  }

  searchCustomerById(Customer: string): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + "api/getCustomer/" + Customer,
      httpOptions
    );
  }

}
