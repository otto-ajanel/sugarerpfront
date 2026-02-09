<template>
  <div class="cardn flex flex-row">
      <DataView :value="productsAviable" :layout="layout" class="w-5/8">
        <template #header>
          <div class="flex justify-end gap-3 ">
            <InputGroup>
              <InputText placeholder="Buscar producto..." />
              <InputGroupAddon>
                <Button
                  icon="pi pi-search"
                  severity="secondary"
                  variant="text"
                  @click="()=> {}"
                />
              </InputGroupAddon>
            </InputGroup>
             <MultiSelect v-model="selectedItems" :options="items" :maxSelectedLabels="3" :selectAll="selectAll" optionLabel="label" optionValue="value"
            @selectall-change="onSelectAllChange($event)" @change="onChange($event)" :virtualScrollerOptions="{ itemSize: 44 }" filter placeholder="selecciona categoria" class="w-full md:w-1/3" />
             <MultiSelect v-model="selectedItems" :options="items" :maxSelectedLabels="3" :selectAll="selectAll" optionLabel="label" optionValue="value"
            @selectall-change="onSelectAllChange($event)" @change="onChange($event)" :virtualScrollerOptions="{ itemSize: 44 }" filter placeholder="Seleciona atributo" class="w-full md:w-1/3" />
            <SelectButton
              v-model="layout"
              :options="options"
              :allowEmpty="false"
            >
              <template #option="{ option }">
                <i
                  :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']"
                />
              </template>
            </SelectButton>
          </div>
        </template>

        <template #list="slotProps">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div
                class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                :class="{ 'border-t border-surface': index !== 0 }"
              >
                <div class="md:w-40 relative">
                  <img
                    class="block xl:block mx-auto rounded w-full img-active"
                    :src="imageUrls[item.ProductId] || getImageProduct(item.ProductId)"
                    :alt="item.ProductDes"
                  />
                  <Tag
                    :value="item.InventoryStatus"
                    :severity="getSeverity(item)"
                    class="absolute dark:bg-surface-900!"
                    style="left: 4px; top: 4px"
                  ></Tag>
                </div>
                <div
                  class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
                >
                  <div
                    class="flex flex-row md:flex-col justify-between items-start gap-2"
                  >
                    <div>
                      <span
                        class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                        >{{ item.CategoryDes }}</span
                      >
                      <div class="text-lg font-medium mt-2">
                        {{ item.ProductDes }}
                      </div>
                    </div>
                    <div class="bg-surface-100 p-1" style="border-radius: 30px">
                      <div
                        class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                        style="
                          border-radius: 30px;
                          box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                            0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                        "
                      >
                        <span class="text-surface-900 font-medium text-sm">{{
                          item.rating
                        }}</span>
                        <i class="pi pi-star-fill text-yellow-500"></i>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col md:items-end gap-8">
                    <span class="text-xl font-semibold">Q{{ item.Price }}</span>
                    <div class="flex flex-row-reverse md:flex-row gap-2">
                      <Button icon="pi pi-heart" outlined></Button>
                      <Button
                        icon="pi pi-shopping-cart"
                        label="Add to Cart"
                        :disabled="item.InventoryStatus === 'OUTOFSTOCK'"
                        class="flex-auto md:flex-initial whitespace-nowrap"
                      ></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #grid="slotProps">
          <div class="grid grid-cols-12 gap-4">
            <div
              v-for="(item, index) in slotProps.items"
              :key="index"
              class="col-span-12 sm:col-span-6 lg:col-span-4 p-2"
            >
              <div
                class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
              >
                <div class="bg-surface-50 flex justify-center rounded p-4">
                  <div class="relative mx-auto">
                    <div style="max-width: 300px" class="w-full">
                      <img
                        v-if="!imageLoading[item.ProductId]"
                        class="rounded w-full img-active"
                        :src="imageUrls[item.ProductId] || getImageProduct(item.ProductId)"
                        :alt="item.ProductDes"
                        style="max-width: 300px"
                      />
                      <div v-else class="three-dots-loader flex items-center justify-center" style="height:200px">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                    <Tag
                      :value="item.InventoryStatus"
                      :severity="getSeverity(item)"
                      class="absolute dark:bg-surface-900!"
                      style="left: 4px; top: 4px"
                    ></Tag>
                  </div>
                </div>
                <div class="pt-6">
                  <div class="flex flex-row justify-between items-start gap-2">
                    <div>
                      <span
                        class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                        >{{ item.CategoryDes }}</span
                      >
                      <div class="text-lg font-medium mt-1">
                        {{ item.ProductDes }}
                      </div>
                    </div>
                    <div class="bg-surface-100 p-1" style="border-radius: 30px">
                      <div
                        class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                        style="
                          border-radius: 30px;
                          box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                            0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                        "
                      >
                        <span class="text-surface-900 font-medium text-sm">{{
                          item.rating
                        }}</span>
                        <i class="pi pi-star-fill text-yellow-500"></i>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-6 mt-6">
                    <span class="text-2xl font-semibold"
                      >Q{{ item.Price }}</span
                    >
                    <div class="flex gap-2">
                      <Button
                        icon="pi pi-shopping-cart"
                        label="Add to Cart"
                        :disabled="item.InventoryStatus === 'OUTOFSTOCK'"
                        class="flex-auto whitespace-nowrap"
                      ></Button>
                      <Button icon="pi pi-heart" outlined></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
      <AtributeVariant class="w-3/8"/>
    </div>

</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import AtributeVariant from "../../billing/pos/AtributeVariant.vue"
import useProductsAviable from "../../../../composables/modules/product/productAviableComposable";

const {productsAviable, getImageProduct, imageLoading, imageUrls} = useProductsAviable();

const selectedItems = ref();
const selectAll = ref(false);
const items = ref(Array.from({ length: 100000 }, (_, i) => ({ label: `Item #${i}`, value: i })));

const onSelectAllChange = (event:any) => {
    selectedItems.value = event.checked ? items.value.map((item) => item.value) : [];
    selectAll.value = event.checked;
};
const onChange = (event:any) => {
    selectAll.value = event.value.length === items.value.length;
}

/*
    {
      id: "1",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    }*/
   
const layout = ref("grid");
const options = ref(["list", "grid"]);

const getSeverity = (product: any) => {
  switch (product.InventoryStatus) {
    case "INSTOCK":
      return "success";

    case "LOWSTOCK":
      return "warn";

    case "OUTOFSTOCK":
      return "danger";

    default:
      return null;
  }
};
</script>
<style>
.card {
  background: var(--card-bg);
  border: var(--card-border);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
/* three dots loader */
.three-dots-loader {
  display: inline-block;
}
.three-dots-loader span {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 4px;
  background: rgba(0,0,0,0.45);
  border-radius: 50%;
  animation: three-dots 1s infinite ease-in-out;
}
.three-dots-loader span:nth-child(2) { animation-delay: 0.15s; }
.three-dots-loader span:nth-child(3) { animation-delay: 0.3s; }
@keyframes three-dots {
  0%, 80%, 100% { transform: scale(0); opacity: 0.3 }
  40% { transform: scale(1); opacity: 1 }
}

.img-active {
    animation: demo-dialog-in 500ms ease-out;
}

.image-leave-active {
    animation: demo-dialog-out 500ms ease-in;
}

@keyframes demo-dialog-in {
    from {
        opacity: 0;
        transform: translateY(-10%) scale(1.1);
        filter: blur(10px);
    }
}

@keyframes demo-dialog-out {
    to {
        opacity: 0;
        transform: translateY(200%) rotate(-90deg);
    }
}
</style>