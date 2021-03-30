import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import {ContentRoute} from "../../layout/components/content/content-route";
import Product from "./product";
import ProductGroup from "./product-group";

function ProductPage(props: any) {
  return (
    <Switch>
      <Redirect exact={true} from="/product-category" to="/product-category/product"/>
      <ContentRoute path="/product-category/product" component={Product}/>
      <ContentRoute path="/product-category/group-product" component={ProductGroup}/>
    </Switch>
  );
}

export default ProductPage;