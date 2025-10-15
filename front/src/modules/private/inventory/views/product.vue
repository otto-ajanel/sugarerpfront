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
          <Tab value="2" class="flex items-center gap-2">
            <Avatar icon="pi pi-wallet" class="mr-2" />
            <span class="font-bold whitespace-nowrap">Precio en venta</span>
            <Badge value="2" />
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
                        v-model="ingredient"
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                      />
                      <label for="ingredient1">Bienes</label>
                    </div>
                    <div class="flex items-center gap-2">
                      <RadioButton
                        v-model="ingredient"
                        inputId="ingredient2"
                        name="pizza"
                        value="Mushroom"
                      />
                      <label for="ingredient2">Servicios</label>
                    </div>
                    <div class="flex items-center gap-2">
                      <RadioButton
                        v-model="ingredient"
                        inputId="ingredient3"
                        name="pizza"
                        value="Pepper"
                      />
                      <label for="ingredient3">Combinación</label>
                    </div>
                  </div>
                </div>
                <div class="flex w-full justify-between align-center">
                  <label for="" class="text-primary"
                    >Politicas de facturación:</label
                  >
                  <MultiSelect
                    name="city"
                    :options="[
                      { name: 'New York', code: 'NY' },
                      { name: 'Rome', code: 'RM' },
                      { name: 'London', code: 'LDN' },
                      { name: 'Istanbul', code: 'IST' },
                      { name: 'Paris', code: 'PRS' },
                    ]"
                    optionLabel="name"
                    filter
                    placeholder="Select Cities"
                    :maxSelectedLabels="3"
                    class="w-1/2"
                  />
                </div>
                <div class="flex w-full justify-between align-center">
                  <label for="">Rastrar inventario:</label>
                  <Checkbox
                    class="w-1/2"
                    v-model="pizza"
                    inputId="ingredient2"
                    name="pizza"
                    value="Punto de venta"
                  />
                </div>
                <div class="flex w-full justify-between">
                  <label for="">Codigo de barra</label>
                  <InputText
                    v-model="value1"
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    class="w-24rem"
                  />
                </div>
                <div class="flex">
                  <label for=""> Imagen de codigo de barra </label>
                </div>
              </div>
              <div class="flex flex-col gap-4">
                <div class="flex w-full justify-between">
                  <label for="">Precio de venta</label>
                  <InputNumber
                    v-model="value1"
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    class="w-24rem"
                  />
                </div>
                <div class="flex w-full justify-between">
                  <label for="">Inpuesto de venta</label>
                  <InputNumber
                    v-model="value1"
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    class="w-24rem"
                  />
                </div>
                <div class="flex w-full justify-between">
                  <label for="">Impuesto de ventas</label>
                  <InputNumber
                    v-model="value1"
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    class="w-24rem"
                  />
                </div>
                <div class="flex w-full justify-between">
                  <label for="">coste</label>
                  <InputNumber
                    v-model="value1"
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    class="w-24rem"
                  />
                </div>
                <div class="flex w-full justify-between">
                  <label for="">Inpuesto de compra</label>
                  <InputNumber
                    v-model="value1"
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    class="w-24rem"
                  />
                </div>
                <div class="flex w-full justify-between">
                  <label for="">Categoria</label>
                  <Select
                    v-model="formProduct.categoryId"
                    :options="categories"
                    optionLabel="name"
                    placeholder="Select a Country"
                    class="w-full md:w-56"
                  >
                    <template #value="slotProps">
                      <div v-if="slotProps.value" class="flex items-center">
                        <img
                          :alt="slotProps.value.label"
                          src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                          :class="`mr-2 flag flag-${slotProps.value.code.toString().toLowerCase()}`"
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
                          :class="`mr-2 flag flag-${slotProps.option.code.toString().toLowerCase()}`"
                          style="width: 18px"
                        />
                        <div>{{ slotProps.option.name }}</div>
                      </div>
                    </template>
                    <template #dropdownicon>
                      <i class="pi pi-map" />
                    </template>
                    <template #header>
                      <div class="font-medium p-3">Available Countries</div>
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
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
              velit, sed quia non numquam eius modi.
            </p>
          </TabPanel>
          <TabPanel value="2" as="p" class="m-0">
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </TabPanel>
          <TabPanel value="3">
            <FileUpload
              name="demo[]"
              url="/api/upload"
              :multiple="true"
              accept="image/*"
              :maxFileSize="1000000"
            >
              <template #empty>
                <span>Drag and drop files to here to upload.</span>
              </template>
            </FileUpload>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button label="Guardar" severity="" @click="showDialog = false" />
    </form>
    <Category/>
    <Toast />

  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useProduct } from "../../../../composables/modules/product/productComposable";
import useCategory from "../../../../composables/modules/product/categoryComposable";
import { uiStore } from "../../../../stores/uiStore";

const { formProduct } = useProduct();
import Category from "./Category.vue";

const { categories, getAllCategories } = useCategory();
const { fnShowModalCategory } = uiStore();
getAllCategories();

function activemodal(){
  
  fnShowModalCategory(true)
  
}


const pizza = ref(null);

const value1 = ref(null);


const ingredient = ref(null);

interface Product {
  name: string;
  code: string;
  category:  null;
  price: number | null;
  stock: number | null;
}
const tost = useToast();
 function showCreateCategory(){
  
  tost.add({severity:'info', summary: 'Info', detail:'You have clicked the button', life: 3000});  
};

import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
const toast = useToast();
const inputFile = ref(null);

const upload = () => {
  const nativeInput =
    inputFile.value.$el?.querySelector("input") || inputFile.value.$el; // Fallback to $el if it's the input itself

  if (nativeInput) {
    nativeInput.click();
  } else {
    console.error("Native input element not found");
  }
};

const onUpload = () => {
  toast.add({
    severity: "info",
    summary: "Success",
    detail: "File Uploaded",
    life: 3000,
  });
};

const showDialog = ref(false);



const product = ref<Product>({
  name: "",
  code: "",
  category: null,
  price: null,
  stock: null,
});

function saveProduct() {
  // Aquí va la lógica para guardar el producto
  showDialog.value = false;
  // Resetear el formulario si lo deseas
}
</script>

<style scoped>
.img-upload {
  width: 80px;
  height: 80px;
  background-image: url("@/assets/images/placeholder.png");
}
</style>