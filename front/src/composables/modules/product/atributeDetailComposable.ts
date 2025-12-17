import { ref, onMounted } from 'vue';
import { useApi } from '../../core/useApi';

export default function atributeDetailComposable() {
    const atributeDetails = ref<any[]>([]);
    const { getData, saveData } = useApi();

    const getAtributeDetails = async () => {
        try {
            const response = await getData('atributedetails',{});
            atributeDetails.value = response.data;
        }

        catch (error) {
            console.error('Error fetching atribute details:', error);
        }
    };

    onMounted(() => {
        getAtributeDetails();
    });


    return {
        atributeDetails,
        getAtributeDetails
    }
}