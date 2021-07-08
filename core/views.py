
from .models import Obras,Categoria,Artista
from django.views import generic
from django.shortcuts import render,redirect,get_object_or_404
from .forms import ObrasForm, CustomUserCreationForm 
from core.models import Obras
from django.contrib import messages
from django.core.paginator import Paginator
from django.http import Http404
from django.contrib.auth import authenticate,login
from django.contrib.auth.decorators import login_required , permission_required,user_passes_test
from django.contrib.admin.views.decorators import staff_member_required


# Create your views here.

def home(request):
    obras = Obras.objects.all()
    categorias = Categoria.objects.all()
    artistas =Artista.objects.all()
    carrusel1 = Obras.objects.filter(nombreObra="Magno")
    carrusel2 = Obras.objects.filter(nombreObra="Split")
    carrusel3 = Obras.objects.filter(nombreObra="Fugatur Vita")
    context = {"obras": obras, "categorias":categorias, "artista":artistas, "carusel": carrusel1, 'carusel2':carrusel2, "carusel3":carrusel3}
    return render(request,'core/index.html',context)

def artistas(request):
    artistas=Artista.objects.all()
    context={"arte":artistas}
    return render(request,'core/artistas.html',context)

def galeria(request):
    galeria=Obras.objects.all()
    context={"galeria":galeria}
    return render(request,'core/galeria.html',context)

def obra_detail_view(request,id):
    try:
        cat_id=Obras.objects.get(idObra=id)
        context={"nombreO":cat_id}
    except Obras.DoesnotExist:
        raise Http404("Obra no existe")

    return render(request,'core/detalleObras.html',context)


def categoria_detail_view(request,id):
    try:
        categoria_id=Categoria.objects.get(idCategoria=id)
        obras_id=Obras.objects.filter(categoria_id=id)
        context={"idcategoria":categoria_id, "idObra":obras_id}
    except Categoria.DoesNotExist:
         raise Http404("Categoria no existe")
    
    return render(request,'core/detalle.html',context)

def administrador(request):
    return render(request,'core/admin.html')


#def email_check(user):
    #return user.email.endswith('123@gmail.com')

#@user_passes_test(email_check)   
@permission_required('core.add_obras')
def agregar_obra(request):

    data = {
        'form': ObrasForm()
    }

    if request.method == 'POST':
        Formulario = ObrasForm(data=request.POST, files=request.FILES)
        if Formulario.is_valid():
            Formulario.save()
            data["mensaje"] = "guardado correctamente"
        else:
            data["form"] = Formulario

    return render(request,'core/agregar.html',data)

@permission_required('core.view_obras')
def listar_obra(request):
    obras = Obras.objects.all()
    page = request.GET.get('page',1)
    

    try:
        paginator = Paginator(obras,5)
        obras = paginator.page(page)
        
    except:
        raise Http404

    data = {
        'entity': obras,
        'paginator' : paginator
    }

    return render(request,'core/listar.html',data)


def listar_categoria(request):
    categorias = Categoria.objects.all()
     
    data = {
        'categoriasListar': categorias,
    }
    return render(request,'core/listarCategorias.html',data)


@permission_required('core.change_obras')
def modificar_Obra(request,id):

    elemento = get_object_or_404(Obras, idObra=id)

    data = {
        'form': ObrasForm(instance=elemento)
    }

    if request.method=='POST':
        formulario = ObrasForm(data=request.POST, instance=elemento, files=request.FILES)
        if formulario.is_valid():
            formulario.save()
            messages.success(request,"modificado correctamente")
            return redirect(to="listarObra")
        data["form"] =formulario

    return render(request, 'core/modificar.html',data)

@permission_required('core.delete_obras')
def eliminar_obra(request, id):
    
    elemento = get_object_or_404(Obras, idObra=id)
    elemento.delete()
    return redirect(to="listarObra")


def registro(request):
    data = {
        'form': CustomUserCreationForm()
    }

    if request.method == "POST":
        formulario =CustomUserCreationForm(data=request.POST)
        if formulario.is_valid():
            formulario.save()
            user = authenticate(username=formulario.cleaned_data["username"],password=formulario.cleaned_data["password1"])
            login(request, user)
            messages.success(request,"Te has registrado correctamente")
            return redirect(to="home")
        data["form"] = formulario

    return render(request, 'registration/registor.html',data)