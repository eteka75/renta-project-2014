<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Resume</title>
</head>
<body>
<div>

    <div class=" mx-auto shadow-sm border bg-white max-w-screen-lg p-8">

        <div class="mb-4 ">
            
               
        </div>
        <div >FACTURE CLIENT N° {{ $num_facture }}</div>
        <div class="mb-8">
            <p><span >Client:</span> {{ $reservation->nom_complet }}</p>
            <p><span >Adresse:</span> {{ $reservation->adresse_residence }}
                {{ $reservation->ville_residence ? ', ' . $reservation->ville_residence : null }}</p>
            <p><span >Email:</span> {{ $reservation->email }}</p>
        </div>

       

        <div >
            Facture générée le {{ date('d/m/Y H\H:i:s', time()) }}
            <p >Merci de votre confiance!</p>

        </div>
    </div>
    </div>
</body>
</html>