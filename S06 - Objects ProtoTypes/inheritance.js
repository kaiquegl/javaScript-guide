function Product(name, price) {
  this.pName = name;
  this.pPrice = price;
}

Product.prototype.increase = function (quantity) {
  this.pPrice += quantity;
};

Product.prototype.discount = function (quantity) {
  this.pPrice -= quantity;
};

function TShirt(name, price, color) {
  this.pColor = color;

  Product.call(this, name, price);
}

TShirt.prototype = Object.create(Product.prototype); // I can only access Product.prototypes if I do this
TShirt.prototype.constructor = TShirt; // The constructor of TShirt will be Product if I don't do this

const tShirt = new TShirt("Regata", 7.8, "Preta");
tShirt.increase(10);
console.log(tShirt);
