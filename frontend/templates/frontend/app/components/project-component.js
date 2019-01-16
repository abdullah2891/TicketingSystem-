import Ember from 'ember';

export default Ember.Component.extend({
    
    
    actions:{
        jumpToIssue(){
            console.log("clicking");
            let router = this.get('router');
            console.log(router);
            router.transitionToRoute('issues');
            
            
        }
    }
});
