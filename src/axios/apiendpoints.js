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
export const getAccounts = async () => {
  try {
    let user = await getSessionCache()
    return instance(`/accounts/customer/${user.name}`).then(r => {
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
      console.log(r);
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

export const getBeneficiarieByCustId = async () => {
  try {
    let user = await getSessionCache()
    return instance("/beneficiaries/" + user.name).then(r => {
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

const cache = {}; // Object to store cached account data

export const getTransactionByCustId = async (accountId, hardrefresh = false) => {
  try {
    let user = await getSessionCache()
    if (!hardrefresh && cache[accountId]) {
      return cache[accountId]; // Use cached data if available and hardrefresh is false
    }
    console.log(accountId);
    const response = await instance(accountId===-1?`/transactions/customer/${user.name}`:"/transactions/account/" + accountId).then(r => {
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