'use strict';

const { EmbedBuilder: BuildersEmbed } = require('@discordjs/builders');
const { isJSONEncodable } = require('@discordjs/util');
const { toSnakeCase } = require('../util/Transformers');
const { resolveColor } = require('../util/Util');

/**
 * Represents an embed builder.
 * @extends {BuildersEmbed}
 */
class EmbedBuilder extends BuildersEmbed {
  constructor(data) {
    super(toSnakeCase(data));
  }

  /**
   * Sets the color of this embed
   * @param {?ColorResolvable} color The color of the embed
   * @returns {EmbedBuilder}
   */
  setColor(color) {
    return super.setColor(color && resolveColor(color));
  }

  /**
   * Adds a field to the embed
   * @param name Name of the field
   * @param value Value of the field
   * @param {boolean} inline Whether or not this field should display inline
   * @returns {EmbedBuilder}
   */
  addField(name, value, inline) {
    var trim = (str, max) => {
      if (str.endsWith("```")) {
        return ((str.length > max) ? `${str.slice(0, max - 6)}\`\`\`...` : str);
      } else if (str.endsWith("`")) {
        return ((str.length > max) ? `${str.slice(0, max - 4)}\`...` : str);
      } else {
        return ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
      }
    };

    return super.addFields({ name: trim(name + "", 256), value: trim(value + "", 1024), inline });
  }

  /**
   * Creates a new embed builder from JSON data
   * @param {EmbedBuilder|Embed|APIEmbed} other The other data
   * @returns {EmbedBuilder}
   */
  static from(other) {
    return new this(isJSONEncodable(other) ? other.toJSON() : other);
  }
}

module.exports = EmbedBuilder;

/**
 * @external BuildersEmbed
 * @see {@link https://discord.js.org/docs/packages/builders/stable/EmbedBuilder:Class}
 */
