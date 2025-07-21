<template>
    <div class="container mx-auto p-6">
        <h1 class="text-2xl font-bold mb-6">Crear Usuario</h1>

        <form @submit.prevent="submit" class="max-w-md">
            <div class="mb-4">
                <label class="block text-sm font-medium mb-2">Nombre</label>
                <input
                    v-model="form.name"
                    type="text"
                    class="w-full border rounded px-3 py-2"
                    :class="{ 'border-red-500': errors.name }"
                    required
                >
                <div v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name.toString() }}</div>
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium mb-2">Email</label>
                <input
                    v-model="form.email"
                    type="email"
                    class="w-full border rounded px-3 py-2"
                    :class="{ 'border-red-500': errors.email }"
                    required
                >
                <div v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email.toString() }}</div>
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium mb-2">Contraseña</label>
                <input
                    v-model="form.password"
                    type="password"
                    class="w-full border rounded px-3 py-2"
                    :class="{ 'border-red-500': errors.password }"
                    required
                >
                <div v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password.toString() }}</div>
            </div>

            <div class="flex gap-3">
                <button
                    type="submit"
                    :disabled="form.processing"
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {{ form.processing ? 'Creando...' : 'Crear Usuario' }}
                </button>

                <Link href="/users" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                    Cancelar
                </Link>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'

const form = useForm({
    name: '',
    email: '',
    password: '',
})

defineProps({
    errors: Object
})

const submit = () => {
    form.post('/users')
}
</script>
