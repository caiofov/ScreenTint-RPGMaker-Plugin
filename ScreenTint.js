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

/**
 * Converts a text to a error text pattern used on this plugin
 * @param {string} message text to convert to plugin's error pattern
 * @returns error message
 */
function error_message(message) {
    return `[Screen Tint Plugin] - ${message}`
}

function to_color_number(num) {
    let converted = Number(num)
    if (converted > 255 || converted < 0) {
        throw RangeError(error_message("Color number must be between 0 and 255"))
    }
    return converted
}

/**
 * ScreenTone
 * @param {string | Number} red 
 * @param {string | Number} green 
 * @param {string | Number} blue 
 * @param {string | Number} gray 
 * @param {string | Number} frames 
 * 
 * @type {{red:Number,green:Number,blue:Number,gray:Number,frames:Number}}
 */
function ScreenTone(red, green, blue, gray, frames) {
    this.red = to_color_number(red)
    this.green = to_color_number(green)
    this.blue = to_color_number(blue)
    this.gray = to_color_number(gray)
    this.frames = Number(frames)

    /**
     * @returns {number[]} Tint data as array
     */
    this.to_array = () => {
        let a = [this.red, this.green, this.blue, this.gray]
        return a
    }
}

/**
 * Parses the saved tone from plugin's parameters
 * @param {string} tone_str Tone object as string
 * @extends ScreenTone
 * @type {{name:string}}
 */
function SavedTone(tone_str) {
    let obj = JSON.parse(tone_str)
    this.name = obj.Name
    ScreenTone.prototype.constructor.call(this, obj.Red, obj.Green, obj.Blue, obj.Gray, obj.Frames)

}

/**
 * Loads plugin's parameters
 * @struct Parameters
 * @type {{saved_tones:Array<SavedTone>, show_logs:boolean}}
 */
function PluginParameters() {
    let params = PluginManager.parameters('ScreenTint')
    this.saved_tones = JSON.parse(params["Saved Tones"]).map(tone => { return new SavedTone(tone) })
    this.show_logs = JSON.parse(params["Show logs"])

    /**
     * Returns the saved tone which has the given name
     * @param {String} name name to search
     * @return {?SavedTone} tone found
    */
    this.get_saved_tone = function (name) {
        var tone_found = null
        this.saved_tones.forEach(tone => {
            console.log(tone.name.length, name.length)
            if (tone.name === name) {
                tone_found = tone
                return
            }
        });

        return tone_found
    }
}



var PARAMS = new PluginParameters()
const plugin = Game_Interpreter.prototype.pluginCommand;


Game_Interpreter.prototype.pluginCommand = function (command, args) {
    plugin.call(this, command, args);

    if (command === "tint") {
        let tone
        switch (args[0]) {
            case "tone":
                if (args.length != 6) {
                    throw RangeError(error_message(`Invalid number of arguments (expected 5) for command 'tint'.\n
                    Current args: ${args.slice(1)}`))
                }
                tone = new ScreenTone(...args.slice(1))
                break;

            case "load":
                let name = args.slice(1).join(" ")
                tone = PARAMS.get_saved_tone(name)
                if (!tone) {
                    throw RangeError(error_message(`Tone '${name}' can not be found.`))
                }
                break;
            default:
                throw TypeError(error_message(`Invalid command '${args[0]}'. Expected 'tone' or 'load'`))
        }
        $gameScreen.startTint(tone.to_array(), tone.frames)
    }
};