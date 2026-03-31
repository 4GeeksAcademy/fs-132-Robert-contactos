
const contactApi = {}
const url = 'https://playground.4geeks.com/contact'

contactApi.getUser = async () => {
    try {
        const resp = await fetch(url + '/agendas')
        if (!resp.ok) throw new Error('something no works')
        const data = await resp.json()
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}

contactApi.getAgenda = async () => {
    try {
        const resp = await fetch(url + '/agendas/Robert')
        console.log(resp.status)
        if (resp.status == 404) return contactApi.createAgenda();
        if (!resp.ok) throw new Error('something no works')
        const data = await resp.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

contactApi.createAgenda = async () => {
    try {
        const resp = await fetch(url + '/agendas/Robert', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!resp.ok) throw new Error('error to create agenda');
        const data = await resp.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

contactApi.createContact = async (newContact) => {
    try {
        const resp = await fetch(url+'/agendas/Robert/contacts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        })
        if (!resp.ok) throw new Error('error creating contact');
        const data = await resp.json();
        return data
    } catch (error) {
        console.log(error)
    }   
}

contactApi.editContact = async (id,contactInfo) => {
   try {
    const resp =await fetch(url+`/agendas/Robert/contacts/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...contactInfo,
            full_name: contactInfo.name || contactInfo.full_name
        })
    })
    if (!resp.ok) throw new Error('error to edit contact')
        return true
   } catch (error) {
    console.log(error)
   } 
}

contactApi.deleteContact = async (id) => {
    try {
        const resp = await fetch(url+'/agendas/Robert/contacts/'+id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
      if (!resp.ok) throw new Error('error to delete contact')
        return true
    } catch (error) {
    console.log(error)
    }
    
}

export default contactApi