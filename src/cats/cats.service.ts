import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  // Initial cats array
  private cats: CreateCatDto[] = [
    {
      id: 1,
      name: 'Cat 1',
      age: 1,
      breed: 'Breed 1',
      adopted: true,
    },
    {
      id: 2,
      name: 'Cat 2',
      age: 2,
      breed: 'Breed 2',
      adopted: false,
    },
    {
      id: 3,
      name: 'Cat 3',
      age: 3,
      breed: 'Breed 3',
      adopted: false,
    },
  ];

  // create a new element
  create(createCatDto: CreateCatDto): CreateCatDto {
    // create a new element
    const newCat = { ...createCatDto, id: this.cats.length + 1 };
    // add the new element to the array
    this.cats.push(newCat);
    // return the new element
    return newCat;
  }

  // update the element with the given id
  update(id: number, updateCatDto: UpdateCatDto): string {
    this.cats = this.cats.map((el) => {
      // if the id matches, update the element
      if (el.id === id) {
        return { ...el, ...updateCatDto };
      }
      // otherwise return the element
      return el;
    });
    return `Cat with id ${id} updated`;
  }

  // return all elements
  findAll(): CreateCatDto[] {
    return this.cats;
  }

  // find the element with the given id
  findOne(id: number): CreateCatDto {
    return this.cats.find((el) => el.id === id);
  }

  // return elements with the given breed
  findOneByBreed(breed: string): CreateCatDto[] {
    return this.cats.filter((el) => el.breed === breed);
  }

  // return elements with the given sort age order (ascending or descending)
  sortByAge(order: 'asc' | 'desc'): CreateCatDto[] {
    return this.cats.sort((a, b) =>
      order === 'asc' ? a.age - b.age : b.age - a.age,
    );
  }

  // return the average age of all elements
  averageAge(): number {
    return this.cats.reduce((acc, el) => acc + el.age, 0) / this.cats.length;
  }

  // return the oldest element
  findOldest(): CreateCatDto {
    return this.cats.sort((a, b) => b.age - a.age)[0];
  }

  // return the youngest element
  findYoungest(): CreateCatDto {
    return this.cats.sort((a, b) => a.age - b.age)[0];
  }

  // return the number of elements
  count(): number {
    return this.cats.length;
  }

  // remove the element with the given id
  remove(id: number): CreateCatDto[] {
    this.cats = this.cats.filter((el) => el.id !== id);
    return this.cats;
  }

  // remove all elements with the given breed
  removeByBreed(breed: string): CreateCatDto[] {
    this.cats = this.cats.filter((el) => el.breed !== breed);
    return this.cats;
  }

  // remove all elements
  removeAll(): string {
    this.cats = [];
    return 'All cats removed';
  }
}
