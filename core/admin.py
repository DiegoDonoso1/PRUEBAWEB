from django.contrib import admin
from django.utils.html import format_html
from  .models import Categoria,Obras,Artista
# Register your models here.



class ObrasAdmin(admin.ModelAdmin):
    list_display = ("nombreObra","autorObra","descripcion",'picture')
    search_fields =("nombreObra","autorObra",)
    list_fielter=("autorObra")

    def picture(self,obj):
        return format_html('<img src={} width="200" height="200"  />',obj.imagen.url)



class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombreCategoria","descripcionCategoria",'foto')
    search_fields =("idCategoria",)
    list_filter=("nombreCategoria",)


    def foto(self,obj):
        return format_html('<img src={} width="200" height="200"  />',obj.imagenCategoria.url)

class ArtistaAdmin(admin.ModelAdmin):
    list_display=("idArtista","nombreArtista","descripcionArtista")


admin.site.register(Categoria,CategoriaAdmin)
admin.site.register(Obras,ObrasAdmin)
admin.site.register(Artista,ArtistaAdmin)