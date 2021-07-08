from django import forms
from core.models import Obras
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class ObrasForm(forms.ModelForm):

    class Meta:
        model = Obras
        fields = '__all__'


class CustomUserCreationForm(UserCreationForm):
    
    class Meta:
        model = User
        fields = ["username","first_name","last_name","email"]

