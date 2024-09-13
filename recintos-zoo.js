class RecintosZoo {

    recintos = [
        { id: 1, biomas: ['savana'], capacidade: 10, ocupacao: 3, especiesPresentes: ['macaco'] },
        { id: 2, biomas: ['floresta'], capacidade: 5, ocupacao: 0, especiesPresentes: [] },
        { id: 3, biomas: ['savana', 'rio'], capacidade: 7, ocupacao: 1, especiesPresentes: ['gazela'] },
        { id: 4, biomas: ['rio'], capacidade: 8, ocupacao: 0, especiesPresentes: [] },
        { id: 5, biomas: ['savana'], capacidade: 9, ocupacao: 1, especiesPresentes: ['leão'] }
    ];

    especiesValidas = ['macaco', 'gazela', 'leão', 'leopardo', 'crocodilo', 'hipopotamo'];

    // Função a ser chamada no teste
    analisaRecintos(animal, quantidade) {
        const resultado = { erro: null, recintosViaveis: [] };

        // Converter input para minúsculas
        const animalLower = animal.toLowerCase();

        // Validar animal
        if (!this.especiesValidas.map(a => a.toLowerCase()).includes(animalLower)) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }

        // Verificação quantidade
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        // Verificação do bioma
        const possuiBiomas = (biomasRecinto, biomasNecessarios) => {
            return biomasNecessarios.every(biomas => biomasRecinto.includes(biomas));
        }

        // Verificação dos recintos viáveis
        this.recintos.forEach(recinto => {
            const capacidadeDisponivel = recinto.capacidade - recinto.ocupacao;

            // Para saber se há alguma espécie no recinto
            const especieRecinto = recinto.especiesPresentes.length > 0 ? recinto.especiesPresentes[0] : null;


            // Verificação para carnivoros
            // Recinto adequeado se o novo animal não for carnivoro ou, caso seja carnivoro, que a especiePresentes nao seja um carnivoro
            const animaisCarnivoros = ['leão', 'crocodilo', 'leopardo'];

            const recintoAdequado = !especieRecinto
                ? !animaisCarnivoros.includes(animalLower)
                : !animaisCarnivoros.includes(especieRecinto.toLowerCase()) || !animaisCarnivoros.includes(animalLower);


            //Verificação da compatibilidade do macaco e do hipopotamo
            // Variável para verificar bioma para o hipopotamo
            const biomaAdequado = animalLower === 'hipopotamo' || animalLower === 'crocodilo'
                ? possuiBiomas(recinto.biomas, ['rio'])
                : animalLower === 'macaco'
                    ? possuiBiomas(recinto.biomas, ['savana', 'floresta']) : true;

            if (
                (animalLower === 'macaco' && recinto.especiesPresentes.length === 0) ||  // Não pode haver outras espécies no recinto para macacos
                (!biomaAdequado) ||  // Verifica se o bioma não é adequado
                (!recintoAdequado)  // Verifica a compatibilidade entre carnívoros e herbívoros
            ) {
                return;
            }

            // Verificação do espaço extra
            const especieExtra = (recinto.especiesPresentes.length > 0 && recinto.especiesPresentes[0].toLowerCase() !== animalLower) ? 1 : 0;
            if (quantidade + especieExtra > capacidadeDisponivel) {
                return;
            }



            //Add recinto viável
            resultado.recintosViaveis.push(
                `Recinto ${recinto.id} (espaço livre: ${capacidadeDisponivel - quantidade} total: ${recinto.capacidade})`
            );
        });

        // Caso nenhum recinto seja encontrado
        if (resultado.recintosViaveis.length === 0) {
            resultado.erro = "Não há recinto viável";
            resultado.recintosViaveis = null;
        }


        return resultado;
        
    }
}


export { RecintosZoo as RecintosZoo };
let resultado = new RecintosZoo().analisaRecintos('MACACO', 1);
console.log(resultado.recintosViaveis);