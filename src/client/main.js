// @flow

import App from './App';


import $ from 'jquery';
window.jQuery = $;
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css')
require('bootstrap/dist/css/bootstrap-theme.css')
require('./style.styl')

// let div = document.getElementById('container')
let app = new App(document.body);
