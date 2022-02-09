export interface vistiDetails{
    vitalSigns: {
        height?:any;
        weight?:any;
        bloodPressure?:any;
        bodyTemp?:any;
        respirationRate?:any; 
      },
      diagnosis:{
        diagnosis?:any;
        description?:any;
        
    },
    procedure: {
      procedures?:any;
      description?:any;
    
    },
    medication: {
      drugID?:any;
      drugName?:any;
      drugGenName?:any;
      drugBrandName?:any;
      drugForm?:any;
      drugStrength?:any;
    },
  }