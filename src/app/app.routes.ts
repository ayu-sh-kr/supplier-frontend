import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HeaderComponent} from "./header/header.component";
import {ProductComponent} from "./product/product.component";
import {ProductFormComponent} from "./product-form/product-form.component";
import {ProductHeaderComponent} from "./product-header/product-header.component";
import {SortComponent} from "./sort/sort.component";
import {BranchComponent} from "./branch/branch.component";
import {BranchHeaderComponent} from "./branch-header/branch-header.component";
import {BranchFormComponent} from "./branch-form/branch-form.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {LoginProfileComponent} from "./login-profile/login-profile.component";
import {OrderComponent} from "./shipment/order/order.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'home',
    component: HeaderComponent,
    children: [
      {
        path: 'products',
        component: ProductHeaderComponent,
        children: [
          {
            path: '',
            component: ProductComponent
          },
          {
            path: 'add-product',
            component: ProductFormComponent
          },
          {
            path: 'sort-products',
            component: SortComponent
          }
        ]
      },
      {
        path: 'branch',
        component: BranchHeaderComponent,
        children: [
          {
            path: '',
            component: BranchComponent
          },
          {
            path: 'branch-form',
            component: BranchFormComponent
          },
          {
            path: 'employees',
            component: UserProfileComponent
          }
        ]
      },
      {
        path:'profile',
        component: LoginProfileComponent
      },
      {
        path: 'shipment',
        component: OrderComponent
      }
    ]
  },
];
