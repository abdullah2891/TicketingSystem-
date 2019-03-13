import DS from 'ember-data';
import Ember from 'ember';

const {inject} = Ember;


export default DS.RESTAdapter.extend({
    authService: inject.service(),

    namespace: "api",
    headers :{
        "Accept" : "application/json"
    }, 
    authorizer: 'authorizer:token',

    ajaxOptions(url,type,options){
        console.log(this.get('authService.token'));
        options.headers = Object.assign({
            Authorization: `Token ${this.get('authService.token')}`
        },options.headers);
        return this._super(url, type, options);
    }
    
});
