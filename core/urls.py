
from .views import home,galeria,artistas,categoria_detail_view,administrador,agregar_obra,listar_obra,modificar_Obra,eliminar_obra,registro,listar_categoria,obra_detail_view
from django.urls import path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls import url

urlpatterns = [
    path('',home,name="home"),
    path('galeria/',galeria,name="galeria"),
    path('artistas/',artistas,name='artistas'),
    path('detalleCategoria/<id>/',categoria_detail_view, name="detalleObra"),
    path('administrador/',administrador,name="administrador"),
    path('agregarObra/',agregar_obra, name="agregarObra"),
    path('listarObra/',listar_obra, name="listarObra"),
    path('listarCategoria/',listar_categoria, name="listarCategoria"),
    path('modificarObra/<id>/',modificar_Obra, name="modificarObra"),
    path('eliminarObra/<id>/',eliminar_obra, name="eliminarObra"),
    path('registro/',registro,name="registro"),
    path('detalleObra/<id>/',obra_detail_view,name="detalleObra")
    
]