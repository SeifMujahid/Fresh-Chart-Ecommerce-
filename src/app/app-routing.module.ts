import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'Fresh Chart',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        title: 'Cart',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./components/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
        title: 'Wish List',
      },
      {
        path: 'payment/:cartID',
        loadComponent: () =>
          import('./components/payment/payment.component').then(
            (m) => m.PaymentComponent
          ),
        title: 'Payment',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'All Orders',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'categorydetails/:categoryID',
        loadComponent: () =>
          import('./components/categorydetails/categorydetails.component').then(
            (m) => m.CategorydetailsComponent
          ),
        title: 'Category Details',
      },
      // {
      // path: 'brands',
      //   loadComponent: () =>
      //     import('./components/brands/brands.component').then(
      //       (m) => m.BrandsComponent
      //     ),
      //   title: 'Brands',
      // },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'productdetails/:productID',
        loadComponent: () =>
          import('./components/productdetails/productdetails.component').then(
            (m) => m.ProductdetailsComponent
          ),
        title: 'Product Details',
      },
      {
        path: 'forgetpassword',
        loadComponent: () =>
          import('./components/forgetpassword/forgetpassword.component').then(
            (m) => m.ForgetpasswordComponent
          ),
        title: 'Forget Password',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'forgetpasswordauth',
        loadComponent: () =>
          import('./components/forgetpassword/forgetpassword.component').then(
            (m) => m.ForgetpasswordComponent
          ),
        title: 'Forget Password',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
    title: 'Not Found Page',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
