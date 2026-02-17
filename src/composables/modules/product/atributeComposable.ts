// composables/modules/product/atributeComposable.ts
import { ref, computed } from 'vue';
import { useApi } from '../../core/useApi';


const globalState = ref({
    showModalAtribute: false
    , showModalAtributeDet: false
});

export default function useAtribute() {
    const atributes = ref<any[]>([]);

    const { getData, saveData } = useApi();

    const getAtributes = async () => {
        const { data } = await getData('atributes', {});
        atributes.value = data;

    }

    const showModalAtribute = computed({
        get: () => globalState.value.showModalAtribute,
        set: (value: boolean) => {
            globalState.value.showModalAtribute = value;
        }
    });
    const showModalAtributeDet = computed({
        get: () => globalState.value.showModalAtributeDet,
        set: (value: boolean) => {
            globalState.value.showModalAtributeDet = value;
        }
    });

    const setShowModalAtribute = (value: boolean) => {
        globalState.value.showModalAtribute = value;
    };
    const setShowModalAtributeDet = (value: boolean) => {
        globalState.value.showModalAtributeDet = value;
    };

    const createAtribute = async (atributeData: any) => {
        const { data } = await saveData('atributes', atributeData);
        if (data) {
            await getAtributes()
            globalState.value.showModalAtribute = false;

        }

    }

    return {
        showModalAtribute,  // Computed
        setShowModalAtribute,
        showModalAtributeDet,
        getAtributes,
        setShowModalAtributeDet,
        atributes: computed(() => atributes.value),
        createAtribute
    };
}