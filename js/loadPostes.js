function loadPostes(Query, QueryTask, map, layers, rotulos){
    
    var entregas = "";
    for (let index = 0; index < rotulos.length; index++) {
       
        (index == rotulos.length-1) ? entregas = entregas + `rotulo  = '${rotulos[index]}'` :  entregas = entregas + `rotulo  = '${rotulos[index]}' or `;
        
    }

    var promise = new Promise((resolve,reject)=>{
    
        var qTaskInterruptions = new QueryTask(layers.pole_layer);
        var qInterruptions = new Query();
        qInterruptions.returnGeometry = false;
        qInterruptions.outFields=["*"];
        qInterruptions.where = entregas;
        
        qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
       
            if(!featureSet.features.length){
                reject([]);
            }
        
            resolve(featureSet.features)
                
            }, (Errorq)=>{
              console.log(Errorq,"Error doing query for rotulos");
              reject([]);
            });
          
          
    });
        
    return promise;
    
}