"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.fetchStrapiContentTypes = exports.fetchEntity = exports.fetchEntities = void 0;
var _flattenDeep2 = _interopRequireDefault(require("lodash/flattenDeep"));
var _castArray2 = _interopRequireDefault(require("lodash/castArray"));
var _qs = _interopRequireDefault(require("qs"));
var _cleanData = require("./clean-data");
const fetchStrapiContentTypes = async axiosInstance => {
  const [{
    data: {
      data: contentTypes
    }
  }, {
    data: {
      data: components
    }
  }] = await Promise.all([axiosInstance.get("/api/content-type-builder/content-types"), axiosInstance.get("/api/content-type-builder/components")]);
  return {
    schemas: [...contentTypes, ...components],
    contentTypes,
    components
  };
};
exports.fetchStrapiContentTypes = fetchStrapiContentTypes;
const fetchEntity = async ({
  endpoint,
  queryParams,
  uid,
  pluginOptions
}, context) => {
  const {
    reporter,
    axiosInstance
  } = context;

  /** @type AxiosRequestConfig */
  const options = {
    method: "GET",
    url: endpoint,
    params: queryParams,
    // Source: https://github.com/axios/axios/issues/5058#issuecomment-1379970592
    paramsSerializer: {
      serialize: parameters => _qs.default.stringify(parameters, {
        encodeValuesOnly: true
      })
    }
  };
  try {
    var _pluginOptions$i18n;
    reporter.info(`Starting to fetch data from Strapi - ${options.url} with ${options.paramsSerializer.serialize(options.params)}`);

    // Handle internationalization
    const locale = pluginOptions === null || pluginOptions === void 0 ? void 0 : (_pluginOptions$i18n = pluginOptions.i18n) === null || _pluginOptions$i18n === void 0 ? void 0 : _pluginOptions$i18n.locale;
    const otherLocales = [];
    if (locale) {
      // Ignore queryParams locale in favor of pluginOptions
      delete queryParams.locale;
      if (locale === "all") {
        // Get all available locales
        const {
          data: response
        } = await axiosInstance({
          ...options,
          params: {
            populate: {
              localizations: {
                fields: ["locale"]
              }
            }
          }
        });
        for (const localization of response.data.attributes.localizations.data) {
          otherLocales.push(localization.attributes.locale);
        }
      } else {
        // Only one locale
        queryParams.locale = locale;
      }
    }

    // Fetch default entity based on request options
    const {
      data
    } = await axiosInstance(options);

    // Fetch other localizations of this entry if there are any
    const otherLocalizationsPromises = otherLocales.map(async locale => {
      const {
        data: localizationResponse
      } = await axiosInstance({
        ...options,
        params: {
          ...options.params,
          locale
        }
      });
      return localizationResponse.data;
    });

    // Run queries in parallel
    const otherLocalizationsData = await Promise.all(otherLocalizationsPromises);
    return (0, _castArray2.default)([data.data, ...otherLocalizationsData]).map(entry => (0, _cleanData.cleanData)(entry, {
      ...context,
      contentTypeUid: uid
    }));
  } catch (error) {
    if (error.response.status !== 404) {
      reporter.panic(`Failed to fetch data from Strapi ${options.url} with ${JSON.stringify(options)}`, error);
    }
    return [];
  }
};
exports.fetchEntity = fetchEntity;
const fetchEntities = async ({
  endpoint,
  queryParams,
  uid,
  pluginOptions
}, context) => {
  var _pluginOptions$i18n2;
  const {
    reporter,
    axiosInstance
  } = context;

  /** @type AxiosRequestConfig */
  const options = {
    method: "GET",
    url: endpoint,
    params: queryParams,
    paramsSerializer: {
      serialize: parameters => _qs.default.stringify(parameters, {
        encodeValuesOnly: true
      })
    }
  };

  // Use locale from pluginOptions if it's defined
  if (pluginOptions !== null && pluginOptions !== void 0 && (_pluginOptions$i18n2 = pluginOptions.i18n) !== null && _pluginOptions$i18n2 !== void 0 && _pluginOptions$i18n2.locale) {
    delete queryParams.locale;
    queryParams.locale = pluginOptions.i18n.locale;
  }
  try {
    reporter.info(`Starting to fetch data from Strapi - ${options.url} with ${options.paramsSerializer.serialize(options.params)}`);
    const {
      data: response
    } = await axiosInstance(options);
    const data = (response === null || response === void 0 ? void 0 : response.data) || response;
    const meta = response === null || response === void 0 ? void 0 : response.meta;
    const page = Number.parseInt((meta === null || meta === void 0 ? void 0 : meta.pagination.page) || 1, 10);
    const pageCount = Number.parseInt((meta === null || meta === void 0 ? void 0 : meta.pagination.pageCount) || 1, 10);
    const pagesToGet = Array.from({
      length: pageCount - page
    }).map((_, index) => index + page + 1);
    const fetchPagesPromises = pagesToGet.map(page => {
      return (async () => {
        const fetchOptions = {
          ...options,
          params: {
            ...options.params,
            pagination: {
              ...options.params.pagination,
              page
            }
          }
        };
        reporter.info(`Starting to fetch page ${page} from Strapi - ${fetchOptions.url} with ${options.paramsSerializer.serialize(fetchOptions.params)}`);
        try {
          const {
            data: {
              data
            }
          } = await axiosInstance(fetchOptions);
          return data;
        } catch (error) {
          reporter.panic(`Failed to fetch data from Strapi ${fetchOptions.url}`, error);
        }
      })();
    });
    const results = await Promise.all(fetchPagesPromises);
    const cleanedData = [...data, ...(0, _flattenDeep2.default)(results)].map(entry => (0, _cleanData.cleanData)(entry, {
      ...context,
      contentTypeUid: uid
    }));
    return cleanedData;
  } catch (error) {
    reporter.panic(`Failed to fetch data from Strapi ${options.url}`, error);
    return [];
  }
};
exports.fetchEntities = fetchEntities;