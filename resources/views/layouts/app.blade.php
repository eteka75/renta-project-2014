<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#666666" />
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="refresh" content="0">
    <title>{{ config('app.name', 'Rental Car Services') }}</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon">
   

    <!-- Scripts -->
    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body>
        <div id="app"></div>       
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
