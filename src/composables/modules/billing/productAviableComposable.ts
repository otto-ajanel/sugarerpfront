import { onMounted, ref } from "vue";
import { useApi } from "../../core/useApi";

export default function useProductsAviable() {
    const productsAviable = ref<any>([]);
    const { getData, getImage } = useApi();
    const getProductsAviable = async () => {
        const { data } = await getData('productsaviable', {});
        productsAviable.value = data.products
    }
    onMounted(() => {
        getProductsAviable();
    });

    const imageUrls = ref<Record<number, string>>({});
    const imageLoading = ref<Record<number, boolean>>({});
    const defaultImage = 'oaLogo.png';

    const fetchImage = async (product_id: number) => {
        if (imageUrls.value[product_id]) return;
        imageLoading.value[product_id] = true;
        try {
            const resp = await getImage(`getimageproduct`, { product_id });
            const blob: any = resp?.data ?? resp;

            if (!(blob instanceof Blob) || blob.size === 0) {
                console.warn('Blob inválido o vacío para producto:', product_id);
                imageUrls.value[product_id] = defaultImage;
                return;
            }

            if (!blob.type || !blob.type.startsWith('image/')) {
                console.warn('No es una imagen, tipo:', blob.type);
                imageUrls.value[product_id] = defaultImage;
                return;
            }

            const objectUrl = URL.createObjectURL(blob);
            imageUrls.value[product_id] = objectUrl;
        } catch (error) {
            console.error('Error fetching image:', error);
            imageUrls.value[product_id] = defaultImage;
        }
        finally {
            imageLoading.value[product_id] = false;
        }
    };

    const getImageProduct = (product_id: number): string => {
        const existing = imageUrls.value[product_id];
        if (existing) return existing;
        // start loading in background, and return default immediately
        void fetchImage(product_id);
        return defaultImage;
    };

    return {
        productsAviable,
        getImageProduct,
        imageUrls,
        imageLoading
    };
}