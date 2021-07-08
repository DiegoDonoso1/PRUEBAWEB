$(document).ready(function(){
    
        
            var woeid;
            if (!navigator.geolocation){
                output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
                return;
            }

            navigator.geolocation.getCurrentPosition(function(position) {
            
                var latitude  = position.coords.latitude;
                var longitude = position.coords.longitude;
                var url= `https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`
                $.get(url,function(data){
                    woeid=(data[0].woeid);
                    var urlCiudad=`https://www.metaweather.com/api/location/${woeid}`
                    console.log(woeid);
                    if(woeid>0){
                        $.get(urlCiudad,function(info){
                            
                            $("#tiempo").append(`<p>${info.consolidated_weather[0].weather_state_name}</p> <img src="https://www.metaweather.com/static/img/weather/png/64/${info.consolidated_weather[0].weather_state_abbr}.png"  <p> Grados: ${info.consolidated_weather[0].the_temp.toFixed(2)} ℃</p> `) 
                        })
                    } 
                })
                    })   
          
    
    
    
    
    
    
    var busquedaObras;
    
    var page=1;
    $("#buscar").click(function(){
        $("#titulo").empty();
        $("#llenar").empty();
        page;
        var busquedaObras=$("#obras").val();
        var url = `https://api.artic.edu/api/v1/artworks/search?q=${busquedaObras}&limit=20&page=${page}`;
        var idObras;
        $("#titulo").append(`<h1 class="text-center my-4">${busquedaObras}</h1>`)
        $.get(url,function(data){
            //console.log(data.results);                                     
        }).then(function(data2){
            $.each(data2.data,function(i,item){
                //console.log(data2.data);
                idObras=(item.id);
                var urlObra=`https://api.artic.edu/api/v1/artworks/${idObras}?fields=id,title,image_id,artist_title,term_titles`
                
                $.get(urlObra,function(data3){
                    
                    var idObras=(data3.data.image_id);
                    var urlImg=`https://www.artic.edu/iiif/2/${idObras}/full/400,/0/default.jpg`
                    $.get(urlImg,function(data4){
                        if(data3.data.artist_title != null){

                            $("#llenar").append(`<div class="col">
                                                <div class="card text-center ">
                                                <img src="${urlImg}" alt="" class="card-img-top img-fluid">
                                                <p class="lead ">Título: ${data3.data.title} <br> Autor: ${data3.data.artist_title}  </p>
                                                </div>
                                                </div>  `) }
                        else{
                            data3.data.artist_title="Artista desconocido"
                            $("#llenar").append(`<div class="col">
                                                <div class="card text-center ">
                                                <img src="${urlImg}" alt="" class="card-img-top img-fluid" >
                                                <p class="lead ">Título: ${data3.data.title}  <br> Autor: ${data3.data.artist_title}  </p>
                                                </div>
                                                </div>  `)
                        }
                        
                        if(page=1){
                            $("#next").show("slow");
                            }
                            
                    })
                })
               
            })

        })
        
    })



    $("#escultura").click(function(){
        $("#llenar").empty();
        $("#titulo").empty();
        page;
        var busquedaObras=$("#obras").val();
        var sculpture="sculpture"
        var url = `https://api.artic.edu/api/v1/artworks/search?q=${sculpture}&limit=30&page=${page}`;
        var idObras;
        $("#titulo").append(`<h1 class="text-center my-4">Escultura</h1>`)
        $.get(url,function(data){
            //console.log(data.results);                                     
        }).then(function(data2){
            $.each(data2.data,function(i,item){
                //console.log(data2.data);
                idObras=(item.id);
                var urlObra=`https://api.artic.edu/api/v1/artworks/${idObras}?fields=id,title,image_id,artist_title,term_titles`
                $.get(urlObra,function(data3){
                        console.log(data3.data.title)
                    
                        var idObras=(data3.data.image_id);
                        var urlImg=`https://www.artic.edu/iiif/2/${idObras}/full/400,/0/default.jpg`
                        $.get(urlImg,function(data4){
                            if(data3.data.artist_title != null){

                                $("#llenar").append(`<div class="col">
                                                    <div class="card text-center ">
                                                    <img src="${urlImg}" alt="" class="card-img-top img-fluid">
                                                    <p class="lead ">Título: ${data3.data.title} <br> Autor: ${data3.data.artist_title}  </p>
                                                    </div>
                                                    </div>  `) }
                            else{
                                data3.data.artist_title="Artista desconocido"
                                $("#llenar").append(`<div class="col">
                                                    <div class="card text-center ">
                                                    <img src="${urlImg}" alt="" class="card-img-top img-fluid" >
                                                    <p class="lead ">Título: ${data3.data.title}  <br> Autor: ${data3.data.artist_title}  </p>
                                                    </div>
                                                    </div>  `)
                            }
                            $("#next").hide();
                                
                        })
                })
            })
        })
        })

        $("#pintura").click(function(){
            $("#llenar").empty();
            $("#titulo").empty();
            page;
            var busquedaObras=$("#obras").val();
            var pintura="painting"
            var url = `https://api.artic.edu/api/v1/artworks/search?q=${pintura}&limit=20&page=${page}`;
            var idObras;
            $("#titulo").append(`<h1 class="text-center my-4">Pintura</h1>`)
            $.get(url,function(data){
                //console.log(data.results);                                     
            }).then(function(data2){
                $.each(data2.data,function(i,item){
                    //console.log(data2.data);
                    idObras=(item.id);
                    var urlObra=`https://api.artic.edu/api/v1/artworks/${idObras}?fields=id,title,image_id,artist_title,term_titles`
                    $.get(urlObra,function(data3){
                            console.log(data3.data.title)
                        
                            var idObras=(data3.data.image_id);
                            var urlImg=`https://www.artic.edu/iiif/2/${idObras}/full/400,/0/default.jpg`
                            $.get(urlImg,function(data4){
                                if(data3.data.artist_title != null){

                                    $("#llenar").append(`<div class="col">
                                                        <div class="card text-center ">
                                                        <img src="${urlImg}" alt="" class="card-img-top img-fluid">
                                                        <p class="lead ">Título: ${data3.data.title} <br> Autor: ${data3.data.artist_title}  </p>
                                                        </div>
                                                        </div>  `) }
                                else{
                                    data3.data.artist_title="Artista desconocido"
                                    $("#llenar").append(`<div class="col">
                                                        <div class="card text-center ">
                                                        <img src="${urlImg}" alt="" class="card-img-top img-fluid" >
                                                        <p class="lead ">Título: ${data3.data.title}  <br> Autor: ${data3.data.artist_title}  </p>
                                                        </div>
                                                        </div>  `)
                                }
                                $("#next").hide();
                                  
                            })
                    })
                })
            })
            })

            $("#Acuarela").click(function(){
                $("#llenar").empty();
                $("#titulo").empty();
                page;
                var busquedaObras=$("#obras").val();
                var Acuarela="watercolor"
                var url = `https://api.artic.edu/api/v1/artworks/search?q=${Acuarela}&limit=20&page=${page}`;
                var idObras;
                $("#titulo").append(`<h1 class="text-center my-4">Acuarela</h1>`)
                $.get(url,function(data){
                    //console.log(data.results);                                     
                }).then(function(data2){
                    $.each(data2.data,function(i,item){
                        //console.log(data2.data);
                        idObras=(item.id);
                        var urlObra=`https://api.artic.edu/api/v1/artworks/${idObras}?fields=id,title,image_id,artist_title,term_titles`
                        $.get(urlObra,function(data3){
                                console.log(data3.data.title)
                            
                                var idObras=(data3.data.image_id);
                                var urlImg=`https://www.artic.edu/iiif/2/${idObras}/full/400,/0/default.jpg`
                                $.get(urlImg,function(data4){
                                    if(data3.data.artist_title != null){

                                        $("#llenar").append(`<div class="col">
                                                            <div class="card text-center ">
                                                            <img src="${urlImg}" alt="" class="card-img-top img-fluid">
                                                            <p class="lead ">Título: ${data3.data.title} <br> Autor: ${data3.data.artist_title}  </p>
                                                            </div>
                                                            </div>  `) }
                                    else{
                                        data3.data.artist_title="Artista desconocido"
                                        $("#llenar").append(`<div class="col">
                                                            <div class="card text-center ">
                                                            <img src="${urlImg}" alt="" class="card-img-top img-fluid" >
                                                            <p class="lead ">Título: ${data3.data.title}  <br> Autor: ${data3.data.artist_title}  </p>
                                                            </div>
                                                            </div>  `)
                                    }
                                    $("#next").hide();
                                })
                        })
                    })
                })
                })
    
    $("#next").click(function(){
        $("#llenar").empty();
        var busquedaObras=$("#obras").val();
        if(busquedaObras!=""){
            page=page+1;
            var url = `https://api.artic.edu/api/v1/artworks/search?q=${busquedaObras}&limit=20&page=${page}`;
            var idObras;
            
            $.get(url,function(data){
                //console.log(data.results);                                     
            }).then(function(data2){
                $.each(data2.data,function(i,item){
                    idObras=(item.id);
                    var urlObra=`https://api.artic.edu/api/v1/artworks/${idObras}?fields=id,title,image_id,artist_title`
                    $.get(urlObra,function(data3){
                        var idObras=(data3.data.image_id);
                        var urlImg=`https://www.artic.edu/iiif/2/${idObras}/full/400,/0/default.jpg`
                        $.get(urlImg,function(data4){
                            if(data3.data.artist_title != null){

                            $("#llenar").append(`<div class="col">
                                                <div class="card text-center ">
                                                <img src="${urlImg}" alt="" class="card-img-top" >
                                                <p class="lead ">Título: ${data3.data.title}  <br> Autor: ${data3.data.artist_title}  </p>
                                                </div>
                                                </div>  `) }
                            else{
                            data3.data.artist_title="Artista desconocido"
                            $("#llenar").append(`<div class="col">
                                                <div class="card text-center ">
                                                <img src="${urlImg}" alt="" class="card-img-top" >
                                                <p class="lead ">Título: ${data3.data.title}  <br> Autor: ${data3.data.artist_title}  </p>
                                                </div>
                                                </div>  `)
                            } 
                            $("#prev").show("slow");
                        })
                    })
                
                })
            return page
            })
        }
        else{
            console.log("No ingreso busqueda");
        }
    })
    $("#prev").click(function(){
        $("#llenar").empty();
        if(page>=2){
            $('#prev a').removeAttr('disabled');
            page=page-1 ;
            var busquedaObras=$("#obras").val();
            var url = `https://api.artic.edu/api/v1/artworks/search?q=${busquedaObras}&limit=20&page=${page}`;
            var idObras;
            $.get(url,function(data){
                //console.log(data.results);                                     
            }).then(function(data2){
                $.each(data2.data,function(i,item){
                    idObras=(item.id);
                    var urlObra=`https://api.artic.edu/api/v1/artworks/${idObras}?fields=id,title,image_id,artist_title`
                    $.get(urlObra,function(data3){
                        var idObras=(data3.data.image_id);
                        var urlImg=`https://www.artic.edu/iiif/2/${idObras}/full/200,/0/default.jpg`
                        $.get(urlImg,function(data4){
                            if(data3.data.artist_title != null){

                                $("#llenar").append(`<div class="col">
                                                    <div class="card text-center ">
                                                    <img src="${urlImg}" alt="" class="card-img-top" >
                                                    <p class="lead ">Título: ${data3.data.title}  <br> Autor: ${data3.data.artist_title}  </p>
                                                    </div>
                                                    </div>  `) }
                                else{
                                data3.data.artist_title="Artista desconocido"
                                $("#llenar").append(`<div class="col">
                                                    <div class="card text-center ">
                                                    <img src="${urlImg}" alt="" class="card-img-top" >
                                                    <p class="lead ">Título: ${data3.data.title}  <br> Autor: ${data3.data.artist_title}  </p>
                                                    </div>
                                                    </div>  `)
                                } 
                            if(page<2){
                                $("#prev").hide();
                            }
                        })
                    })
                
                })

            })
        }
        else {
            page=1;
            if (page=1){
                $("#prev").hide();
        }
            }
        
        })

        



    function Ocultar() {
        $("#prev").hide();
        $("#next").hide();
    }
    
  
     Ocultar();   


    
})