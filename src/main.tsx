class Dinheiro {
  private centavos: number;

  constructor(valor: number) {
  
    this.centavos = Math.round(valor * 100);
  }

  private static deCentavos(centavos: number): Dinheiro {
    const dinheiro = new Dinheiro(0);
    dinheiro.centavos = Math.round(centavos);
    return dinheiro;
  }

  somar(outro: Dinheiro): Dinheiro {
    return Dinheiro.deCentavos(this.centavos + outro.centavos);
  }

  subtrair(outro: Dinheiro): Dinheiro {
    return Dinheiro.deCentavos(this.centavos - outro.centavos);
  }

  multiplicar(multiplicador: number): Dinheiro {
    // Arredondamos no final para evitar frações de centavos
    return Dinheiro.deCentavos(this.centavos * multiplicador);
  }

  dividir(divisor: number): Dinheiro {
    if (divisor === 0) {
      throw new Error("Não é possível dividir por zero.");
    }
    return Dinheiro.deCentavos(this.centavos / divisor);
  }

  obterValorDecimal(): number {
    return this.centavos / 100;
  }

  formatar(moeda: string = 'BRL', localidade: string = 'pt-BR'): string {
    return new Intl.NumberFormat(localidade, {
      style: 'currency',
      currency: moeda,
    }).format(this.obterValorDecimal());
  }
}