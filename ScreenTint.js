/** /*:
 * @plugindesc Alternative way of changing screen tone.
 * @author Caio Oliveira
 * 
 * @help
 * > Change screen tone directly via command:
 * - tint tone <red> <green> <blue> <gray> <frames>
 * 
 * > Load saved tone:
 * - tint load <saved tone identifier>
 * @param Show logs
 * @type boolean
 * @on Display
 * @off Do not display
 * @default false
 * @desc Whether if to display or not the plugin logs (visible by pressing F8 when the game is running). Useful for debugging.
 * 
 * @param Saved Tones
 * @type struct<Tone>[]
 * @desc Saved tones for loading in the game
 * 
 * 
 */

/** /*:pt
 * @plugindesc Maneira alternativa de alterar a tonalidade da tela.
 *
 * @help
 * > Mudar tonalidade diretamente por comando:
 * - tint tone <vermelho> <verde> <azul> <cinza> <quadros>
 * 
 * > Carregar uma tonalidade salva:
 * - tint load <identificador da tonalidade salva>
 * 
 * @param Show logs
 * @text Mostrar logs
 * @type boolean
 * @on Mostrar
 * @off Não mostrar
 * @default false
 * @desc Mostrar ou não os logs do plugin (Visíveis quando pressiona F8 enquanto o jogo está executando). Útil para depuração.
 * 
 * @param Saved Tones
 * @text Tonalidade salvas
 * @type struct<Tone>[]
 * @desc Salvar os tons para carregá-los mais facilmente
 * 
**/

/** 
 /*~struct~Tone:
 * @param Name
 * @type text
 * @desc tone's identifier
 * 
 * @param Red
 * @type number
 * @min 0
 * @max 255
 * 
 * @param Green
 * @type number
 * @min 0
 * @max 255
 * 
 * @param Blue
 * @type number
 * @min 0
 * @max 255
 * 
 * @param Gray
 * @type number
 * @min 0
 * @max 255
 * 
 * @param Frames
 * @type number
 * @desc Number of frames for the transition (1s -> 60 frames)
**/

function ScreenTone(red, green, blue, gray, frames) {
    this.red = Number(red)
    this.blue = Number(blue)
    this.green = Number(green)
    this.gray = Number(gray)
    this.frames = Number(frames)

    this.to_array = function () {
        return [this.red, this.green, this.blue, this.gray]
    }
}