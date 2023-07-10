<template>
    <section class="add-user">
        <SectionHeader
            :redirectLink="redirectLink"
            :redirectText="redirectText"
            :title="title"
            >
            <template #header-icon>
                <Icon name="fa-solid:users" />
            </template>
        </SectionHeader>
        <UserForm 
        :handleUserFormSubmit="handleCreateUserSubmit"
        :validationSchema="userCreateFormData"
        :isLoading="isCreatingUser"
        :isCreatingUser="true"
        :initialValues="initialValues"
        :isEditingUser="false"
        />
    </section>
</template>
<script setup lang="ts">
    import { hasPhotoFileError } from "~/utils/hasPhotoFileError"
    import { userCreateFormData } from "~/validations";
    import { ICreateUserFormData } from "~/types/user"
    import { createUser } from "~/api/user";
    
    const redirectLink = "/users";
    const redirectText="Go Back To Users";
    const title = "Create a New User"

    const isCreatingUser = ref(false);
    const {$toast} = useNuxtApp();

    const initialValues = {
        'user-photo': "",
        name: "",
        email: "",
        phoneNumber: "",
        role: "",
    }
          
    const handleCreateUserSubmit = async (values: ICreateUserFormData)=>{
        const formData = new FormData();
        const error = hasPhotoFileError(values["user-photo"]);
        
        if(error){
            $toast.error(error)
        } else {
            if(values["user-photo"]){
                formData.append("user-photo", values["user-photo"]);
            }
        }
        

        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("password", values.password);
        formData.append("role", values.role);
         
        (async ()=>{
            try {
                isCreatingUser.value = true;
                await createUser(formData);
                isCreatingUser.value = false;
                navigateTo("/users");
            }catch(err: any){
                if(err.response.data?.errors){
                    $toast.error(err.response.data.errors)    
                }
                isCreatingUser.value = false;
            }
        })()         
    }
</script>
<style scoped>
.add-user__form-box {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>