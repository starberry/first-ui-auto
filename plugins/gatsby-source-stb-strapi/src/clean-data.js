"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.cleanData = exports.cleanAttributes = void 0;
var _pick2 = _interopRequireDefault(require("lodash/pick"));
var _snakeCase2 = _interopRequireDefault(require("lodash/snakeCase"));
var _helpers = require("./helpers");
const MEDIA_FIELDS = ["name", "alternativeText", "caption", "width", "height", "formats", "hash", "ext", "mime", "size", "url", "previewUrl", "createdAt", "updatedAt"];
const restrictedFields = new Set(["__component", `children`, `fields`, `internal`, `parent`]);

/**
 * Removes the attribute key in the entire data.
 * @param {Object} attributes response from the API
 * @param {Object} currentSchema
 * @param {*} schemas
 * @returns
 */
const cleanAttributes = (attributes, currentSchema, schemas) => {
  if (!attributes) {
    return;
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  return Object.entries(attributes).reduce((accumulator, [name, value]) => {
    const attribute = currentSchema.schema.attributes[name];
    const attributeName = restrictedFields.has(name) ? (0, _snakeCase2.default)(`strapi_${name}`) : name;
    if (!(attribute !== null && attribute !== void 0 && attribute.type)) {
      accumulator[attributeName] = value;
      return accumulator;
    }

    // Changing the format in order to extract images from the richtext field
    // NOTE: We could add an option to disable the extraction
    if (attribute.type === "richtext") {
      return {
        ...accumulator,
        [attributeName]: {
          data: value || "",
          medias: []
        }
      };
    }
    if (!value) {
      accumulator[attributeName] = value;
      return accumulator;
    }
    if (attribute.type === "dynamiczone") {
      return {
        ...accumulator,
        [attributeName]: value.map(v => {
          const compoSchema = (0, _helpers.getContentTypeSchema)(schemas, v.__component);
          return cleanAttributes(v, compoSchema, schemas);
        })
      };
    }
    if (attribute.type === "component") {
      const isRepeatable = attribute.repeatable;
      const compoSchema = (0, _helpers.getContentTypeSchema)(schemas, attribute.component);
      if (isRepeatable) {
        return {
          ...accumulator,
          [attributeName]: value.map(v => {
            return cleanAttributes(v, compoSchema, schemas);
          })
        };
      }
      return {
        ...accumulator,
        [attributeName]: cleanAttributes(value, compoSchema, schemas)
      };
    }
    if (attribute.type === "media") {
      if (Array.isArray(value === null || value === void 0 ? void 0 : value.data)) {
        return {
          ...accumulator,
          [attributeName]: value.data ? value.data.map(({
            id,
            attributes
          }) => ({
            id,
            ...(0, _pick2.default)(attributes, MEDIA_FIELDS)
          })) : undefined
        };
      }
      return {
        ...accumulator,
        [attributeName]: value.data ? {
          id: value.data.id,
          ...(0, _pick2.default)(value.data.attributes, MEDIA_FIELDS)
        } : undefined
      };
    }
    if (attribute.type === "relation") {
      const relationSchema = (0, _helpers.getContentTypeSchema)(schemas, attribute.target);
      if (Array.isArray(value === null || value === void 0 ? void 0 : value.data)) {
        return {
          ...accumulator,
          [attributeName]: value.data.map(({
            id,
            attributes
          }) => cleanAttributes({
            id,
            ...attributes
          }, relationSchema, schemas))
        };
      }
      return {
        ...accumulator,
        [attributeName]: cleanAttributes(value.data ? {
          id: value.data.id,
          ...value.data.attributes
        } : undefined, relationSchema, schemas)
      };
    }
    accumulator[attributeName] = value;
    return accumulator;
  }, {});
};

/**
 * Transform v4 API response to the v3 format, remove data and attributes key
 * Transform richtext field to prepare media extraction
 * @param {Object} data
 * @param {Object} ctx
 * @returns {Object}
 */
exports.cleanAttributes = cleanAttributes;
const cleanData = ({
  id,
  attributes,
  ...rest
}, context) => {
  const {
    schemas,
    contentTypeUid
  } = context;
  const currentContentTypeSchema = (0, _helpers.getContentTypeSchema)(schemas, contentTypeUid);
  return {
    id,
    ...rest,
    ...cleanAttributes(attributes, currentContentTypeSchema, schemas)
  };
};
exports.cleanData = cleanData;