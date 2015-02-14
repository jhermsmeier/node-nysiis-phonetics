/**
 * NYSIIS phonetic code algorithm
 * @param  {String}  s
 * @param  {Boolean} truncate
 * @return {String}  code
 */
function nysiis( s, truncate ) {
  
  truncate = truncate != null ?
    truncate : true
  
  // Ensure string & uppercase
  s = ( s + '' ).toUpperCase()
  
  s = nysiis.run( s, nysiis.rules.normalize )
  s = nysiis.run( s, nysiis.rules.prefix )
  s = nysiis.run( s, nysiis.rules.suffix )
  
  // Save first char for later;
  // to be used as first char of key
  var firstChar = s[0]
  s = s.substring( 1 )
  
  s = nysiis.run( s, nysiis.rules.replace )
  s = firstChar + s
  
  // Technically, the NYSIIS code is truncated to 6 chars,
  // but some use the full code, so it's an option here
  return truncate && s.length > 6 ?
    s.substring( 0, 6 ) : s
  
}

/**
 * Runs a set of rules against given string
 * @param  {String} s
 * @param  {Array}  rules
 * @return {String} result
 */
nysiis.run = function( s, rules ) {
  
  for( var i = 0; i < rules.length; i++ ) {
    s = s.replace(
      rules[i].pattern,
      rules[i].value
    )
  }
  
  return s
  
}

/**
 * NYSIIS Rule sets
 * @type {Object}
 */
nysiis.rules = {
  // PREPROCESSING
  normalize: [
    // Trim whitespace
    { pattern: /\s+/g, value: '' },
    // Remove all non-alpha chars
    { pattern: /[^A-Z]+/g, value: '' },
  ],
  // STAGE 1: Transcode first characters
  prefix: [
    // MAC -> MCC
    { pattern: /^MAC/, value: 'MCC' },
    // KN -> NN
    { pattern: /^KN/, value: 'NN' },
    // K -> C
    { pattern: /^K/, value: 'C' },
    // PH|PF -> FF
    { pattern: /^PH|^PF/, value: 'FF' },
    // SCH -> SSS
    { pattern: /^SCH/, value: 'SSS' },
  ],
  // STAGE 2: Transcode two-character suffix
  suffix: [
    // EE|IE -> Y
    { pattern: /EE$|IE$/, value: 'Y' },
    // DT|RT|RD|NT|ND -> D
    { pattern: /DT$|RT$|RD$|NT$|ND$/, value: 'D' },
  ],
  // STAGE 3: Transcode remaining characters
  replace: [
    // EV -> AF
    { pattern: /EV/g, value: 'AF' },
    // A,E,I,O,U -> A
    { pattern: /[AEIOU]+/g, value: 'A' },
    // Q -> G
    { pattern: /Q/g, value: 'G' },
    // Z -> S
    { pattern: /Z/g, value: 'S' },
    // M -> N
    { pattern: /M/g, value: 'N' },
    // KN -> N
    { pattern: /KN/g, value: 'N' },
    // K -> C
    { pattern: /K/g, value: 'C' },
    // SCH -> SSS
    { pattern: /SCH/g, value: 'SSS' },
    // PH -> FF
    { pattern: /PH/g, value: 'FF' },
    // H ->  If previous or next is nonvowel, previous
    { pattern: /([^AEIOU])H/g, value: '$1' },
    { pattern: /(.)H[^AEIOU]/g, value: '$1' },
    // If previous is vowel, previous
    { pattern: /[AEIOU]W/g, value: 'A' },
    // Trim trailing S
    { pattern: /S$/, value: '' },
    // AY -> Y
    { pattern: /AY$/, value: 'Y' },
    // Trim trailing A
    { pattern: /A$/, value: '' },
    // Collapse all strings of repeated characters
    { pattern: /[AEIOU]+/g, value: 'A' },
    { pattern: /([B-Z])\1+/g, value: '$1' },
  ],
}

// Exports
module.exports = nysiis
