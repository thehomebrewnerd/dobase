from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django import forms

from .models import AppUser


class AppUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm):
        model = AppUser
        fields = ('email',)


class AppUserChangeForm(UserChangeForm):

    class Meta:
        model = AppUser
        fields = ('email',)


class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254, help_text='You must provide a valid email address.')

    class Meta:
        model = AppUser
        fields = ('email', 'password1', 'password2')
