function Product(name, price, inventory) {
  // this.pName = name;
  // this.pPrice = price;

  Object.defineProperties(this, {
    pName: {
      enumerable: true, // show|hide
      value: name,
      writable: false, // changeable
      configurable: false,
    },
    pPrice: {
      enumerable: true,
      value: price,
      writable: false,
      configurable: false,
    },
  });

  let privateInventory = inventory;

  Object.defineProperty(this, "pInventory", {
    enumerable: true,
    // value: inventory,
    // writable: false,
    configurable: false,
    get: () => privateInventory,
    set: (newValue) => {
      if (typeof newValue !== "number") throw new TypeError("Wrong type");

      privateInventory = newValue;
    },
  });
}

const p1 = new Product("T-Shirt", 20, 3);
p1.pInventory = 20;
// delete p1.pInventory; // only when configurable is true
// console.log(p1.pInventory);
// console.log(Object.getOwnPropertyDescriptor(p1, "pInventory"));
