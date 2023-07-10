export const invokeFunctionWithinMilliseconds = (cb: ()=> void, timer=3500)=>{
    setTimeout(()=> cb(), timer);
}