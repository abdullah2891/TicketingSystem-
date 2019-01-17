import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    
    serialize(snapshot , options){
        let json = this._super(...arguments); 
        console.log(" updating and put serialize ");
        console.log(json);
        
        return json.data.attributes;  
    }
    
});
