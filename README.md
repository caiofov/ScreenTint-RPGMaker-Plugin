# Screen Tint: A RPG Maker plugin
> Clique [aqui](https://github.com/caiofov/ScreenTint-RPGMaker-Plugin/blob/main/docs/README_pt.md) para ler em português

This is an alternative way of changing screen tone.

- [Installation](#installation)
- [How to use](#how-to-use)
- [Command `tone`](#change-screen-tone-directly-via-command)
- [Command `load`](#load-saved-tone)

> Version 1.0.0
## Installation
You must download the file `ScreenTint.js` and move it to your project's plugin folder. After that, add and enable it on RPG Maker.

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

**Example**

Turning into red (255,0,0,0) in 60 frames
```
tint tone 255 0 0 0 60
```
- With variable:
Assigning the first value (255) to variable #1, it is possible to use its id instead of the color value

```
tint tone \v[1] 0 0 0 60
``` 
![Red](docs/imgs/red.gif)

###  Load saved tone:
You can also save tones in the 'Saved Tones' field on plugin's parameters. 
To load them, you must use the following command:

```
tint load <saved tone identifier> 
```

 - `saved tone identifier` (string): saved tone's name

**Warning**: It is case sensitive

**Example**

Loading the following tone, which must be specified in plugin's parameters

![Saved tone](docs/imgs/saved_tone.png)

```
tint load normal
```
