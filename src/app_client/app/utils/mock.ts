

export function mock(constr, name?) {
        const keys = [];
        for ( const key of Object.keys(constr) ) {
          keys.push( key );
        }
        const result = keys.length > 0 ? jasmine.createSpyObj( name || 'mock', keys ) : {};
        result.jasmineToString = function() { return 'mock' + ( name ? ' of ' + name : '' ); };
        return result;
  };

