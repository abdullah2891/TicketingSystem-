import Ember from 'ember';

export function compareString(params/*, hash*/) {
    if(params.length===3){
        return params[0] !== params[1];    
    }
    return params[0] === params[1];
}

export default Ember.Helper.helper(compareString);
