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