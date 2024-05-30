import instance from "./instance"

export const loginRequest =async(email,password)=>{
    try{
        return instance.post("",{email,password}).then(r=>{
        console.log(r);
        return r.data
      }).catch(r=>{
        return r.response.data
      })
    }catch(err){
        return {code:0,message:err.message}
    }
}
export const sigunRequest =async(email,password)=>{

}