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

console.log(calcularFatorial(5));

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

// 1.3
interface Person {
    nome: string;
    idade: number;
    cidade: string;
}
const agruparPor = (arr: Person[], key: string): { [key: string]: Person[] } => {
  return arr.reduce((acc, obj) => {
    const filter = obj[key];
    if (!acc[filter]) {
      acc[filter] = [];
    }
    acc[filter].push(obj);
    return acc;
  }, {} as { [key: string]: Person[] });
};

const people = [
{ nome: "Ana", idade: 25, cidade: "São Paulo" },
{ nome: "Bruno", idade: 30, cidade: "Rio de Janeiro" },
{ nome: "Carla", idade: 25, cidade: "São Paulo" },
{ nome: "Daniel", idade: 30, cidade: "Campinas" }
];

console.log(agruparPor(people, "cidade"));