from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required(login_url='/accounts/login')
def view_tasks(request):
    """View for displaying task list for the logged in user"""
    context = {}
    return render(request, 'task_list.html', context)


@login_required(login_url='/accounts/login')
def create_task(request):
    """View for displaying form for adding a new task for the logged in user"""
    context = {}
    return render(request, 'create_task.html', context)
