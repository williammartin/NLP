import colors from 'colors';

import {WordGroup, Word} from 'grammar/tokenizer';
import * as Data from 'data/data';

import {Meaning} from './meaning';
import Thing from './thing/thing';



/**
 * call me as soon as the sun rises
 *         '---.----' '-----.-----'
 *          modifier     addition  
 */
export default class Value extends Thing {

    _txt: string;
    _amount: number;
    _unit: string;
    _modifier: string;
    _addition: Meaning;

    protected processWords() {

        if (this._conns.length) {

            const modifiers = Data.getData('value_modifiers');
            const blob = this._conns.map(sep=>sep.toString()).join(' ');

            for (const modifier of Object.keys(modifiers)) {
                const matchingWords = modifiers[modifier];

                for (const matchingWord of matchingWords) {
                    if (new RegExp(matchingWord).test(blob))
                        this._modifier = modifier;
                }
            }
        }

        let matches = this._wordGroup.toString().match(/[\d.,]+/);
        if (matches !== null)
            this._amount = Number.parseInt(matches[0]);

        matches = this._wordGroup.toString().match(/[\d.,]+([\w\s]+)|([\w]+)\s*$/);
        if (matches !== null && matches.length > 1)
            this._unit = matches[1].trim();

        matches = this._wordGroup.toString().match(/"(.*)"/);
        if (matches !== null && matches.length > 1)
            this._txt = matches[1].trim();
    }
}
