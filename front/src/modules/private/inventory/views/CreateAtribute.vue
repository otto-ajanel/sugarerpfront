<template>
  <div class="card flex justify-center">
    <Drawer
      v-model:visible="showModalAtribute"
      header="Crear atributo"
      class="!w-full md:!w-80 lg:!w-[30rem]"
      position="right"
    >
      <Form
        v-slot="$form"
        :initialValues ="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full  "
      >
        <div class="flex flex-col gap-1">
          <InputText name="atribute" type="text" placeholder="Atributo " fluid />
          <Message
            v-if="$form.atribute?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.atribute.error.message }}</Message
          >
        </div>
        <Button type="submit" raised label="Crear atributo" />
      </Form>
    </Drawer>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore
import { zodResolver } from "@primevue/forms/resolvers/zod";
import useAtribute from "../../../../composables/modules/product/atributeComposable";
import * as z from "zod";
const initialValues = ref({
  atribute: "",
});


const resolver = ref(
  zodResolver(
    z.object({
      atribute: z.string().min(1, { message: "Name of atribute is required." }),
    })
  )
);

async function onFormSubmit(values: any) {}
const { showModalAtribute, setShowModalAtribute } = useAtribute();
</script>