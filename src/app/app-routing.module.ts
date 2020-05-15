import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddprocessrecordComponent } from './addprocessrecord/addprocessrecord.component';
import { EditprocessrecordComponent } from './editprocessrecord/editprocessrecord.component';
import { AddprocessComponent } from './addprocess/addprocess.component';
import { ListprocessComponent } from './listprocess/listprocess.component';
import { EditprocessComponent } from './editprocess/editprocess.component';
import { MachineProcessLists } from './machine-processlist/processlist.component';
import { AddfamilyComponent } from './addfamily/addfamily.component';
import { ListfamilyComponent } from './listfamily/listfamily.component';
import { InvoiceComponent } from './invoice/invoice.component';

import { MachineComponent } from './machine/machine.component';
import { EditfamilyComponent } from './editfamily/editfamily.component';
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationComponent2 } from './quotation2/quotation.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CounterComponent } from './counter/counter.component';
import { ListprocessrecordComponent } from './listprocessrecord/listprocessrecord.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  //{ path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'addProduct', component: AddproductComponent, canActivate: [AuthGuard] },
  { path: 'addProcess', component: AddprocessComponent, canActivate: [AuthGuard] },
  { path: 'listProcess', component: ListprocessComponent, canActivate: [AuthGuard] },
  { path: 'editProcess/:id', component: EditprocessComponent, canActivate: [AuthGuard] },
  { path: 'quotation', component: QuotationComponent, canActivate: [AuthGuard] },
  { path: 'quotation2', component: QuotationComponent2, canActivate: [AuthGuard] },
  { path: 'addFamily', component: AddfamilyComponent, canActivate: [AuthGuard] },
  { path: 'machineProcessList', component: MachineProcessLists, canActivate: [AuthGuard] },
  { path: 'machineProcessList/:id/:processname', component: MachineProcessLists, canActivate: [AuthGuard] },
  { path: 'listFamily', component: ListfamilyComponent, canActivate: [AuthGuard] },
  { path: 'invoice/:code/:quentity/:position', component: InvoiceComponent, canActivate: [AuthGuard] },
  { path: 'machine', component: MachineComponent, canActivate: [AuthGuard] },
  { path: 'editFamily/:id', component: EditfamilyComponent, canActivate: [AuthGuard] },
  { path: 'addProcessRecord', component: AddprocessrecordComponent, canActivate: [AuthGuard] },
  { path: 'listProcessRecord', component: ListprocessrecordComponent, canActivate: [AuthGuard] },
  { path: 'listProcessRecord/:id', component: ListprocessrecordComponent, canActivate: [AuthGuard] },
  { path: 'editProcessRecord/:id', component: EditprocessrecordComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
