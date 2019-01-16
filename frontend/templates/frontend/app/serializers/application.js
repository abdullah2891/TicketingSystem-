import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    
    normalizeResponse(store, type, payload){
        console.log(payload);
        let modifiedPayload =  payload instanceof Array ? 
            payload.map(function(object){
                return {
                    "id" :  object.id, 
                    "type" : type.modelName, 
                    "attributes" : object
                };
            }): {"id" :  payload.id, "type" : type.modelName, "attributes" : payload};
        
        return {"data" :  modifiedPayload };
    },
    
    serialize(snapshot , options){
        let json = this._super(...arguments); 
        console.log(" updating and put serialize ");
        console.log(json);
        
        return json.data.attributes;  
    }
    
});
