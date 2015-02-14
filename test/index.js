var nysiis = require( '..' )
var assert = require( 'assert' )

describe( 'NYSIIS', function() {
  
  it( 'Single letter', function() {
    assert.equal( nysiis( 'a' ), 'A' )
  })
  
  it( 'Single letter repeated', function() {
    assert.equal( nysiis( 'aaaaaaabbbbbkkkkkkk' ), 'AABC' )
  })
  
  it( 'Strips digits', function() {
    assert.equal( nysiis( 'Hello123Hello' ), 'HALAHA' )
    assert.equal( nysiis( 'Hello123Hello', false ), 'HALAHAL' )
  })
  
  it( 'This is not my name', function() {
    assert.equal( nysiis( 'This is not my name' ), 'THASAS' )
  })
  
  it( 'This is not my name (no truncate)', function() {
    assert.equal( nysiis( 'This is not my name', false ), 'THASASNATNYNAN' )
  })
  
})
