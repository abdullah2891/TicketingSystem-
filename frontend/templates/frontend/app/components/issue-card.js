import Ember from 'ember';

export default Ember.Component.extend({
    store : Ember.inject.service(),
    issues(){
        var issue = this.get('store').findAll('issue');
        console.log(issue);
        return issue;
    }, 
    actions:{
        updateIssue : function(id){
            var store = this.get('store'); 
            // linked list to change status
            var statusChange = {
                    "open" : "working", 
                    "working" : "closed", 
                    "closed" : "open"
            };
            
            store.find('issue',id).then(function(issue){
                var status = issue.get('status'); 
                console.log(status) ; 
                issue.set('status', statusChange[status]); 
                issue.save().then(function(response){
                    console.log(response);
                })
            });
            
            
            console.log("clicked",id);
        }, 
        deleteIssue : function(id){
            var store = this.get('store'); 
            console.log("delete clcked");
            store.find('issue',id).then(function(issue){
                issue.destroyRecord();
            });
            
            
        }
    }
});
