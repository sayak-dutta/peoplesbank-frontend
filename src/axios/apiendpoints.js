import { getSession } from "next-auth/react"
import instance from "./instance"
//Customers

let user = {}
const getSessionCache = async () => {
  if (user?.name) {
    return user
  }
  let tmp = await getSession()
  user = tmp.user
  return tmp.user
}
export const loginRequest = async (email) => {
  try {
    return instance.post("/customers/login", email).then(r => {
      return r.data
    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }
}
export const signupRequest = async (email) => {
  try {
    return instance.post("/customers", email).then(r => {
      return r.data
    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }

}
export const updateCustomer = async ({ email, name }, customerId) => {
  try {
    return instance.put("/customers/" + customerId, { email, name }).then(r => {
      console.log(r);
      return r.data
    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }

}
export const delCustomer = async (id) => {
  try {
    return instance.delete("/customers/" + id).then(r => {
      console.log(r);
      return r.data
    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }

}

//Accounts
/* accounts = {accountNumber,balance}*/
export const createAccounts = async (accounts, id = null) => {
  try {
    console.log(accounts, id);
    return instance.post(`/accounts/${id ? id : 1}`, accounts).then(r => {
      console.log(r);
      return r.data
    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }

}
export const createAccountsV2 = async (accounts) => {
  try {
    let user = await getSessionCache()
    return instance.post(`/accounts/${user?.name}`, accounts).then(r => {
      console.log(r);
      return r.data
    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }

}

let oldAcc={}
export const getAccounts = async (id=null) => {
  try {
    let user = await getSessionCache()
    return instance(`/accounts/customer/${id?id:user.name}`).then(r => {
      return r.data
    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }

}

//Benficiery
/* beneficery = {accountNumber,balance}*/
export const addBeneficiaries = async (accounts) => {
  try {
    let user = await getSessionCache()
    return instance.post("/beneficiaries/" + user.name, accounts).then(r => {
      return r.data
    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }

}

export const editBeneficiaries = async (accounts,id) => {
  try {
    let user = await getSessionCache()
    return instance.put("/beneficiaries/" + id, accounts).then(r => {
      return r.data
    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }
}

export const deleteBeneficiaries = async (id) => {
  console.log(id);
  try {
    let user = await getSessionCache()
    return instance.delete("/beneficiaries/" + id).then(r => {
      return r.data
    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }
}

export const getBeneficiarieByCustId = async (id=null) => {
  try {
    let user = await getSessionCache()
    return instance(`/beneficiaries/${id?+id:+user.name}`).then(r => {
      return r.data

    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }

}
export const transferMoney = async (data) => {
  try {
    let user = await getSessionCache()
    return instance.post("/transactions/transfer", {...data}).then(r => {
      return r.data
    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }

}
export const depositeMoney = async (amont, aid) => {
  try {
    // let user = await getSessionCache()
    return instance.post(`/accounts/deposit/${aid}?amount=${amont}`).then(r => {
      return r.data
    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }

}

let allCs=null
export const getAllCustomer = async () => {
  try {
    if(allCs){
      return allCs
    }
    return instance(`/customers`).then(r => {
      allCs = r.data
      return r.data
      
    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }

}
export const getCustomerDetail = async (id) => {
  try {
    return instance(`/customers/${id}`).then(r => {
      return r.data

    }).catch(r => {
      return r.response.data
    })
  } catch (err) {
    return { code: 0, message: err.message }
  }

}

const cache = {}; // Object to store cached account data

export const getTransactionByCustId = async (accountId, hardrefresh = false,id=0) => {
  try {
    let user = await getSessionCache()
    if (!hardrefresh && cache[accountId]) {
      return cache[accountId]; // Use cached data if available and hardrefresh is false
    }
    const response = await instance(accountId===-1?`/transactions/customer/${id?id:user?.name}`:"/transactions/account/" + accountId).then(r => {
      return r.data;
    }).catch(r => {
      return r.response.data;
    });

    cache[accountId] = response; // Cache the response for future use
    return response;
  } catch (err) {
    return { code: 0, message: err.message };
  }
};