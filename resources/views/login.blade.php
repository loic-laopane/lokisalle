@extends('structure')
<div class="row">
  <div class="cols-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
{{--  {{ alerts }}--}}
	  <div class="panel panel-primary">
		  <div class="panel-heading">{{ //title }}</div>
		  <div class="panel-body">
		    <form action="/login/login" method="post">
		    <input type="hidden" name="referer" value="{{ referer }}">
			  <div class="form-group">
			    <label for="login">Identifiant</label>
			    <div class="input-group">
					<span class="input-group-addon"><i class="fa fa-user"></i></span>
			    	<input type="text" class="form-control" id="login" name="pseudo" placeholder="Identifiant" value="<?= //$pseudo; ?>">
			    	<span class="clear-field" data-target="#login"><i class="fa fa-times-circle"></i></span>
			    </div>
			  </div>
			  <div class="form-group">
			    <label for="password">Mot de passe</label>
			    <div class="input-group">
					<span class="input-group-addon"><i class="fa fa-lock"></i></span>
			    	<input type="password" class="form-control" id="password" name="password" placeholder="Mot de passe" value="<?= //$password ; ?>">
			    	<span class="clear-field" data-target="#password"><i class="fa fa-times-circle"></i></span>
			    </div>
			  </div>
			  <div class="checkbox">
			    <label>
			      <input type="checkbox" name="remember" {{ remember }}> Se souvenir de moi
			    </label>
			  </div>
			  <div class="form-group">
			  	<button type="submit" class="btn btn-primary">Connexion</button>
			  </div>
			  <p><small>Vous n'avez pas encore de compte ? <a href="/login/signup">Inscrivez-vous</a> dès maintenant.</small></p>
			</form>
		  </div>
	</div>
  </div>
</div>
{{ content }}