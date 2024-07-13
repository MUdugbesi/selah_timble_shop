
const timbleAppId = import.meta.env.VITE_TIMBLE_APP_ID
const timbleApiKey = import.meta.env.VITE_TIMBLE_API_KEY
const timbleOrgId = import.meta.env.VITE_TIMBLE_ORG_ID


export const handleApi = async () => {
    try {
        const response = await fetch(`/api/products?organization_id=${timbleOrgId}&reverse_sort=false&Appid=${timbleAppId}&Apikey=${timbleApiKey}`)

        if (response.ok) {
            const data = await response.json();
            return data.items;
        } else {
            throw new Error('Network response was not ok');
        }

    } catch (e) {
        console.error(e.message)
    }

}

export const handleSalesApi = async (props) => {
    try {
        const response = await fetch(`/api/sales?organization_id=${timbleOrgId}&Appid=${timbleAppId}&Apikey=${timbleApiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify(props)
        });

        console.log(response)

    } catch (e) {
        console.log(e)
    }
}



