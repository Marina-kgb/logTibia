const fs = require('fs');

const path = 'C:/tibia/Server_log.txt';

fs.readFile(path, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let somaYouLose = 0;
  let somaYouHealed = 0;
  let somaUnknownOrigin = 0;
  //let somaAttackBy = 0;
  let somaTotalExperience = 0;
  let somaloot = 0;
  let somaBlackKnightloses = 0;

  const linhas = data.split('\n');

  linhas.forEach((linha) => {
    // Verifica e soma a palavra "You lose" (ignorando maiúsculas e minúsculas)
    if (linha.toLowerCase().includes('you lose')) {
      const numero = parseInt(linha.replace(/^\d{2}:\d{2}.*?\b(\d+)\b/, '$1'));
      somaYouLose += numero;
    }
    

    // Verifica e soma a palavra "You healed" (ignorando maiúsculas e minúsculas)
    if (linha.toLowerCase().includes('you healed')) {
      const numero = parseInt(linha.replace(/^\d{2}:\d{2}.*?\b(\d+)\b/, '$1'));
      somaYouHealed += numero;
    }
    
    if (linha.toLowerCase().includes('unknown origin')) {
      const numero = parseInt(linha.replace(/^\d{2}:\d{2}.*?\b(\d+)\b/, '$1'));
      somaUnknownOrigin += numero;
    }
    

    // Verifica e soma a palavra "attack by" (ignorando maiúsculas e minúsculas não ignorando a soma pela hora do log)
    //if (linha.toLowerCase().includes('attack by')) {
      //const numero = parseInt(linha.replace(/\D/g, '').trim());
      //const numero = linha.replace(/^\d{2}:\d{2}/, '').match(/\d+/g);
      //somaAttackBy += numero;
    //}

    // Verifica e soma a palavra "Total experience" (ignorando maiúsculas e minúsculas)
    if (linha.toLowerCase().includes('experience')) {
      const numeros = linha.replace(/^\d{2}:\d{2}/, '').match(/\d+/g);
      if (numeros) {
        numeros.forEach((numero) => {
          somaTotalExperience += parseInt(numero);
        });
      }
    }

    // Verifica e soma a palavra "Loot" mesmo que Dropped (ignorando maiúsculas e minúsculas)
    if (linha.toLowerCase().includes('loot')) {
      const numeros = linha.replace(/^\d{2}:\d{2}/, '').match(/\d+/g);
      if (numeros) {
        numeros.forEach((numero) => {
          somaloot += parseInt(numero);
        });
      }
    }

    // Verifica e soma a palavra "Black Knight loses" (ignorando maiúsculas e minúsculas)
    if (linha.toLowerCase().includes('black knight loses')) {
      const numeros = linha.replace(/^\d{2}:\d{2}/, '').match(/\d+/g);
      if (numeros) {
        numeros.forEach((numero) => {
          const valor = numero.match(/\d+/);
          if (valor) {
            somaBlackKnightloses += parseInt(valor[0]);
          }
        });
      }
    }
  });

  console.log('Soma de "You lose":', somaYouLose);
  console.log('Soma de "You healed":', somaYouHealed);
  //console.log('Soma de "Attack By":', somaAttackBy);
  console.log('Soma de "Total experience":', somaTotalExperience);
  console.log('Soma de "Total de Dropped":', somaloot);
  console.log('Soma de "Black Knight creature":', somaBlackKnightloses);
  console.log('Ataques de unknown origin":', somaUnknownOrigin);

  const ataques = {};

  linhas.forEach((linha) => {
    if (linha.toLowerCase().includes('attack by')) {
      const nomeAtacante = linha.split('attack by')[1].trim();
      const pontosAtaque = parseInt(linha.match(/\d+/g)[0]);

      if (ataques[nomeAtacante]) {
        ataques[nomeAtacante] += pontosAtaque;
      } else {
        ataques[nomeAtacante] = pontosAtaque;
      }
    }
  });

  console.log('Soma dos ataques por criatura:');
  for (const atacante in ataques) {
    console.log(`${atacante}: ${ataques[atacante]} hitpoints`);
  }
});
