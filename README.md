# NYSIIS (New York State Identification and Intelligence System) Phonetic Code
[![npm](http://img.shields.io/npm/v/nysiis-phonetics.svg?style=flat-square)](https://npmjs.com/nysiis-phonetics)
[![npm downloads](http://img.shields.io/npm/dm/nysiis-phonetics.svg?style=flat-square)](https://npmjs.com/nysiis-phonetics)
[![build status](http://img.shields.io/travis/jhermsmeier/node-nysiis-phonetics.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-nysiis-phonetics)

## Install via [npm](https://npmjs.com)

```sh
$ npm install nysiis-phonetics
```

## About

The **New York State Identification and Intelligence System** Phonetic Code, commonly known as **NYSIIS**, is a phonetic algorithm devised in 1970 as part of the New York State Identification and Intelligence System (now a part of the New York State Division of Criminal Justice Services). It features an accuracy increase of 2.7% over the traditional Soundex algorithm.

See [Wikipedia](https://en.wikipedia.org/wiki/New_York_State_Identification_and_Intelligence_System)

## Usage

```js
var nysiis = require( 'nysiis-phonetics' )
```

## API

#### `nysiis( value, [truncate] ) -> String`

- **String** value
- **Boolean** truncate, defaults to `true`
