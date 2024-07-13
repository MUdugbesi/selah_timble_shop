
const timbleAppId = import.meta.env.VITE_TIMBLE_APP_ID
const timbleApiKey = import.meta.env.VITE_TIMBLE_API_KEY
const timbleOrgId = import.meta.env.VITE_TIMBLE_ORG_ID

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const handleApi = async () => {
    try {

        toast.info('Fetching products...', {
            autoClose: 8000,
            pauseOnHover: true,
            draggable: true,
            closeButton: true,
        });

        const response = await fetch(`https://timbu-get-all-products.reavdev.workers.dev/?organization_id=${timbleOrgId}&reverse_sort=false&Appid=${timbleAppId}&Apikey=${timbleApiKey}`);

        if (response.ok) {
            const data = await response.json();
            toast.success('Products fetched successfully!', {
                autoClose: false,
                pauseOnHover: true,
                draggable: true,
                closeButton: true,
            });
            return data.items;
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error fetching products:', error.message);
        toast.error(`Error fetching products: ${error.message}`, {
            autoClose: false,
            pauseOnHover: true,
            draggable: true,
            closeButton: true,
        });
        throw error;
    } finally {

        toast.dismiss();
    }
};




export const handleSalesApi = async (props) => {
    try {

        toast.info('Placing order data...', { autoClose: true });

        const response = await fetch(`https://api.timbu.cloud/sales?organization_id=${timbleOrgId}&Appid=${timbleAppId}&Apikey=${timbleApiKey}`, {
            method: 'POST',
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
        });

        if (response.ok) {
            toast.success('Order placed successfully!', {
                autoClose: false,
                pauseOnHover: true,
                draggable: true,
                closeButton: true,
            });
            return response.json();
        } else {
            throw new Error('Sales API request failed');
        }
    } catch (error) {
        console.error('Error placing order:', error.message);
        toast.error(`Error placing order: ${error.message}`, {
            autoClose: false,
            pauseOnHover: true,
            draggable: true,
            closeButton: true,
        });
        throw error;
    } finally {
        // Hide loading toast when done
        toast.dismiss({
            autoClose: false,
            pauseOnHover: true,
            draggable: true,
            closeButton: true,
        });
    }
};




