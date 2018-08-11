import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [ AuthGuard ],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'components',
        loadChildren: './views/components/components.module#ComponentsModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'forms',
        loadChildren: './views/forms/forms.module#FormsModule'
      },
      {
        path: 'editors',
        loadChildren: './views/editors/editors.module#EditorsModule'
      },
      {
        path: 'plugins',
        loadChildren: './views/plugins/plugins.module#PluginsModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'uikits',
        loadChildren: './views/uikits/uikits.module#UIKitsModule'
      },
      {
        path: 'orders',
        data: {
          title: 'Orders'
        },
        loadChildren: './views/orders/orders.module#OrdersModule'
      },
      {
        path: 'patients',
        data: {
          title: 'Patients'
        },
        loadChildren: './views/patients/patients.module#PatientsModule'
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
