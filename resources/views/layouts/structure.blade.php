<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Loïc Lao-Pane">
    <meta name="keywords" content="">

    <title>Lokisalle - @yield('titre')</title>

    <link rel="icon" type="image/png" href="{{asset('img/favicon.png') }}" />

    <!-- Bootstrap Core CSS -->
    <link href="{{asset('dist/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{asset('dist/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="{{asset('dist/bootstrap/css/shop-homepage.css') }}" rel="stylesheet">
    <link href="{{asset('dist/jquery/css/jquery-ui.min.css') }}" rel="stylesheet">
    <link href="{{asset('styles/css/styles.css') }}" rel="stylesheet">
@yield('css')

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="{{asset('dist/jquery/js/jquery.js') }}"></script>
    <script src="{{asset('dist/jquery/js/jquery-ui.min.js') }}"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="{{asset('dist/bootstrap/js/bootstrap.min.js') }}"></script>
    <script src="{{asset('dist/dataTables/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{asset('dist/dataTables/js/dataTables.bootstrap.min.js') }}"></script>
    <script src="{{asset('js/script.js') }}"></script>


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>
<body>
    <!-- Navigation -->
    @yield('menu')
    <!-- Page Content -->
    <div class="container">
        <h1>@yield('titre')</h1>

        @yield('contenu')
    </div>

    <div class="container">
        <hr>
        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; Lokisalle 2017<?php if(date('Y')>2017) echo '-'.date('Y'); ?> - <a href="/mentions">Mentions légales</a> - <a href="/cgv">Conditions Générales de Vente</a> - Projet mené dans le cadre d'un atelier IFOCOP sans aucune vocation commerciale</p>
                    <div>@yield('w3c')</div>
                </div>
            </div>
        </footer>
    </div>

    @yield('script')
</body>

</html>
