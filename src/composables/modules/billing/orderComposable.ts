import { reactive, ref } from "vue";

export default function orderComposable() {
      const detailOrder = ref<any[]>([]);


    return{
        detailOrder
    }
}
