import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AlertComponent } from './_components';
import { RegisterComponent } from './register';
import { LoginComponent } from './login';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddprocessrecordComponent } from './addprocessrecord/addprocessrecord.component';
import { EditprocessrecordComponent } from './editprocessrecord/editprocessrecord.component';
import { AddprocessComponent } from './addprocess/addprocess.component';
import { ListprocessrecordComponent } from './listprocessrecord/listprocessrecord.component';
import { InvoiceComponent } from './invoice/invoice.component'



import { ListprocessComponent } from './listprocess/listprocess.component';
import { EditprocessComponent } from './editprocess/editprocess.component';
import { AddfamilyComponent } from './addfamily/addfamily.component';
import { ListfamilyComponent } from './listfamily/listfamily.component';

import { MachineComponent } from './machine/machine.component';
import { MachineProcessLists } from './machine-processlist/processlist.component';
import { EditfamilyComponent } from './editfamily/editfamily.component';
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationComponent2 } from './quotation2/quotation.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonServiceService } from './commonservices.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SafeHtml } from './pipes/safe.pipe';
import { InnerComponentComponent } from './inner-component/inner-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MaterialModule} from './material-module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    HeaderComponent,
    SidebarComponent,
    AddprocessrecordComponent,
    EditprocessrecordComponent,
    AddproductComponent,
    AddprocessComponent,
    EditprocessComponent,
    AddfamilyComponent,
    ListfamilyComponent,
    InvoiceComponent,
    MachineComponent,
    MachineProcessLists,
    ListprocessrecordComponent,
    EditfamilyComponent,
    QuotationComponent,
    QuotationComponent2,
    SafeHtml,
    ListprocessComponent,
    InnerComponentComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [CommonServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
