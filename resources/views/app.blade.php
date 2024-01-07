<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia> Rental Car Services - Bénin | Location et achat de voitures moins chers. </title>
        <meta name="theme-color" content="#081c2f" />
        <meta name="robots" content="index, follow">
        <meta name="keywords" content="Location de voitures au Bénin,
        Voitures à louer pas cher, Voitures de location économiques, Vente de voitures au Bénin
        Voitures d'occasion à prix réduit,
        Location de véhicules à tarif compétitif,
        Offres spéciales de location de voitures,
        Voitures en vente à prix abordable,
        Location de voitures bon marché au Bénin, Achat de voitures au Bénin pas cher, Location de voiture à Cotonou
        ">
        <meta name="description" content="Nous vous proposon un service de location de voitures pour votre séjour, mais aussi l'achat de voitures d'occasion ou neuves au Bénin. Profitez de tarifs compétitifs pour la location de véhicules économiques et de ventes de voitures d'occasion à prix réduit. Trouvez des offres spéciales, des véhicules abordables et une large gamme de choix pour répondre à vos besoins en matière de déplacement au Bénin. Louez ou achetez des voitures au bon prix avec facilité et confiance.">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="Taf3dNpO5LvWf4NABQIYnxjDOuhkXOix3AgCVlpviPc" />
        <!--script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            
            ga('create', 'Taf3dNpO5LvWf4NABQIYnxjDOuhkXOix3AgCVlpviPc', 'auto');
            ga('send', 'pageview');
            </script-->
        <script>
            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
            ga('create', 'Taf3dNpO5LvWf4NABQIYnxjDOuhkXOix3AgCVlpviPc', 'auto');
        ga('send', 'pageview');
        </script>
        <script async src='https://www.google-analytics.com/analytics.js'></script>
        <!-- Scripts -->
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TX9G84WS');</script>
            <!-- End Google Tag Manager -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body className="font-sans antialiased">
        @inertia
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TX9G84WS"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
    </body>
</html>
