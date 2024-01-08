import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmRoutingModule } from './crm-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AccountComponent } from './account/account.component';
import { ActivityComponent } from './activity/activity.component';
import { LeadComponent } from './lead/lead.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { CurrencyComponent } from './currency/currency.component';
import { QuickaccountComponent } from './quickaccount/quickaccount.component';
import { QuickconatactComponent } from './quickconatact/quickconatact.component';
import { TechnologyComponent } from './technology/technology.component';
import { RawDataComponent } from './raw-data/raw-data.component';
import { ConformComponent } from './conform/conform.component';
import { ContactComponent } from './contact/contact.component';
import { MatCardModule } from '@angular/material/card';
import { ActivityMasterComponent } from './activity-master/activity-master.component';
import { AddActivityDialogComponent } from './add-activity-dialog/add-activity-dialog.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { UtilityComponentComponent } from './utility-component/utility-component.component';
import { MatExpansionModule } from '@angular/material/expansion';
// import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AccountComponent,
    ActivityComponent,
    LeadComponent,
    OpportunityComponent,
    CurrencyComponent,
    QuickaccountComponent,
    QuickconatactComponent,
    TechnologyComponent,
    RawDataComponent,
    ConformComponent,
    ContactComponent,
    ActivityMasterComponent,
    AddActivityDialogComponent,
    ConfigurationComponent,
    UtilityComponentComponent
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    NgApexchartsModule,
    NgxChartsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatTooltipModule,
    ComponentsModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
  //  MatProgressBarModule,
    MatSidenavModule,
     MatTooltipModule,
    MatSidenavModule,
    MatSelectModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule,
  ],
  // providers: [NgbModalConfig, NgbModal],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CrmModule { }
