<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia> Rental Car Services - Bénin | Location et achat de voitures moins chers. </title>
        <meta name="theme-color" content="#15181f" />
        <meta name="robots" content="index, follow">
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <meta name="keywords" content="Location de voitures au Bénin,
        Voitures à louer pas cher, Voitures de location économiques, Vente de voitures au Bénin
        Voitures d'occasion à prix réduit,
        Location de véhicules à tarif compétitif,
        Offres spéciales de location de voitures,
        Voitures en vente à prix abordable,
        Location de voitures bon marché au Bénin, Achat de voitures au Bénin pas cher, Location de voiture à Cotonou
        ">
        <link rel="icon" href="{{ asset('logo-rcs.png') }}" type="image/png">
  
        <meta name="description" content="Nous mettons à votre disposition un service de location de voitures pour votre séjour, ainsi qu'un service d'achat de voitures d'occasion ou neuves au Bénin. Bénéficiez de tarifs avantageux pour la location de véhicules économiques et l'achat de voitures d'occasion à prix réduit. Explorez des offres spéciales, des véhicules abordables et un large éventail de choix pour répondre à vos besoins de déplacement au Bénin. Trouvez facilement et en toute confiance une voiture à louer ou à acheter au meilleur prix.">
        
        <meta property="og:title" content="{{ isset($page_title)?$page_title:"Rental Car Services - Louez ou achetez la voiture de vos rêves !"}}">
        <meta property="og:image" content="logo-rcs.png">
        <meta property="og:description" content="{{ isset($description)?$description:"Profitez de tarifs compétitifs pour la location de véhicules économiques et de ventes de voitures d'occasion à prix réduit. Trouvez des offres spéciales, des véhicules abordables et une large gamme de choix pour répondre à vos besoins en matière de déplacement au Bénin. Louez ou achetez des voitures au bon prix avec facilité et confiance." }}">
        <meta property="og:url" content="{{ Request::url() }}">
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&display=swap" rel="stylesheet">
        <meta name="google-site-verification" content="Taf3dNpO5LvWf4NABQIYnxjDOuhkXOix3AgCVlpviPc" />
        <link rel="canonical" href="{{ Request::url() }}"/>
        <!--link async href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.bunny.net">
        <script>
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
    <body >
        @inertia
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TX9G84WS"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
    </body>
</html>
