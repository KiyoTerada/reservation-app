import { Component } from '@angular/core';
import { products } from '../../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListComponent {
  products: any;

  ngOnInit(){
      this.products = products;
  }
}
