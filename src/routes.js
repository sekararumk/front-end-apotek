// import
import React, { Component }  from 'react';
import Dashboard from "views/Dashboard/Dashboard.js";
import KasirDashboard from "views/KasirDashboard/KasirDashboard.js";
import Category from "views/Dashboard/Category.js";
import FormAddCategory from "views/Dashboard/FormAddCategory.js";
import FormEditCategory from "views/Dashboard/FormEditCategory.js";
import FormAddProduct from "views/Dashboard/FormAddProduct.js";
import FormEditProduct from "views/Dashboard/FormEditProduct.js";
import Product from "views/Dashboard/Product.js";
import KasirProduct from "views/KasirDashboard/KasirProduct.js";
import Billing from "views/Dashboard/Billing.js";
import KasirBilling from "views/KasirDashboard/KasirBilling.js";
import KasirCart from "views/KasirDashboard/KasirCart.js";
import ManagementUser from "views/Dashboard/ManagementUser";
import FormAddUser from "views/Dashboard/FormAddUser.js";
import SignIn from "views/Pages/SignIn.js";

import {
  HomeIcon,
  OrderIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  CategoryIcon,
  ProductIcon
} from "components/Icons/Icons";

// dashRoutes = layout /admin
export var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Category",
    icon: <CategoryIcon color='inherit' />,
    component: Category,
    layout: "/admin",
  },
  {
    path: "/add-category",
    name: "Add Category",
    icon: <CategoryIcon color='inherit' />,
    component: FormAddCategory,
    layout: "/admin",
  },
  {
    path: "/edit-category/:id",
    name: "Edit Category",
    icon: <CategoryIcon color='inherit' />,
    component: FormEditCategory,
    layout: "/admin",
  },
  {
    path: "/product",
    name: "Product",
    icon: <ProductIcon color='inherit' />,
    component: Product,
    layout: "/admin",
  },
  {
    path: "/add-product",
    name: "Add Product",
    icon: <ProductIcon color='inherit' />,
    component: FormAddProduct,
    layout: "/admin",
  },
  {
    path: "/edit-product/:id",
    name: "Edit Product",
    icon: <ProductIcon color='inherit' />,
    component: FormEditProduct,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Transaksi",
    icon: <CreditIcon color='inherit' />,
    component: Billing,
    layout: "/admin",
  },
  // {
  //   path: "/management-user",
  //   name: "Management User",
  //   icon: <PersonIcon color='inherit' />,
  //   secondaryNavbar: true,
  //   component: ManagementUser,
  //   layout: "/admin",
  // },
  // {
  //   path: "/add-user",
  //   name: "Add User",
  //   icon: <PersonIcon color='inherit' />,
  //   secondaryNavbar: true,
  //   component: FormAddUser,
  //   layout: "/admin",
  // },
];

export var authRoutes = [
  {
    path: "/signin",
    name: "Sign In",
    icon: <DocumentIcon color='inherit' />,
    component: SignIn,
    layout: "/auth",
  },
]

export var kasirRoutes = [
  {
    path: "/dashboard",
    name: "Kasir Dashboard",
    icon: <HomeIcon color='inherit' />,
    component: KasirDashboard,
    layout: "/kasir",
  },
  {
    path: "/product",
    name: "Product",
    icon: <ProductIcon color='inherit' />,
    component: KasirProduct,
    layout: "/kasir",
  },
  {
    path: "/order",
    name: "Order",
    icon: <OrderIcon color='inherit' />,
    component: KasirCart,
    layout: "/kasir",
  },
  {
    path: "/billing",
    name: "Transaksi",
    icon: <CreditIcon color='inherit' />,
    component: KasirBilling,
    layout: "/kasir",
  },
]
