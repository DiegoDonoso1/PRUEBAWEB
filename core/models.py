from django.db import models

# Create your models here.
class Categoria(models.Model):
    idCategoria = models.IntegerField(primary_key=True,verbose_name="Id de Categoria")
    nombreCategoria = models.CharField(max_length=50,verbose_name="Nombre de la categoria")
    imagenCategoria = models.ImageField(null=True,blank=True,default='default.jpg')
    descripcionCategoria = models.CharField(null=True,blank=True,max_length=500,verbose_name="Descripcion del arte")
    def __str__(self):
        return self.nombreCategoria


class Obras(models.Model):
    idObra = models.IntegerField(primary_key=True,verbose_name="Id de Obras")
    nombreObra = models.CharField(max_length=50,verbose_name="Nombre de la obra")
    autorObra = models.CharField(max_length=50,verbose_name="Nombre Autor")
    descripcion = models.CharField(max_length=500,null=True,verbose_name="Descripcion Obras")
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    imagen = models.ImageField(null=True,blank=True,default='default.jpg')

    def __str__(self):
        return str (self.nombreObra)

class Artista(models.Model):
    idArtista =models.IntegerField(primary_key=True,verbose_name="id Artista")
    nombreArtista =models.CharField(max_length=50,verbose_name="Nombre Artista")
    fecha_nacimiento=models.DateTimeField(verbose_name="fecha nacimiento")
    descripcionArtista= models.CharField(max_length=500,verbose_name="Descripcion artista")
    obra= models.ForeignKey(Obras,on_delete=models.CASCADE)
    imagenArtista = models.ImageField(null=True,blank=True,default='default.jpg')
    def __str__(self):
        return self.nombreArtista
