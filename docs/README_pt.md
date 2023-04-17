# Screen Tint: Um plugin para o RPG Maker
> Click here to [read](https://github.com/caiofov/ScreenTint-RPGMaker-Plugin#readme) in English

É uma maneira alternativa de alterar a tonalidade da tela.

> Versão 1.0.0

## Instalação
Você deve baixar o aquivo `ScreenTint.js` e adicioná-lo à pasta de plugins do seu projeto. Após isso, adicione-o e ative-o no RPG Maker.

## Como usar
Você pode fazer o uso de variáveis (seguindo a sintaxe do RPG Maker - `\v[<id_da_variável>]`) em todos argumentos dos comandos.

### Mudar tonalidade diretamente por comando:

```
tint tone <vermelho> <verde> <azul> <cinza> <quadros>
```

- `vermelho` (inteiro - entre -255 e 255): valor vermelho
- `verde` (inteiro - entre -255 e 255): valor verde
- `azul` (inteiro - entre -255 e 255): valor azul
- `cinza` (inteiro - entre 0 e 255): valor cinza
- `quadros` (inteiro): duração da transição (60 quadros = 1 segundo)
 
 
### Carregar uma tonalidade salva:
Você também pode salvar suas tonalidades no campo "Tonalidades Salvas" nos parâmetros do plugin.
Para carregá-las, deverá usar o seguinte comando:

```
tint load <identificador da tonalidade salva>
```

- `identificador da tonalidade salva` (string): nome da tonalidade salva

**Atenção**: O comando diferencia letras maiúsculas e minúsculas