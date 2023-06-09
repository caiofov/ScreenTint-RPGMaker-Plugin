/** /*:
 * @plugindesc Alternative way of changing screen tone.
 * @author Caio Oliveira
 * 
 * @help
 * # Version 1.0.0
 * # Source: https://github.com/caiofov/ScreenTint-RPGMaker-Plugin
 * 
 * You can use variables (following RPG Maker's syntax 
 * - '\v[<variable_id>]') in all command arguments.
 * 
 * > Change screen tone directly via command:
 *
 * tint tone <red> <green> <blue> <gray> <frames>
 * 
 * - red (integer - between -255 and 255): red value
 * - green (integer - between -255 and 255): green value
 * - blue (integer - between -255 and 255): blue value
 * - gray (integer - between 0 and 255): gray value
 * - frames (integer): transition's duration (60 frames = 1 second)
 * 
 * 
 * > Load saved tone:
 * You can also save tones in the 'Saved Tones' field on the right 
 * side of this screen. 
 * To load them, you must use the following command:
 * 
 * tint load <saved tone identifier>
 * 
 * - saved tone identifier (string): saved tone's name
 * 
 * Warning: It is case sensitive
 * 
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
 * @default ["{\"Name\":\"Normal\", \"Red\":\"0\",\"Green\":\"0\",\"Blue\":\"0\",\"Gray\":\"0\",\"Frames\":\"60\"}", "{\"Name\":\"Dark\", \"Red\":\"-68\",\"Green\":\"-68\",\"Blue\":\"-68\",\"Gray\":\"0\",\"Frames\":\"60\"}", "{\"Name\":\"Sepia\", \"Red\":\"34\",\"Green\":\"-34\",\"Blue\":\"-68\",\"Gray\":\"170\",\"Frames\":\"60\"}", "{\"Name\":\"Sunset\", \"Red\":\"68\",\"Green\":\"-34\",\"Blue\":\"-34\",\"Gray\":\"0\",\"Frames\":\"60\"}", "{\"Name\":\"Night\", \"Red\":\"-68\",\"Green\":\"-68\",\"Blue\":\"0\",\"Gray\":\"68\",\"Frames\":\"60\"}"]
 * 
 * 
 */

/** /*:pt
 * @plugindesc Maneira alternativa de alterar a tonalidade da tela.
 * @author Caio Oliveira
 * 
 * @help
 * # Versão 1.0.0
 * # Referência: https://github.com/caiofov/ScreenTint-RPGMaker-Plugin
 * 
 * Você pode fazer o uso de variáveis (seguindo a sintaxe do RPG Maker - 
 * '\v[<id_da_variável>]') em todos argumentos dos comandos.
 * 
 * > Mudar tonalidade diretamente por comando:
 * 
 * tint tone <vermelho> <verde> <azul> <cinza> <quadros>
 * 
 * - vermelho (inteiro - entre -255 e 255): valor vermelho
 * - verde (inteiro - entre -255 e 255): valor verde
 * - azul (inteiro - entre -255 e 255): valor azul
 * - cinza (inteiro - entre 0 e 255): valor cinza
 * - quadros (inteiro): duração da transição (60 quadros = 1 segundo)
 * 
 * 
 * > Carregar uma tonalidade salva:
 * Você também pode salvar suas tonalidades no campo "Tonalidades Salvas" do 
 * lado direito desta tela.
 * Para carregá-las, deverá usar o seguinte comando:
 * 
 * tint load <identificador da tonalidade salva>
 * 
 * - identificador da tonalidade salva (string): nome da tonalidade salva
 * 
 * Atenção: O comando diferencia letras maiúsculas e minúsculas
 * @param Show logs
 * @text Mostrar logs
 * @type boolean
 * @on Mostrar
 * @off Não mostrar
 * @default false
 * @desc Mostrar ou não os logs do plugin (Visíveis quando pressiona F8 enquanto o jogo está executando). Útil para depuração.
 * 
 * @param Saved Tones
 * @text Tonalidade Salvas
 * @type struct<Tone>[]
 * @desc Salvar os tons para carregá-los mais facilmente
 * @default ["{\"Name\":\"Normal\", \"Red\":\"0\",\"Green\":\"0\",\"Blue\":\"0\",\"Gray\":\"0\",\"Frames\":\"60\"}", "{\"Name\":\"Escuro\", \"Red\":\"-68\",\"Green\":\"-68\",\"Blue\":\"-68\",\"Gray\":\"0\",\"Frames\":\"60\"}", "{\"Name\":\"Sepia\", \"Red\":\"34\",\"Green\":\"-34\",\"Blue\":\"-68\",\"Gray\":\"170\",\"Frames\":\"60\"}", "{\"Name\":\"Por do sol\", \"Red\":\"68\",\"Green\":\"-34\",\"Blue\":\"-34\",\"Gray\":\"0\",\"Frames\":\"60\"}", "{\"Name\":\"Noite\", \"Red\":\"-68\",\"Green\":\"-68\",\"Blue\":\"0\",\"Gray\":\"68\",\"Frames\":\"60\"}"]
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
 * @min -255
 * @max 255
 * 
 * @param Green
 * @type number
 * @min -255
 * @max 255
 * 
 * @param Blue
 * @type number
 * @min -255
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
 * Converts a text to a log pattern used on this plugin
 * @param {string} message text to convert to plugin's error pattern
 * @returns error message
 */
function log_message(message) {
    return `[Screen Tint Plugin] - ${message}`
}

/**
 * Converts a string to Number and validates if it is between `min` and `max`
 * @param {string | Number} num number to convert
 * @param {Number} min number's min value
 * @param {Number} max number's max value (default: 255)
 * @returns {Number} converted and validated number
 */
function to_color_number(num, min, max = 255) {
    let converted = Number(parse_text(num))
    if (converted > max || converted < min) {
        throw RangeError(log_message(`Must be between ${min} and ${max}`))
    }
    return converted
}

/**
 * Identifies whether if the text is referencing to a variable and gets its value.
 * @param {string} text 
 * @returns {string | Number}
 */
function parse_text(text) {
    let pattern = /\\v\[([0-9]+)\]/

    let match = text.match(pattern)
    if (match) {
        return $gameVariables.value(Number(match[1]))
    }
    else {
        return text
    }
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
    this.red = to_color_number(red, -255)
    this.green = to_color_number(green, -255)
    this.blue = to_color_number(blue, -255)
    this.gray = to_color_number(gray, 0)
    this.frames = parse_text(frames)

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
    this.name = parse_text(obj.Name)
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

/**
 * Displays a message on the console if 'show_logs' param is enable
 * @param {string} message 
 */
function log(message) {
    if (PARAMS.show_logs) {
        console.log(log_message(message))
    }
}

Game_Interpreter.prototype.pluginCommand = function (command, args) {
    plugin.call(this, command, args);

    if (command === "tint") {
        let tone
        log(`Command: '${args[0]}' | Args: ${args.slice(1)}`)

        switch (args[0]) {
            case "tone":
                if (args.length != 6) {
                    throw RangeError(log_message(`Invalid number of arguments (expected 5) for command 'tint'.\n
                    Current args: ${args.slice(1)}`))
                }
                tone = new ScreenTone(...args.slice(1))
                break;

            case "load":
                let name = args.slice(1).join(" ")
                tone = PARAMS.get_saved_tone(name)
                if (!tone) {
                    throw RangeError(log_message(`Tone '${name}' can not be found.`))
                }
                break;
            default:
                throw TypeError(log_message(`Invalid command '${args[0]}'. Expected 'tone' or 'load'`))
        }
        let values = tone.to_array()
        log(`Start tint | Values: ${values} | Frames: ${tone.frames}`)
        $gameScreen.startTint(values, tone.frames)
    }
};