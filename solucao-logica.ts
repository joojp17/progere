// 1.1
const calcularFatorial = (n: number): number => {
    if (n < 0 || n !== Math.floor(n)){
        console.error("Entrada inválida");
        return 0;
    }

    if (n === 0) {
        return 1;
    }
    return n * calcularFatorial(n - 1);
};

console.log(calcularFatorial(-5));

// 1.2
const verificarPalindromo = (texto: string): boolean => {

  const normalized = texto
    .toLowerCase()
    .replace(/\s+/g, "");

  const inverse = normalized.split("").reverse().join("");

  return normalized === inverse;
};


console.log(verificarPalindromo("Anotaram a data da maratona"));
console.log(verificarPalindromo("Angular é legal"));