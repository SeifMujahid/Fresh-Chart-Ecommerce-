import { Category } from 'src/app/core/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss'],
})
export class CategorydetailsComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  display: boolean = false;
  categoryID: string | null = '';
  categoryDetails: Category = {} as Category;

  ngOnInit(): void {
    this.getCategoryID();
    this.displayDetails();
  }

  getCategoryID(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryID = params.get('categoryID');
      },
    });
  }

  displayDetails(): void {
    this._ProductsService.getSpacificCategory(this.categoryID).subscribe({
      next: (response) => {
        this.categoryDetails = response.data;
        this.display = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
