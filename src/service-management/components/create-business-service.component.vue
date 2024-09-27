<script>

  export default {
    name: "create-business-service.component",
    data(){
      return {
        serviceName: null,
        price: null,
        description: null,
        selectedCategory: null,
        categories: [
          {name: 'Category 1', cname: 'Category 1'},
          {name: 'Category 2', cname: 'Category 2'},
          {name: 'Category 3', cname: 'Category 3'}
        ]
      }
    },
    methods: {
      upload() {
        this.$refs.fileupload.upload();
      },
      onUpload() {
        this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
      }
    }
  }
</script>

<template>
  <div style="margin-top: 40px">
    <div class="grid nested-grid">
      <div class="col-4">
        <div class="grid">
          <div class="col-12">
            <pv-card class="w-20rem p-5 custom-card-1">
              <template #header>
                <div>
                  <i class="pi pi-credit-card" style="font-size: 5rem"/>
                </div>
                <p style="font-weight: bold">Work at the speed</p>
              </template>
              <template #content style="padding: 0">
                <p>The gradual accumulation of information about atomic and small-scale behaviour.</p>
              </template>
              <template #footer>
                <pv-button icon="pi pi-angle-right"
                           icon-pos="right"
                           label="Learn More"
                           severity="secondary"
                           class="bg-white-alpha-10"
                           style="color: #37123C"/>
              </template>
            </pv-card>
          </div>
          <div class="col-12">
            <pv-card class="w-20rem p-5 custom-card-2">
              <template #header>
                <div>
                  <i class="pi pi-credit-card" style="font-size: 5rem"/>
                </div>
                <p>Work at the speed</p>
              </template>
              <template #content>
                <p>The gradual accumulation of information about atomic and small-scale behaviour.</p>
              </template>
              <template #footer>
                <pv-button icon="pi pi-angle-right"
                           icon-pos="right"
                           label="Learn More"
                           severity="secondary"
                           class="bg-white-alpha-10"
                           style="color: #37123C"/>
              </template>
            </pv-card>
          </div>
        </div>
      </div>
      <div class="col-8">
        <pv-card class="w-auto p-5 custom-card-3 bg-gray-50">
          <template #header>
            <div>
              <h2 style="font-family: 'Tajawal', sans-serif; font-weight: normal; font-size: 3rem; margin-top: 0; margin-bottom: 10px">Create your category</h2>
            </div>
          </template>
          <template #content>
            <div style="text-align: left">
              <h2 style="font-weight: normal;">Service Name</h2>
              <pv-input-text type="text" v-model="serviceName" placeholder="Name your service" style="width: 100%" class="custom-text-input"/>
            </div>
            <div style="text-align: left">
              <h2 style="font-weight: normal;">Categories</h2>
              <pv-cascade-select v-model="selectedCategory" :options="categories" optionLabel="cname" optionGroupLabel="name"
                                 optionGroupChildren="children" placeholder="Select a category" style="width: 100%" class="custom-cascade-select"
              />
            </div>
            <div style="text-align: left">
              <h2 style="font-weight: normal;">Upload</h2>
              <div class="card flex flex-col gap-6 items-center justify-center">
                <pv-toast/>
                <pv-file-upload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" />
                <pv-button label="Upload" @click="upload" severity="secondary" />
              </div>
            </div>
            <div style="text-align: left">
              <h2 style="font-weight: normal;">Price</h2>
              <pv-input-number v-model="price" inputId="currency-us" :min="0" mode="currency" currency="USD" locale="en-US" fluid
                                placeholder="Set a price for your service"/>
            </div>
            <div style="text-align: left">
              <h2 style="font-weight: normal;">Description</h2>
              <pv-textarea v-model="description" rows="10" cols="75" style="background-color: white; color: black" placeholder="Add a description for your service."/>
            </div>
          </template>
          <template #footer>
            <pv-button label="Create Service" class="mt-5" style="background-color: #37123C; color: white"/>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .custom-card-1{
    font-family: 'Montserrat', sans-serif;
    color: #37123C;
    background: #D5CAF0;
  }
  .custom-card-2{
    font-family: 'Montserrat', sans-serif;
    color: #37123C;
    background: #D9D9D9;
  }

  .custom-card-3{
    font-family: 'Montserrat', sans-serif;
    color: #37123C;
  }

  .custom-text-input{
    background-color: #ffffff;
  }

  .custom-cascade-select {
    background-color: #ffffff;
  }

</style>