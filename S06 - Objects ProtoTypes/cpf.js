function IsValidCPF(cpfReceived) {
  Object.defineProperty(this, "pCleanCPF", {
    enumerable: true,
    get: () => cpfReceived.replace(/\D+/g, ""),
  });
}

IsValidCPF.prototype.valid = function () {
  if (typeof this.pCleanCPF === "undefined") return false;
  if (this.pCleanCPF.length !== 11) return false;
  if (this.isSequence()) return false;

  const partialCPF = this.pCleanCPF.slice(0, -2);
  const firstDigit = this.createNumber(partialCPF);
  const secondDigit = this.createNumber(partialCPF + firstDigit);

  const newCPF = partialCPF + firstDigit + secondDigit;

  return newCPF === this.pCleanCPF;
};

IsValidCPF.prototype.createNumber = function (partialCPF) {
  const cpfArray = Array.from(partialCPF);

  let regressive = cpfArray.length + 1;

  const total = cpfArray.reduce((ac, val) => {
    ac += regressive * Number(val);
    regressive--;

    return ac;
  }, 0);

  const digit = 11 - (total % 11);

  return digit > 9 ? "0" : String(digit);
};

IsValidCPF.prototype.isSequence = function () {
  return this.pCleanCPF[0].repeat(this.pCleanCPF.length) === this.pCleanCPF;
};

const cpf = new IsValidCPF("455.530.918-96");
console.log(cpf);
console.log(cpf.valid());
