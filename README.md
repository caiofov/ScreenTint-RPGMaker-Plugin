# Screen Tint: A RPG Maker plugin
> Clique [aqui](https://github.com/caiofov/ScreenTint-RPGMaker-Plugin/blob/main/docs/README_pt.md) para ler em português

This is an alternative way of changing screen tone.

> Version 1.0.0
## Instalation
You must download the file `ScreenTint.js` and move it to your project's plugin folder. After dad, add and enable it on RPG Maker.

## How to use
You can use variables (following RPG Maker's syntax - `\v[<variable_id>]`) in all command arguments.

###  Change screen tone directly via command:

```
tint tone <red> <green> <blue> <gray> <frames>
```

- `red` (integer - between -255 and 255): red value
- `green` (integer - between -255 and 255): green value
- `blue` (integer - between -255 and 255): blue value
- `gray` (integer - between 0 and 255): gray value
- `frames` (integer): transition's duration (60 frames = 1 second)


###  Load saved tone:
You can also save tones in the 'Saved Tones' field on plugin's parameters. 
To load them, you must use the following command:

```
tint load <saved tone identifier> 
```

 - `saved tone identifier` (string): saved tone's name

**Warning**: It is case sensitive