import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../book';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  isEdit: boolean = false;
  selectedBook: Partial<Book> = {};
  bookForm!: FormGroup;
  newBookForm!: FormGroup;
  private booklist: Book[] = [
    { id: 1, name: 'Biology', category: 'Science', price: 1200, isEdit: false },
    {
      id: 2,
      name: 'Basics of C++',
      category: 'Computer Science',
      price: 1000,
      isEdit: false
    },
    {
      id: 3,
      name: 'Angular',
      category: 'Computer Science',
      price: 500,
      isEdit: false
    },
    {
      id: 4,
      name: 'Algebra',
      category: 'Mathematics',
      price: 200,
      isEdit: false
    }
  ];

  get booksArray(): FormArray {
    return this.bookForm.get('books') as FormArray
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      books: this.fb.array([])
    })

    this.booklist.forEach(bookItem => {
      this.booksArray.push(this.bookItemFormGroup(bookItem))
    })

    this.newBookForm = this.bookItemFormGroup()

  }



  addNewBook() {
    // if (this.booklist.length) {
    //   this.booklist.push(this.bookForm.value);
    // }
    this.booksArray.push(this.newBookForm)
  }

  deleteBook(index: number) {
    // this.selectedBook = book;
    // this.booklist
    //   .slice(-0, 1)
    //   .filter(i => i !== book)
    //   .map((i, idx) => ((i.id = idx + 1), i));
    this.booksArray.removeAt(index)

  }

  private bookItemFormGroup(book?) {
    return this.fb.group({
      id: [book?.id],
      name: [book?.name],
      category: [book?.category],
      price: [book?.price]
    })
  }
}
