<template>
    <div class="min-h-screen bg-gray-100">
        <nav class="bg-white shadow-sm border-b">
            <div class="container mx-auto px-6 py-4">
                <div class="flex gap-4">
                    <Link href="/" class="text-blue-600 hover:text-blue-800">Inicio</Link>
                    <Link href="/users" class="text-blue-600 hover:text-blue-800">Usuarios</Link>
                    <Link href="/users/create" class="text-blue-600 hover:text-blue-800">Crear Usuario</Link>
                </div>
            </div>
        </nav>

        <main class="py-8">
            <div class="container mx-auto px-6">
                <h1 class="text-3xl font-bold">Sistema de Usuarios</h1>
                <p class="mt-2 text-gray-600">Gestiona usuarios con Laravel + Inertia.js + Vue.js</p>
            </div>
        </main>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
</script>
