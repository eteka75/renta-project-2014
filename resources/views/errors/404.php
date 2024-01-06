<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rental Car services </title>
    <!-- Inclure le CDN de Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="">
    <nav class="bg-gray-800 text-white py-6">
        <div class="text-3xl md:text-5xl text-center font-bold">Rental Car services</div>
        
    </nav>
    <section className="min-h-screen bg-black text-white py-44 ">
        <div className="py-8">

            <div class="max-w-screen-lg  py-20 mx-auto  grid grid-cols-1">
                <div>
                    <img src="./maintenance.png" alt="Maintenance" class="min-h-max px-10 mx-auto maintenance-image">

                </div>
                <div class=" items-center text-center ">
                    <div class="maintenance-container">
                        <h1 class="maintenance-header uppercase  text-4xl text-red-600 py-4 font-bold">Site en Maintenance</h1>
                        <p class="maintenance-message text-xl max-w-xl mx-auto">Nous effectuons actuellement des travaux de maintenance.
                           <br/> Nous serons de retour bientôt. </p>
                            <h2 class="text-2xl font-bold my-4">Merci de votre compréhension !</h2>
                    </div>
                </div>
            </div>
        </div>

        </section>

        <!-- Pied de Page -->
        <footer class="bg-gray-800 text-slate-400 py-6">
            <div class="container mx-auto text-center">
                <p>&copy; 2023 Rental Car services. Tous droits réservés.</p>
            </div>
        </footer>

</body>

</html>