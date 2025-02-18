/* eslint-disable no-shadow */
/* istanbul ignore file */
import debug from 'debug';
import axios from 'axios';
import axiosDebug from 'axios-debug-log';

export const logWorkWithFiles = debug('page-loader: file-system %s');

const log = debug('page-loader');

axiosDebug({
  request(debug, config) {
    debug('Request with ', config);
    return config;
  },
  response(debug, response) {
    debug('Response with ', response);
    return response;
  },
  error(debug, error) {
    debug('Error with ', error);
    return Promise.reject(error);
  },
});

axiosDebug({
  request(debug, config) {
    debug('Request with ', config);
    return config;
  },
  response(debug, response) {
    debug('Response with ', response);
    return response;
  },
  error(debug, error) {
    debug('Error with ', error);
    return Promise.reject(error);
  },
});

axiosDebug({
  request(debug, config) {
    debug('Request with ', config);
    return config;
  },
  response(debug, response) {
    debug('Response with ', response);
    return response;
  },
  error(debug, error) {
    debug('Error with ', error);
    return Promise.reject(error);
  },
});

axiosDebug({
  request(debug, config) {
    debug('Request with ', config);
    return config;
  },
  response(debug, response) {
    debug('Response with ', response);
    return response;
  },
  error(debug, error) {
    debug('Error with ', error);
    return Promise.reject(error);
  },
});

axiosDebug({
  request(debug, config) {
    debug('Request with ', config);
    return config;
  },
  response(debug, response) {
    debug('Response with ', response);
    return response;
  },
  error(debug, error) {
    debug('Error with ', error);
    return Promise.reject(error);
  },
});

axiosDebug({
  request(debug, config) {
    debug('Request with ', config);
    return config;
  },
  response(debug, response) {
    debug('Response with ', response);
    return response;
  },
  error(debug, error) {
    debug('Error with ', error);
    return Promise.reject(error);
  },
});

export { log, axios };
