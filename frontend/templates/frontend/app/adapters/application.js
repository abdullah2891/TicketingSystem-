import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    namespace: "api",
    headers :{
        "Accept" : "application/json"
    }, 
    authorizer: 'authorizer:token'
});
