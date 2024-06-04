import { getSession } from "next-auth/react"
import instance from "./instance"
//Customers

let user = {}
const getSessionCache= async()=>{
    if(user?.name){
        return user
    }
    let tmp = await getSession()
    user = tmp.user
    return tmp.user
}
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
export const signupRequest =async(email,password,name)=>{
  try{
      return instance.post("/customers",{email,password,name}).then(r=>{
      console.log(r);
      return r.data
    }).catch(r=>{
      return r.response.data
    })
  }catch(err){
      return {code:0,message:err.message}
  }

}
export const updateCustomer =async({email,name},customerId)=>{
  try{
    return instance.put("/customers/"+customerId,{email,name}).then(r=>{
      console.log(r);
      return r.data
    }).catch(r=>{
      return r.response.data
    })
  }catch(err){
    return {code:0,message:err.message}
  }
  
}
export const delCustomer =async(id)=>{
  try{
    return instance.delete("/customers/"+id).then(r=>{
      console.log(r);
      return r.data
    }).catch(r=>{
      return r.response.data
    })
  }catch(err){
    return {code:0,message:err.message}
  }
  
}

//Accounts
/* accounts = {accountNumber,balance}*/
export const createAccounts =async(accounts)=>{
  try{
      let user = await getSessionCache()
      return instance.post("/accounts/"+user.name,accounts).then(r=>{
      console.log(r);
      return r.data
    }).catch(r=>{
      return r.response.data
    })
  }catch(err){
      return {code:0,message:err.message}
  }

}

//Benficiery
/* beneficery = {accountNumber,balance}*/
export const addBeneficiaries =async(accounts)=>{
  try{
      let user = await getSessionCache()
      return instance.post("/add/beneficiaries/"+user.name,accounts).then(r=>{
      console.log(r);
      return r.data
    }).catch(r=>{
      return r.response.data
    })
  }catch(err){
      return {code:0,message:err.message}
  }

}
export const getBeneficiarieByCustId =async()=>{
  try{
      let user = await getSessionCache()
      return instance("/beneficiaries/"+user.name).then(r=>{
      return r.data
    }).catch(r=>{
      return r.response.data
    })
  }catch(err){
      return {code:0,message:err.message}
  }

}

