import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListComponent {
  products: any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    const productsObservable = this.productService.getProducts()
    productsObservable.subscribe(
      (data) => { 
        this.products = data
        // console.log('次のデータが出力されました：' + data) 
      },
      (err) => { console.error('次のエラーが発生しました：' + err) }
    )
  }
}
