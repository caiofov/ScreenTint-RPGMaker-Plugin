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