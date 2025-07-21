<template>
    <div class="container mx-auto p-6">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Lista de Usuarios</h1>
            <Link href="/users/create" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Nuevo Usuario
            </Link>
        </div>

        <div class="grid gap-6">
            <!-- Vista con datos de Inertia -->
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-semibold mb-4">Usuarios desde Inertia</h2>
                <div v-if="users.length === 0" class="text-gray-500">No hay usuarios</div>
                <div v-else class="space-y-3">
                    <div v-for="user in users" :key="user.id" class="border rounded p-3">
                        <div class="font-medium">{{ user.name }}</div>
                        <div class="text-gray-600">{{ user.email }}</div>
                        <div v-if="user.phone" class="text-gray-600">{{ user.phone }}</div>
                    </div>
                </div>
            </div>

            <!-- Vista con fetch -->
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-semibold mb-4">Usuarios desde API (Fetch)</h2>
                <button
                    @click="fetchUsers"
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
                    :disabled="loading"
                >
                    {{ loading ? 'Cargando...' : 'Cargar Usuarios' }}
                </button>

                <div v-if="apiUsers.length === 0" class="text-gray-500">Haz clic en "Cargar Usuarios"</div>
                <div v-else class="space-y-3">
                    <div v-for="user in apiUsers" :key="user.id" class="border rounded p-3">
                        <div class="font-medium">{{ user.name }}</div>
                        <div class="text-gray-600">{{ user.email }}</div>
                        <div v-if="user.phone" class="text-gray-600">{{ user.phone }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    users: Array
})

const apiUsers = ref([])
const loading = ref(false)

const fetchUsers = async () => {
    loading.value = true
    try {
        const response = await fetch('/api/users')
        apiUsers.value = await response.json()
    } catch (error) {
        console.error('Error al cargar usuarios:', error)
    } finally {
        loading.value = false
    }
}
</script>
