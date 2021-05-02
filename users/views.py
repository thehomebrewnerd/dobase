from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate

from users.forms import SignUpForm


def create_account(request):
    """View for creating a new use account"""
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()
    
    return render(request, 'registration/create_account.html', context={'form': form})
