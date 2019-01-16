import Ember from 'ember';

export default Ember.Component.extend({
    hideModal:false, 
    actions:{
        showModal(){
            this.toggleProperty('hideModal');
        }
    }
});
