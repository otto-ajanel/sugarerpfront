<template>
  <div>
    <form @submit.prevent="saveProduct" class="space-y-4">
      <div class="card flex flex-wrap gap-4">
        <div class="relative w-124">
          <label class="block text-sm font-medium mb-1">Producto</label>

          <IconField>
            <InputIcon class="pi pi-box" />
            <InputText
              v-model="value1"
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
            v-model="pizza"
            inputId="ingredient1"
            name="pizza"
            value="venta"
          />
          <label for="ingredient1"> Venta </label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox
            v-model="pizza"
            inputId="ingredient2"
            name="pizza"
            value="Punto de venta"
          />
          <label for="ingredient2"> Punto de venta </label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox
            v-model="pizza"
            inputId="ingredient3"
            name="pizza"
            value="Compras"
          />
          <label for="ingredient3"> Compras </label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox
            v-model="pizza"
            inputId="ingredient4"
            name="pizza"
            value="Onion"
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
            <div class="flex flex">
              <div class="flex flex-col justyfy-center align-center gap-4">
                <div class="card flex justify-center">
                  <label class=""> Tipo de producto: </label>
                  <div class="flex flex-wrap gap-4">
                    <div class="flex items-center gap-2">
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
                <div>
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
                      { name: 'Paris', code: 'PRS' }
                    ]"
                    optionLabel="name"
                    filter
                    placeholder="Select Cities"
                    :maxSelectedLabels="3"
                    class="w-full md:w-80"
                  />
                </div>
                <div class="flex">
                  <label for="">Rastraer inventario:</label>
                  <Checkbox
                    v-model="pizza"
                    inputId="ingredient2"
                    name="pizza"
                    value="Punto de venta"
                  />
                </div>
              </div>
              <div class="flex flex-col">
                <div class="flex">
                  <label for="">Precio de venta</label>
                  <InputNumber
                    v-model="value1"
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    class="w-24rem"
                  />
                </div>
                <div class="flex">
                  <label for="">Inpuesto de venta</label>
                  <InputNumber
                    v-model="value1"
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    class="w-24rem"
                  />
                </div>
                <div class="flex">
                  <label for="">Impuesto de ventas</label>
                  <InputNumber
                    v-model="value1"
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    class="w-24rem"
                  />
                </div>
                <div class="flex">
                  <label for="">coste</label>
                  <InputNumber
                    v-model="value1"
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    class="w-24rem"
                  />
                </div>
                <div class="flex">
                  <label for="">Inpuesto de compra</label>
                  <InputNumber
                    v-model="value1"
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    class="w-24rem"
                  />
                </div>
                <div class="flex">
                  <label for="">Categoria</label>
                  <MultiSelect
                    v-model="value1"
                    :options="[]"
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Seleccione una categoría"
                    class="w-24rem" />
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

      <Button label="Limpiar" severity="" @click="showDialog = false" />
    </form>
    
    
  </div>
</template>

<script lang="ts" setup>

import { ref } from "vue";
const value1 = ref("");

const pizza = ref(null);

interface Category {
  id: number;
  name: string;
}

const ingredient = ref(null);

interface Product {
  name: string;
  code: string;
  category: Category | null;
  price: number | null;
  stock: number | null;
}

import { useToast } from "primevue/usetoast";
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

const categories = ref<Category[]>([
  { id: 1, name: "Electrónica" },
  { id: 2, name: "Ropa" },
  { id: 3, name: "Alimentos" },
]);

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