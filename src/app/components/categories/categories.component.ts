import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { Category } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(private _ProductsService: ProductsService) {}

  categories: Category[] = [];
  display: boolean = false;

  ngOnInit(): void {
    this._ProductsService.getCaegories().subscribe({
      next: (response) => {
        this.categories = response.data;
        this.display = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
