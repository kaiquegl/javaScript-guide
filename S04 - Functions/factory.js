function criaPessoa(nome, sobreNome, a, p) {
  return {
    peso: p,
    altura: a,
    sobreNome,
    nombre: nome,
    fala: function (assunto) {
      return `${this.nombre} está ${assunto}.`;
    },
    get imc() {
      const indice = this.peso / this.altura ** 2;
      return indice.toFixed(2);
    },
    get nomeCompleto() {
      return `${this.nombre} ${this.sobreNome}`;
    },
    set changeSobreNome(newSobreNome) {
      this.sobreNome = newSobreNome;
    },
  };
}

const p1 = criaPessoa("Kaique", "Lima", 1.75, 76);

console.log(p1.fala("falando sobre factoryFunction"));
console.log(p1.nomeCompleto);
console.log(p1.imc);
p1.changeSobreNome = "Godoi";
console.log(p1.nomeCompleto);
