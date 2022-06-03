import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { CatsService } from '../cats/cats.service';

@Injectable()
export class OwnersService {
  constructor(private catServices: CatsService) {}
  private owners: CreateOwnerDto[] = [
    { id: 1, name: 'John', cats: [{ catId: 1, adoptedOn: new Date() }] },
    { id: 2, name: 'Doe', cats: [] },
    { id: 3, name: 'Smith', cats: [] },
  ];

  // Create a new owner
  create(createOwnerDto: CreateOwnerDto) {
    // create new element
    const newOwner = { ...createOwnerDto, id: this.owners.length + 1 };
    // add the new element to the array
    this.owners.push(newOwner);
    // return the new element
    return newOwner;
  }

  // owner adopts a cat
  adopt(ownerId: number, catId: number) {
    // check if the cat is already adopted
    if (this.catServices.findOne(catId).adopted) {
      return `Cat with id ${catId} is already adopted`;
    }

    // change the cat's adopted status
    this.catServices.update(catId, { adopted: true });

    // add the cat to the owner
    this.owners = this.owners.map((el) => {
      // if the id matches, update the element
      if (el.id === ownerId) {
        return {
          ...el,
          cats: [...el.cats, { catId, adoptedOn: new Date() }],
        };
      }
      // otherwise return the element
      return el;
    });

    return `Cat with id ${catId} has been adopted by owner with id ${ownerId} on ${new Date()}`;
  }

  // owner adopts a cat and the cat is adopted by another owner
  transfer(ownerId: number, catId: number, newOwnerId: number) {
    // remove the cat from the old owner
    this.owners = this.owners.map((el) => {
      // if the id matches, update the element
      if (el.id === ownerId) {
        return {
          ...el,
          cats: el.cats.filter((cat) => cat.catId !== catId),
        };
      }
      // otherwise return the element
      return el;
    });

    // add the cat to the new owner
    this.owners = this.owners.map((el) => {
      // if the id matches, update the element
      if (el.id === newOwnerId) {
        return {
          ...el,
          cats: [...el.cats, { catId, adoptedOn: new Date() }],
        };
      }
      // otherwise return the element
      return el;
    });

    return `Cat with id ${catId} has been transferred to owner with id ${newOwnerId} on ${new Date()}`;
  }

  // find all owners and populate their cats
  findAll() {
    return this.owners.map((owner) => {
      return {
        ...owner,
        cats: owner.cats.map((cat) => ({
          ...this.catServices.findOne(cat.catId),
          adoptedOn: cat.adoptedOn,
        })),
      };
    });
  }

  findOne(id: number) {
    const owner = this.owners.find((owner) => owner.id === id);
    // return the owner after we populate its cats
    return owner
      ? {
          ...owner,
          cats: owner.cats.map((cat) => ({
            ...this.catServices.findOne(cat.catId),
            adoptedOn: cat.adoptedOn,
          })),
        }
      : 'Owner not found';
  }

  // find owner by cat id
  findByCatId(catId: number) {
    const owners = this.owners.find((owner) => {
      const haveCat = owner.cats.find((cat) => cat.catId === catId);
      if (haveCat) {
        return { ...owner };
      }
    });
    return owners ? owners : 'Owner not found';
  }

  // update the owner with the given id
  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    this.owners = this.owners.map((owner) => {
      // if the id matches, update the element
      if (owner.id === id) {
        return { ...owner, ...updateOwnerDto };
      }
      // otherwise return the element
      return owner;
    });
    return `Owner with id ${id} has been updated`;
  }

  // remove the owner with the given id
  remove(id: number) {
    this.owners = this.owners.filter((owner) => owner.id !== id);
    return `Owner with id ${id} has been removed`;
  }

  // remove all owners
  removeAll() {
    this.owners = [];
    return 'All owners have been removed';
  }
}
