'use strict';

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key == key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

const lotrChars = [{ Hobbit: 'Bilbo' }, { Hobbit: 'Frodo' }, { Wizard: 'Gandolf' }, { Human: 'Aragon' }, { Elf: 'Legolas' }, { Maiar: 'The Necromancer' }, { Maiar: 'Sauron' }, { RingBearer: 'Gollum' }, { LadyOfLight: 'Galadriel' }, { HalfElven: 'Arwen' }, { Ent: 'Treebeard' }];

function main() {
  let lotr = new HashMap();
  
  lotr.set('Hobbit', ['Bilbo', 'Frodo']);
  //lotr.set('Hobbit', 'Frodo');
  lotr.set('Wizard', 'Gandolf');
  // lort.set()
  // lotr.set({ Hobbit: 'Bilbo , Frodo' ,  Wizard: 'Gandolf' ,  Human: 'Aragon' ,  Elf: 'Legolas' ,  Maiar: 'The Necromancer , Sauron' ,  RingBearer: 'Gollum' ,  LadyOfLight: 'Galadriel' ,  HalfElven: 'Arwen',  Ent: 'Treebeard' });
  console.log(JSON.stringify(lotr));
  console.log(lotr.get('Hobbit'));
}
main();

function isPalindrome(str) {
  const hashmap = new HashMap();
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      continue;
    }
    hashmap.set(str[i], 0);
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      continue;
    }
    let valueToInc = hashmap.get(str[i]);
    hashmap.set(str[i], valueToInc + 1);
  }
  let numberOfOdd = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      continue;
    }
    let value = hashmap.get(str[i]);
    if (value % 2 !== 0) {
      numberOfOdd++;
    }
  }
  if (numberOfOdd > 1) {
    return false;
  } else {
    return true;
  }
  // return hashmap;
}

console.log(JSON.stringify(isPalindrome('Thomas')));

function anagramGrp(array) {


  
}
