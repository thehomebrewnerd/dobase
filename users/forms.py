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
