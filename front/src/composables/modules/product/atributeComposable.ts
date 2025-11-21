// composables/modules/product/atributeComposable.ts
import { ref, computed } from 'vue';
import { useApi } from '../../core/useApi';

// Estado global
const globalState = ref({
    showModalAtribute: false
});

export default function useAtribute() {
    const atributes = ref<any[]>([]);

    const { getData } = useApi();

    const getAtributes = async () => {
        const   { data } = await getData('atributes', {});
        atributes.value = data;
        
    }

    const showModalAtribute = computed({
        get: () => globalState.value.showModalAtribute,
        set: (value: boolean) => {
            globalState.value.showModalAtribute = value;
        }
    });

    const setShowModalAtribute = (value: boolean) => {
        globalState.value.showModalAtribute = value;
    };

    return {
        showModalAtribute,  // Computed
        setShowModalAtribute,
        getAtributes,
        atributes: computed(() => atributes.value)
    };
}