<template>
    <table>
        <thead>
            <tr>
                <!-- Ajouter colonnes nom, taille, type, tags, actions -->
                <th>Nom</th>
                <th>Taille</th>
                <th>Type</th>
                <th>Tags</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ file.name }}</td>
                <td>{{ file.size }}</td>
                <td>{{ file.type }}</td>
                <td>{{ file.tags }}</td>
                <td>
                    <button class="btn btn-primary">Télécharger</button>
                    <button class="btn btn-danger">Supprimer</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'FilesTable',
}
</script>