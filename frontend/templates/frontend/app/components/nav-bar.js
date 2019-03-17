import Ember from 'ember';
const {inject } = Ember;


export default Ember.Component.extend({
    authService: inject.service(),
    actions:{
       logout(){
           this.get('authService').createCookie('token','');
           window.open('/','_self');
       }
    }
});
