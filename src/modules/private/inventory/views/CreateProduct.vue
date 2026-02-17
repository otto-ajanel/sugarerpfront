<template>
  <div>
    <form @submit.prevent="saveProduct" class="space-y-4">
      <div class="card flex flex-wrap gap-4">
        <div class="relative w-124">
          <label class="block text-sm font-medium mb-1">Producto</label>

          <IconField>
            <InputIcon class="pi pi-box" />
            <InputText
              v-model="formProduct.nameProduct"
              placeholder="Eje. Nintendo Wii"
              size="large"
              fluid
            />
          </IconField>
        </div>

        <div class="card flex flex-col gap-4"></div>
      </div>

      <div class="card flex flex-wrap justify-center gap-4">
        <div class="flex items-center gap-2">
          <Checkbox
            v-model="formProduct.enableFor.sale"
            inputId="sale"
            binary
          />
          <label for="sale"> Venta </label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox v-model="formProduct.enableFor.pos" inputId="pos" binary />
          <label for="ingredient2"> Punto de venta </label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox
            v-model="formProduct.enableFor.purchase"
            inputId="ingredient3"
            binary
          />
          <label for="ingredient3"> Compras </label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox
            v-model="formProduct.enableFor.others"
            inputId="ingredient4"
            binary
          />
          <label for="ingredient4"> Otros... </label>
        </div>
      </div>

      <Tabs value="0">
        <TabList>
          <Tab value="0" class="flex items-center gap-2">
            <Avatar icon="pi pi-id-card" />
            <span class="font-bold whitespace-nowrap">Información general</span>
          </Tab>
          <Tab value="1" class="flex items-center gap-2">
            <Avatar icon="pi pi-info-circle" class="" />
            <span class="font-bold whitespace-nowrap">Atributos variantes</span>
          </Tab>
        
          <Tab value="3" class="flex items-center gap-2">
            <Avatar icon="pi pi-wallet" class="mr-2" />
            <span class="font-bold whitespace-nowrap">Imagenes</span>
            <Badge value="2" />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <div class="flex flex w-full justify-evenly gap-8">
              <div class="flex flex-col justyfy-center align-center gap-4">
                <div class="card flex w-full justify-between">
                  <label class=""> Tipo de producto: </label>
                  <div class="flex flex-wrap gap-4">
                    <div class="flex items-center gap-2 ml-4">
                      <RadioButton
                        v-model="formProduct.typeproduct"
                        inputId="ingredient1"
                        :value="1"
                      />
                      <label for="ingredient1">Bienes</label>
                    </div>
                    <div class="flex items-center gap-2">
                      <RadioButton
                        v-model="formProduct.typeproduct"
                        inputId="ingredient2"
                        :value="2"
                      />
                      <label for="ingredient2">Servicios</label>
                    </div>
                    <div class="flex items-center gap-2">
                      <RadioButton
                        v-model="formProduct.typeproduct"
                        inputId="ingredient3"
                        :value="3"
                      />
                      <label for="ingredient3">Combos</label>
                    </div>
                  </div>
                </div>
                <div class="flex w-full justify-between align-center">
                  <label for="" class="text-primary"
                    >Politicas de facturación:</label
                  >
                  <Select
                    v-model="formProduct.billingPolicy"
                    :options="[
                      { name: 'Solicitados', code: 1 },
                      { name: 'Entregados', code: 2 },
                    ]"
                    optionLabel="name"
                    filter
                    placeholder="Select politica facturación"
                    :maxSelectedLabels="3"
                    class="w-1/2"
                  />
                </div>
                <div class="flex w-full justify-between align-center">
                  <label for="">Rastrar inventario:</label>
                  <Checkbox
                    class="w-1/2"
                    v-model="formProduct.trackInventory"
                    inputId="ingredient2"
                    binary
                  />
                </div>
                <div class="flex w-full justify-between">
                  <label for="">Codigo de barra/ QR</label>
                  <InputText v-model="formProduct.barcode" class="w-24rem" />
                </div>
                <div class="flex w-full justify-between">
                  <label for=""> Imagen de codigo de barra / QR </label>
                </div>
                <div class="flex justify-center items-center h-24" >
                  <svg 
                  class="h-24"
                  ref="barcode" v-if="formProduct.barcode.toString().trim().length > 0"></svg>

                </div>
                <!-- <img v-if="qrcode" :src="qrcode" alt="QR Code" /> -->

              </div>
              <div class="flex flex-col gap-4">
                <div class="flex w-full justify-between">
                  <label for="">Precio de venta</label>
                  <InputNumber
                    v-model="formProduct.salePrice"
                    mode="currency"
                    currency="GTQ"
                    locale="en-GT"
                    class="w-24rem"
                  />
                </div>

                <div class="flex w-full justify-between">
                  <label for="">Impuesto de ventas</label>
                  <InputNumber
                    v-model="formProduct.taxsale"
                    mode="currency"
                    currency="GTQ"
                    locale="en-GT"
                    class="w-24rem"
                  />
                </div>
                <div class="flex w-full justify-between">
                  <label for="">Costo</label>
                  <InputNumber
                    v-model="formProduct.costPrice"
                    mode="currency"
                    currency="GTQ"
                    locale="en-GT"
                    class="w-24rem"
                  />
                </div>
                <div class="flex w-full justify-between">
                  <label for="">Impuesto de compra </label>
                  <InputNumber
                    v-model="formProduct.taxpurchase"
                    mode="currency"
                    currency="GTQ"
                    locale="en-GT"
                    class="w-24rem"
                  />
                </div>
                <div class="flex w-full justify-between">
                  <label for="">Categoria</label>
                  <Select
                    v-model="formProduct.categoryId"
                    :options="categories"
                    optionLabel="name"
                    placeholder="Select a Category"
                    class="w-full md:w-56"
                  >
                    <template #value="slotProps">
                      <div v-if="slotProps.value" class="flex items-center">
                        <img
                          :alt="slotProps.value.label"
                          src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                          :class="`mr-2 flag flag-${slotProps.value.code
                            .toString()
                            .toLowerCase()}`"
                          style="width: 18px"
                        />
                        <div>{{ slotProps.value.name }}</div>
                      </div>
                      <span v-else>
                        {{ slotProps.placeholder }}
                      </span>
                    </template>
                    <template #option="slotProps">
                      <div class="flex items-center">
                        <img
                          :alt="slotProps.option.label"
                          src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                          :class="`mr-2 flag flag-${slotProps.option.code
                            .toString()
                            .toLowerCase()}`"
                          style="width: 18px"
                        />
                        <div>{{ slotProps.option.name }}</div>
                      </div>
                    </template>
                    <template #dropdownicon>
                      <i class="pi pi-map" />
                    </template>
                    <template #header>
                      <div class="font-medium p-3">Aviable categories</div>
                    </template>
                    <template #footer>
                      <div class="p-3">
                        <Button
                          @click="activemodal()"
                          label="Add New"
                          fluid
                          severity="secondary"
                          variant="text"
                          size="small"
                          icon="pi pi-plus"
                        />
                      </div>
                    </template>
                  </Select>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <AtributeVariant :setAtributeVariants="setAtributeVariants" />
          </TabPanel>
          
          <TabPanel value="3">
            <FileUpload
              name="demo[]"
              :multiple="true"
              :showUploadButton="false"
              accept="image/*"
              :maxFileSize="1000000"
              @select="uploadfiles"
            >
              <template #empty>
                <span>Drag and drop files to here to upload.</span>
              </template>
            </FileUpload>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button label="Guardar" severity="" type="submit" />
    </form>
    <Category />
    <Toast />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, defineAsyncComponent } from "vue";
import bwipjs from "bwip-js";
import { useProduct } from "../../../../composables/modules/product/productComposable";
import useCategory from "../../../../composables/modules/product/categoryComposable";
import { uiStore } from "../../../../stores/uiStore";
import { useToast } from "primevue/usetoast";

const  AtributeVariant = defineAsyncComponent(
  () => import("./AtributeVariant.vue")
);
const  Category = defineAsyncComponent(() => import("./Category.vue"));

const { formProduct, fnCreateProduct, setFilesForm, setAtributeVariants } = useProduct();

const { categories, getAllCategories } = useCategory();
const { fnShowModalCategory } = uiStore();
getAllCategories();

function activemodal() {
  fnShowModalCategory(true);
}

const barcodeText = ref(formProduct.barcode);

watch(
  () => formProduct.barcode,
  (newBarcode) => {
    barcodeText.value = newBarcode.trim().length > 0 ? newBarcode : "";
  }
);

useToast();

function saveProduct() {
  
  fnCreateProduct();
}

const barcode = ref<SVGSVGElement | null>(null);

const generateBarcode = () => {
  if (barcode.value && formProduct.barcode) {
      const svg = bwipjs.toSVG({
    bcid: 'code128',
    text: formProduct.barcode.toString().trim(),
    scale: 3,
    height:6,
    includetext: true,
    textxalign: 'center',
  });
  barcode.value.innerHTML = svg;

  }
};

// Regenerar cuando cambie el dato
watch(()=>formProduct.barcode, generateBarcode);

// Generar inicialmente
onMounted(generateBarcode);

function uploadfiles(event: any) {
  
  setFilesForm(event.files);
}
</script>

<style scoped>
.img-upload {
  width: 80px;
  height: 80px;
}
</style>