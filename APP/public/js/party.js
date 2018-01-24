(function() {
        
        /**
         * Obtains parameters from the hash of the URL
         * @return Object
         */
        function getHashParams() {
            
            var hashParams = {};
            var e, r = /([^&;=]+)=?([^&;]*)/g,
                q = window.location.hash.substring(1);
            while ( e = r.exec(q)) {
                hashParams[e[1]] = decodeURIComponent(e[2]);
              }
              return hashParams;
            }
          
          var url = window.location.href;
            
          var current_id = 0; 
          
          var feature_danceability;
          var feature_key;
          var feature_energy;
          var feature_loundness;
          var feature_mode;
          var feature_speechiness; 
          var feature_acousticness;
          var feature_instrumentalness;
          var feature_liveness;
          var feature_valence;
          var feature_tempo;
                
                
          var artist;
          var song;
                
          var isPlaying = true;
          
       /*   
        var userProfileSource = document.getElementById('user-profile-template').innerHTML,
            userProfileTemplate = Handlebars.compile(userProfileSource),
            userProfilePlaceholder = document.getElementById('user-profile');
            */
/*
        var oauthSource = document.getElementById('oauth-template').innerHTML,
            oauthTemplate = Handlebars.compile(oauthSource),
            oauthPlaceholder = document.getElementById('oauth');
*/
        var params = getHashParams();
        console.log(getHashParams());
    
        var access_token = params.access_token,
            refresh_token = params.refresh_token,
            error = params.error;

        if (error) {
          alert('There was an error during the authentication');
        } else {
          if (access_token) {
            // render oauth info
   /*         oauthPlaceholder.innerHTML = oauthTemplate({
              access_token: access_token,
              refresh_token: refresh_token 
            }); */
              
            sessionStorage.accTok = access_token;
              
            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                  'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                  //userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                    //console.log(access_token);
                    //console.log(response);
                    
                    if(response.images.length === 0){
                        console.log('nuuuuull');
                        $('img#userImage').attr('src', 'icon/hi.svg');
                    }
                    else {
                        $('img#userImage').attr('src', response.images[0].url);
                    }
                    
                    initplayer();
                    update();
                }
            });
          } else {
              // render initial screen
             /* $('#loginSection').show();
              $('#loggedin').hide();
              */
          }
        }
            
          function initplayer(){
              $.ajax({
                    url: 'https://api.spotify.com/v1/me/player',
                    headers: {
                      'Authorization': 'Bearer ' + access_token
                    },
                    success: function(response) {
                       /* $('#login').hide();
                        $('.container').hide();
                        $('.layers').show();
                        $('#functions_layer').show();*/
                        
                        console.log(response.item.artists[0].name + ' – ' + response.item.name + ' *** ' + response.item.id + ' || ' + response.is_playing);

                                artist = response.item.artists[0].name;
                                song = response.item.name;
                            
                                if(response.is_playing === true){
                                    $('#pause_button').removeClass('hidden');
                                    $('#play_button').addClass('hidden');
                                }
                                    
                                else if(response.is_playing === false){
                                    $('#pause_button').addClass('hidden');
                                    $('#play_button').removeClass('hidden');
                                    isPlaying = false;
                                }
                        
                                
                        
                        if (current_id != response.item.id || current_id === 0 ){
                                console.log('current id: ' + current_id);
                                current_id = response.item.id;
                                audio_features(current_id);
                        }
                        
                        // socket update
                        current_song = artist + ' – ' + song;    
                    },
                  error: function(jqXHR, textStatus, errorThrown){
                      console.log('relogin.');
                      console.log('status code: '+jqXHR.status+' // errorThrown: ' + errorThrown + ' // jqXHR.responseText:'+jqXHR.responseText);
                      $.ajax({
                          url: '/refresh_token',
                          data: {
                            'refresh_token': refresh_token
                          }
                        }).done(function(data) {
                          access_token = data.access_token;
                          getAccTok(access_token);
                          console.log('relogin. established.');
                          /*
                          oauthPlaceholder.innerHTML = oauthTemplate({
                            access_token: access_token,
                            refresh_token: refresh_token
                          });
                          */
                        });
                  }
                    
                });
          }
    
            
         function me_player(){
              $.ajax({
                    url: 'https://api.spotify.com/v1/me/player',
                    headers: {
                      'Authorization': 'Bearer ' + access_token
                    },
                    success: function(response) {
                       /* $('#login').hide();
                        $('.container').hide();
                        $('.layers').show();
                        $('#functions_layer').show();*/
                        console.log(response);
                        console.log(response.item.artists[0].name + ' – ' + response.item.name + ' *** ' + response.item.id + ' || ' + response.is_playing);

                                artist = response.item.artists[0].name;
                                song = response.item.name;
                        
                                if(isPlaying != response.is_playing ){
                                    
                                    if(response.is_playing === true){
                                        $('#pause_button').removeClass('hidden');
                                        $('#play_button').addClass('hidden');
                                        isPlaying = true;
                                    }
                                    
                                    else if(response.is_playing === false){
                                        $('#pause_button').addClass('hidden');
                                        $('#play_button').removeClass('hidden');
                                        isPlaying = false;
                                    }
                                }
                                
                        
                        if (current_id != response.item.id || current_id === 0 ){
                                console.log('current id: ' + current_id);
                                current_id = response.item.id;
                                sessionStorage.hasAddColl = 'no';
                                audio_features(current_id);
                        }
                        
                        // socket update
                        current_song = artist + ' – ' + song;    
                    },
                  error: function(jqXHR, textStatus, errorThrown){
                      console.log('sorry. relogin.');
                      console.log('status code: '+jqXHR.status+' // errorThrown: ' + errorThrown + ' // jqXHR.responseText:'+jqXHR.responseText);
                      $.ajax({
                          url: '/refresh_token',
                          data: {
                            'refresh_token': refresh_token
                          }
                        }).done(function(data) {
                          access_token = data.access_token;
                          console.log('sorry. relogin. established.');
                          /*
                          oauthPlaceholder.innerHTML = oauthTemplate({
                            access_token: access_token,
                            refresh_token: refresh_token
                          });
                          */
                        });
                  }
                    
                });
          }
            
          function audio_features(current_id) {
                $.ajax({
                    url: 'https://api.spotify.com/v1/audio-features/' + current_id,
                    dataType: "json",
                    headers: {
                       'Authorization': 'Bearer ' + access_token
                    },
                    success: function(response) {

                        console.log(response);
                        feature_danceability = response.danceability;
                        feature_key = response.key;
                        feature_energy = response.energy;
                        feature_loudness = response.loudness;
                        feature_mode = response.mode;
                        feature_speechiness = response.speechiness;
                        feature_acousticness = response.acousticness;
                        feature_instrumentalness = response.instrumentalness;
                        feature_liveness = response.liveness;
                        feature_valence = response.valence;
                        feature_tempo = response.tempo;
                        
                        /*
                        newValue('fdance', response.danceability);
                        newValue('fenergy', response.energy);
                        newValue('fvalence', response.valence);
                      
                        newValue('facoustic', response.acousticness);
                        newValue('finstrument', response.instrumentalness);
                        newValue('flive', response.liveness);
                        newValue('fspeech', response.speechiness);
                        */
                        sessionStorage.setItem("fdance", feature_danceability);
                        sessionStorage.setItem("fenergy", feature_energy);
                        sessionStorage.setItem("fvalence", feature_valence);
                        
                        sessionStorage.setItem("facoustic", feature_acousticness);
                        sessionStorage.setItem("finstrumental", feature_instrumentalness);
                        sessionStorage.setItem("flive", feature_liveness);
                        sessionStorage.setItem("fspeech", feature_speechiness);
                        
                        
                        
                        $('#listening-to').empty().append(artist + ' – ' + song);
                       /* $('.values').empty().append(artist + ' – ' + song + ' || ' + isPlaying + '<br><br>' + 'Danceability: ' + feature_danceability + '<br>' + 'Key: ' + feature_key + '<br>' + 'Energy: ' + feature_energy + '<br>' + 'Loudness: ' + feature_loudness + '<br>' + 'Mode: ' + feature_mode + '<br>' + 'Speechiness: ' + feature_speechiness + '<br>' + 'Acousticness: ' + feature_acousticness + '<br>' + 'Instrumentalness: ' + feature_instrumentalness + '<br>' + 'Liveness: ' + feature_liveness + '<br>' + 'Valence: ' + feature_valence + '<br>' + 'Tempo: ' + feature_tempo + '<br>');
                       */
                       // sendValues();
                       setColor();


                    }
                });
          }    
            
    
    
    
    
        function setColor(){
            console.log(feature_danceability, feature_energy, feature_valence);
            
            if(feature_acousticness >= 0.7 || feature_instrumentalness >= 0.7 || feature_liveness >= 0.7 || feature_speechiness > 0.7){
                sessionStorage.hasAddColl = 'yes';
                console.log('has')
            } else {
                sessionStorage.hasAddColl = 'no';
                console.log('hasnot')
            }
            
            function checkAdditionalFeature(){
                if(feature_instrumentalness >= 0.7) {
                        sessionStorage.addCol = 'colorsInstrumentalness';
                }
                if(feature_acousticness >= 0.7) {
                        sessionStorage.addCol ='colorsAcousticness';
                }
                if(feature_liveness >= 0.7) {
                    sessionStorage.addCol = 'colorsLiveness';
                }
                if(feature_speechiness >= 0.7) {
                    console.log('+ Speech');
                    sessionStorage.addCol = 'colorsSpeech';
                }
            }
            

            
            if(feature_valence >= 0.5) {
               
                if(feature_energy >= 0.5 && feature_danceability <= 0.6 ) {
                    console.log('POSITIV');
                    sessionStorage.overCol = 'colorsValencePositive';
                    checkAdditionalFeature();
                }
                
                else if(feature_energy >= 0.5 && feature_danceability >= 0.6) {
                    console.log('DANCE!');
                    sessionStorage.overCol = 'colorsDance';
                    checkAdditionalFeature();
                }
                
                else if(feature_energy <= 0.5){
                    console.log('engery --- ruhig?');
                    //sessionStorage.overCol = "colorsEnergyless";
                    checkAdditionalFeature();
                }
            }
            
            else if (feature_valence <= 0.5 ){
                if(feature_energy >= 0.7){
                   if(feature_danceability <= 0.5) {
                        console.log('KRAWWWWALL');
                        sessionStorage.overCol = 'colorsEnergyhigh';
                        checkAdditionalFeature();
                       
                    }
                    else if(feature_danceability >= 0.5) {
                        console.log('still disco');
                        sessionStorage.overCol = 'colorsDance';
                        checkAdditionalFeature();
                        
                    }
                }
                else if(feature_energy <= 0.7) {
                    if(feature_energy <= 0.4 && feature_danceability <= 0.4 && feature_valence <= 0.3) {
                        sessionStorage.overCol = 'colorsValenceNegative';
                        checkAdditionalFeature();
                    }
                    else {
                        console.log('RUHIG');
                        sessionStorage.overCol = 'colorsEnergyless';
                        checkAdditionalFeature();
                        
                    }
                }
            }
            
            
            
            /*
            if(feature_energy >= 0.9 && feature_danceability <= 0.6 && feature_valence <= 0.6){
                console.log('brrrrr');
                $('#visualizationInfo').css('background-color', '#CC0000');
            }
            else if(feature_valence <= 0.5 && feature_energy <= 0.5){
                console.log('sad face emoji');
                $('#visualizationInfo').css('background-color', '#000');
            }
            */
            
            
        }
    
    
    
          /*
          document.getElementById('obtain-new-token').addEventListener('click', function() {
            $.ajax({
              url: '/refresh_token',
              data: {
                'refresh_token': refresh_token
              }
            }).done(function(data) {
              access_token = data.access_token;
              oauthPlaceholder.innerHTML = oauthTemplate({
                access_token: access_token,
                refresh_token: refresh_token
              });
            });
          }, false);
         */
       
            function update (){
                setInterval(function(){ me_player(); }, 5000);
            }
        
          
          
          
 

    
    
      })();




         
