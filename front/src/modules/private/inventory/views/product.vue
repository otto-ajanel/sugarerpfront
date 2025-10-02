<template>
  <div>
    <form @submit.prevent="saveProduct" class="space-y-4">
      <div class="card flex flex-wrap justify-center gap-4">
        <div class="relative">
          <label class="block text-sm font-medium mb-1">Nombre producto</label>

          <IconField>
            <InputIcon class="pi pi-user" />
            <InputText v-model="value1" placeholder="user" />
          </IconField>
        </div>
        <div class="card flex flex-col justify-center items-end gap-4">
          <br/>
        <FloatLabel >
          <Textarea
            id="over_label"
            v-model="value1"
            rows="5"
            cols="35"
            style="resize: none"
          />
          <label for="over_label">Over Label</label>
        </FloatLabel>
        </div>

        <div>
          <div class="flex flex-col w-full">
            <Avatar
              @click="upload"
              size="xlarge"
              icon="pi pi-image"
              class="w-10 h-10 border-2 text-2xl border-surface-300 dark:border-surface-700 img-upload"
            />

            <div class="card flex flex-wrap gap-6 items-center justify-between">
              <InputText
                type="file"
                ref="inputFile"
                icon="pi pi-image"
                style="display: none"
                label="Subir imagen"
                >Subir
              </InputText>
            </div>
          </div>
        </div>
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
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <div class="flex flex-col justify-center items-center">
              <label> Tipo de producto </label>
              <div class="card flex justify-center">
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
                    <label for="ingredient3">Combinación+</label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <FileUpload
                name="demo[]"
                url="/api/upload"
                :multiple="false"
                accept="image/*"
                :maxFileSize="1000000"
              >
                <template #empty>
                  <span>Drag and drop files to here to upload.</span>
                </template>
              </FileUpload>
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
          <TabPanel value="2">
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
        </TabPanels>
      </Tabs>

      <Button
        label="Limpiar"
        severity="secondary"
        @click="showDialog = false"
      />

      <Button class="ml-8" label="Guardar" type="submit" />
    </form>
  </div>
</template>

<script lang="ts" setup>
import Avatar from "@/volt/Avatar.vue";
import Badge from "@/volt/Badge.vue";
import Tabs from "@/volt/Tabs.vue";
import TabList from "@/volt/TabList.vue";
import Tab from "@/volt/Tab.vue";
import TabPanels from "@/volt/TabPanels.vue";
import TabPanel from "@/volt/TabPanel.vue";
import { ref } from "vue";
import Button from "@/volt/Button.vue";
import Dialog from "@/volt/dialog.vue";

import Select from "@/volt/Select.vue";

const pizza = ref(null);

interface Category {
  id: number;
  name: string;
}
import RadioButton from "@/volt/RadioButton.vue";

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