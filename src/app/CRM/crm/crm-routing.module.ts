import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AccountComponent } from './account/account.component';
import { ActivityComponent } from './activity/activity.component';
import { RawDataComponent } from './raw-data/raw-data.component';
import { LeadComponent } from './lead/lead.component';
import { ContactComponent } from './contact/contact.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { TechnologyComponent } from './technology/technology.component';
import { CurrencyComponent } from './currency/currency.component';
import { ActivityMasterComponent } from './activity-master/activity-master.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { UtilityComponent } from 'src/app/admin/dashboard/utility/utility.component';
import { UtilityComponentComponent } from './utility-component/utility-component.component';

const routes: Routes = [
    {
      path: "",
      redirectTo: "utility",
      pathMatch: "full",
    },
    {
      path: "row-data",
      component:RawDataComponent,
    },
    {
      path: "lead",
      component:LeadComponent,
    },
    {
      path: "account",
      component:AccountComponent,
    },
    {
      path: "contact",
      component:ContactComponent,
    },
    {
      path: "opportunity",
      component: OpportunityComponent,
    },
    {
      path: "technology",
      component: TechnologyComponent,
    },
    {
      path: "currency",
      component: CurrencyComponent,
    },
    {
      path: "Actvity",
      component: ActivityComponent,
    },
    {
      path: "ActvityMaster",
      component: ActivityMasterComponent,
    },
    {
      path: "utility",
      component: UtilityComponentComponent,
    },
    
    {
      path: "configuration",
      component: ConfigurationComponent,
    },
    { path: "**", component: Page404Component },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
