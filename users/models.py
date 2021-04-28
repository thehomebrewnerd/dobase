from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.core.exceptions import ValidationError

from .managers import AppUserManager

# Create your models here.
class AppUser(AbstractBaseUser, PermissionsMixin):
    """User Model"""
    username = None
    email = models.EmailField('email address',
                              unique=True,
                              null=False,
                              blank=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField('date joined', auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = AppUserManager()

    def __str__(self):
        return self.email
