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
        const token= this.get('authService.token') || this.get('authService').readCookie('token');

        options = Object.assign({
                headers : {
                    Authorization: `Token ${token}`
                }
        },options);


        return this._super(url, type, options);
    }
    
});
