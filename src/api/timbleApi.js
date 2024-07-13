
const timbleAppId = import.meta.env.VITE_TIMBLE_APP_ID
const timbleApiKey = import.meta.env.VITE_TIMBLE_API_KEY
const timbleOrgId = import.meta.env.VITE_TIMBLE_ORG_ID


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Your existing code for handleApi and handleSalesApi...

export const handleApi = async () => {
    try {
        // Displaying loading toast
        toast.info('Fetching products...', { autoClose: false });

        const response = await fetch(`https://timbu-get-all-products.reavdev.workers.dev/?organization_id=${timbleOrgId}&reverse_sort=false&Appid=${timbleAppId}&Apikey=${timbleApiKey}`);

        if (response.ok) {
            const data = await response.json();
            toast.success('Products fetched successfully!');
            return data.items;
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error fetching products:', error.message);
        toast.error(`Error fetching products: ${error.message}`);
        throw error; // Propagate the error for handling at a higher level
    } finally {
        // Hide loading toast when done
        toast.dismiss();
    }
};

export const handleSalesApi = async (props) => {
    try {
        // Displaying loading toast
        toast.info('Posting sales data...', { autoClose: false });

        const response = await fetch(`/api/sales?organization_id=${timbleOrgId}&Appid=${timbleAppId}&Apikey=${timbleApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
        });

        if (response.ok) {
            toast.success('Sales data posted successfully!');
            return response.json(); // Return parsed JSON response
        } else {
            throw new Error('Sales API request failed');
        }
    } catch (error) {
        console.error('Error posting sales data:', error.message);
        toast.error(`Error posting sales data: ${error.message}`);
        throw error; // Propagate the error for handling at a higher level
    } finally {
        // Hide loading toast when done
        toast.dismiss();
    }
};




